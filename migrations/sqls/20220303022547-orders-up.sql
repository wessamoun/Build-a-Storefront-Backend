CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    quantity integer,
    product_id bigint REFERENCES products(id),
    user_id bigint REFERENCES users(id),
    status VARCHAR(15)
);