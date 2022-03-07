# Build a Storefront Backend

## Table of Technologies used to create the project

- Javascript
- Typescript
- node.js
- Express
- Jasmine
- Postgres

## Project description

Architect the database, its tables and columns to fulfill the data requirements and craft a RESTful API that exposes that information to the frontend developer. 

## Sources

( I used it while working )

- TypeScript Documentation
- Sharp Documentation
- Node.js Documentation
- Jasmine Documentation
- Google :)

## How to run
- server port (8000), database port (5432).
- npm install
- Create a new database. 
- create env file
- my env file content:
- 
    POSTGRES_HOST=127.0.0.1
    
    POSTGRES_DB=store
    
    POSTGRES_DB_test=store_test
    
    POSTGRES_USER=store_user
    
    POSTGRES_PASSWORD=password123
    
    ENV=dev
    
    SALT_ROUNDS=10
    
    PEPPER=Pstring
    
    TOKEN_SECRET=secret
    
- Create the tables by (db-migrate up).
- For tests run (npm run jasmine).
- Use create user endpoint to get a JWT token
- Insert some data in tables manually or use create endpoints
- Use the endpoints which declared in Requirements.md file
