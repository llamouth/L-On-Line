DROP DATABASE IF EXISTS lonline;
CREATE DATABASE lonline;
\c lonline;

CREATE TABLE distributor (
    id SERIAL PRIMARY KEY,
    userName TEXT NOT NULL,
    password VARCHAR(20) NOT NULL
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    distributor TEXT NOT NULL,
    productName TEXT NOT NULL,
    productPrice INT NOT NULL,
    description VARCHAR(250),
    photo TEXT
);

CREATE TABLE consumer (
    id SERIAL PRIMARY KEY,
    userName TEXT NOT NULL,
    password VARCHAR(20) NOT NULL,
    address TEXT NOT NULL
);