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
   cd rentesy-backend
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

5. Create a Drizzle client

```
 npx drizzle-kit studio
```

## Start the application

```
npm run dev
```

## Apis

For APIs you  can find a postman collection in the repository
[Rentesy.postman_collection.json]

## Credentails

I am sending a credential file privately on LinkedIn including mail gun credentials

## Running ports

By  default, backend application  runs on port 3000 
for the drizzle server, you can access on <https://local.drizzle.studio/>

## Link to Video :  https://vimeo.com/1043131994?share=copy
