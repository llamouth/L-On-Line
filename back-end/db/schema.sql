DROP DATABASE IF EXISTS lonline;
CREATE DATABASE lonline;
\c lonline;

CREATE TABLE distributors (
    distid SERIAL PRIMARY KEY,
    userName TEXT NOT NULL,
    password VARCHAR(20) NOT NULL
);

CREATE TABLE consumers (
    consid SERIAL PRIMARY KEY,
    userName TEXT NOT NULL,
    password VARCHAR(20) NOT NULL,
    address TEXT NOT NULL
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    distributor_id INT NOT NULL REFERENCES distributors (distid),
    consumers_id INT REFERENCES consumers (consid),
    productName TEXT NOT NULL,
    productPrice DECIMAL(10, 2) NOT NULL,
    description VARCHAR(250),
    image_url TEXT
);

CREATE TABLE cart_products (
    cart_product_id SERIAL PRIMARY KEY,
    carts_owner INT REFERENCES consumers (consid) ON DELETE CASCADE,
    products_id INT REFERENCES products (id) ON DELETE CASCADE,
    products_quantity INT 
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY, 
    distributors_id INT REFERENCES distributors (distid),
    consumers_id INT REFERENCES consumers (consid)
);