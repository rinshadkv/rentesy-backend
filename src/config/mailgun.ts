import mailgun from 'mailgun-js';

const DOMAIN = process.env.MAILGUN_DOMAIN || "your default domain";
const API_KEY = process.env.MAILGUN_API_KEY || "your default API key";

export const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });
