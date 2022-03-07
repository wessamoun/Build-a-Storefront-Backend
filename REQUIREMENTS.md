# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index: "/products" [GET]
- Show: "/products/:idProduct" [GET]
- Create [token required]: "/users/products" [Post]

#### Users

- Index [token required]: "/users" [GET]
- Show [token required]: "/users/:id" [GET]
- Create N[token required]: "/users" [Post]

#### Orders

- Create [token required]: "/users/:id/orders" [Post]
- addProduct [token required]: "/users/:id/orders/:orderId/products" [Post]
- Current Order by user (args: user id)[token required]: "/users/:id/orders" [GET]

## Tables

#### products
(id SERIAL PRIMARY KEY, name VARCHAR(150), price integer)

#### users
(id SERIAL PRIMARY  KEY, first_name VARCHAR(150), last_name VARCHAR(150), password_digest VARCHAR)

#### orders
(id SERIAL PRIMARY KEY, user_id bigint [foreign key to users table], status VARCHAR(15))

#### order_products 
(id SERIAL PRIMARY KEY, quantity integer, order_id bigint [foreign key to orders table],
product_id bigint [foreign key to products table]);

## Data Shapes

#### Product

- id
- name
- price

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
