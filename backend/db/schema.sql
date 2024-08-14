DROP DATABASE IF EXISTS lonline;
CREATE DATABASE lonline;
\c lonline;

CREATE TABLE distributors (
    distid SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password_hash VARCHAR(20) NOT NULL
);

CREATE TABLE consumers (
    consid SERIAL PRIMARY KEY,
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    address TEXT NOT NULL
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    distributor_id INT NOT NULL REFERENCES distributors (distid),
    consumers_id INT REFERENCES consumers (consid),
    product_name TEXT NOT NULL,
    product_price DECIMAL(10, 2) NOT NULL,
    description VARCHAR(250),
    image_url TEXT
);

CREATE TABLE cart_products (
    cart_product_id SERIAL PRIMARY KEY,
    carts_owner INT REFERENCES consumers (consid) ON DELETE CASCADE,
    products_id INT REFERENCES products (id) ON DELETE CASCADE,
    products_quantity INT,
    ordered BOOLEAN DEFAULT false  
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY, 
    distributors_id INT REFERENCES distributors (distid), 
    cart_products_id INT REFERENCES cart_products (cart_product_id) ON DELETE CASCADE
);