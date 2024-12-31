import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../db";
import { users, tokens } from "../models";
import { eq } from "drizzle-orm";
import { mg } from "../config/mailgun";
import crypto from "crypto";

export const sendResetPasswordEmail = async (req: any, res: any) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await db.select().from(users).where(eq(users.id, userId));
    if (!user.length) {
      return res.status(404).json({ error: "User not found" });
    }

    const userEmail = user[0].email;
    const token = crypto.randomBytes(32).toString("hex");
    const expiryTime = new Date(Date.now() + 3600 * 1000);

    await db.insert(tokens).values({ userId, token, expiresAt: expiryTime });

    const resetLink = `${process.env.WEB_SERVICE_URL || "http://localhost:3000"
      }/reset-password/${token}`;

    const emailData = {
      from: "Excited User <mailgun@sandboxcd2daab42ca04d2a8abf3cb4e6cf9e98.mailgun.org>",
      to: userEmail,
      subject: `Password Reset Request for ${userEmail}`,
      text: `Reset your password: ${resetLink}`,
      html: `
  <p>Hello,</p>
  <p>We received a request to reset your password. Click the link below to reset it:</p>
  <p><a href="${resetLink}" style="color: #3498db; text-decoration: none;">Reset your password</a></p>
  <p>If you did not request this, please ignore this email or contact support if you have questions.</p>
  <p>Thanks,<br/>The Support Team</p>
`,
    };

    await mg.messages().send(emailData).then(msg => console.log(msg)).catch(err => console.log(err));
    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error("Error sending reset email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const saveNewPassword = async (req: any, res: any) => {
  try {
    const { token, password } = req.body;

    if (!password || typeof password !== "string" || password.trim() === "") {
      return res.status(400).json({
        error: "Password is required and must be a non-empty string.",
      });
    }

    const tokenRecord = await db
      .select()
      .from(tokens)
      .where(eq(tokens.token, token));
    if (!tokenRecord.length) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const userId = tokenRecord[0].userId;

    const user = await db.select().from(users).where(eq(users.id, userId));
    if (!user.length) {
      return res.status(404).json({ error: "User not found" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, userId));

    await db.delete(tokens).where(eq(tokens.token, token));

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
