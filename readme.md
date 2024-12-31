# Request Management System  

A streamlined API for managing user requests and associating them with users. Built with **TypeScript**, **Express.js**, **Postgres** and **Drizzle ORM**.  

## Features  

- User password reset mail sending enabled
- Submit and manage user requests.  
- Input validation with schemas.  
- Seamless database operations with Drizzle ORM.  

## Prerequisites  

- **Node.js** (v16 or later)  
- **PostgreSQL**  
- Environment variables:  
  - `DB_URL`: Database connection string  
  - `MAILGUN_DOMAIN`: Mailgun domain for email sending  
  - `MAILGUN_API_KEY`: Mailgun API key  

## Installation  

1. Clone the repository:  

   ```bash  
   git clone https://github.com/rinshadkv/rentesy-backend.git  
   cd rentesy-bacend
   ```

2. Install dependencies:

```
npm install
```

3. Create a `.env` file with your environment variables:

```

DB_URL=your-database-url  
MAILGUN_DOMAIN=your-mailgun-domain  
MAILGUN_API_KEY=your-mailgun-api-key  

```

4. Run database migrations

```
npx drizzle-kit generate
npx drizzle-kit push
```

5. Create Drizzle client

```
 npx drizzle-kit studio
```

## Start the application

```
npm run dev
```

## Apis

for apis you  can find a postman collection in the repository
[Rentesy.postman_collection.json]

## Credentails

I am sending a credential file privatly on linkedin including mail gun credentials

## Running ports

By  default backend application  runs on port 3000
for drizzle server you can access on <https://local.drizzle.studio/>
