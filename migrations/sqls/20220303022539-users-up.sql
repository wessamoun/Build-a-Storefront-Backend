CREATE TABLE users (
    id SERIAL PRIMARY  KEY,
    firstName VARCHAR(150),
    lastName VARCHAR(150),
    password_digest VARCHAR
);