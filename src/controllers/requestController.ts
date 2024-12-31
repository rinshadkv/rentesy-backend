import { Request, Response } from "express";
import { db } from "../db";
import { users, requestes, Status, userSchema } from "../models";
import { eq } from "drizzle-orm";

export const createRequest = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      phone,
      noOfUnits,
      role,
      propertyType,
      durationToManage,
    } = req.body;

    const parsedUserData = userSchema.parse({ name, email, phone });

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    let userId: number;

    if (existingUser.length > 0) {
      userId = existingUser[0].id;
    } else {
      const [newUser] = await db
        .insert(users)
        .values({
          name: parsedUserData.name,
          email: parsedUserData.email,
          phone: parsedUserData.phone,
          password: "hashed_password_placeholder",
          role,
        })
        .returning({ id: users.id });

      userId = newUser.id;
    }

    const [newRequest] = await db
      .insert(requestes)
      .values({
        noOfUnits,
        propertyType,
        status: Status.enumValues[2],
        userId,
        durationToManage,
      })
      .returning();

    res
      .status(201)
      .json({ message: "Request created successfully", request: newRequest });
  } catch (error: Error | any) {
    console.error("Error creating request:", error);
    res.status(400).json({ error: error?.message || "An error occurred" });
  }
};


export const getAllRequests = async (req: Request, res: Response) => {

  const allRequests = await db.select().from(requestes);
  res.json(allRequests);
  res.status(200);
}