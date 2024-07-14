DROP DATABASE IF EXISTS lonline;
CREATE DATABASE lonline;
\c lonline;

CREATE TABLE distributor (
    distid SERIAL PRIMARY KEY,
    userName TEXT NOT NULL,
    password VARCHAR(20) NOT NULL
);

CREATE TABLE consumer (
    consid SERIAL PRIMARY KEY,
    userName TEXT NOT NULL,
    password VARCHAR(20) NOT NULL,
    address TEXT NOT NULL
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    distributor_id INT NOT NULL REFERENCES distributor (distid),
    consumers_id INT REFERENCES consumer (consid),
    productName TEXT NOT NULL,
    productPrice INT NOT NULL,
    description VARCHAR(250),
    photo TEXT
);
