CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    user_id bigint REFERENCES users(id),
    status VARCHAR(15)
);