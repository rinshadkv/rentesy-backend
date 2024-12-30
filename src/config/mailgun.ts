import mailgun from 'mailgun-js';

const DOMAIN = process.env.MAILGUN_DOMAIN || 'sandbox865bdfb1a6184e57a5b222f6f7aa1357.mailgun.org';
const API_KEY = process.env.MAILGUN_API_KEY || '9edf698444e3902ed36fe29675636ebe-2e68d0fb-0aa44c81';

export const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });
