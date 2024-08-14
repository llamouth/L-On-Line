\c lonline;

INSERT INTO distributors (userName, password_hash) VALUES
('johndoe', 'password123'),
('janedoe', 'password123'),
('normanthomas', 'password123');

INSERT INTO products (distributor_id, product_name, product_price) VALUES 
(2, 'headphones', 149.99),
(2, 'apple macbook', 1099.99),
(2, 'speaker', 59.99),
(1, 'headphones', 99.99),
(1, 'ps5 controller', 69.99),
(1, 'tv', 149.99),
(3, '3d-printer', 499.99),
(3, '3d-pen', 44.99);

INSERT INTO consumers (first_name, last_name, username, password_hash, address, email) VALUES 
( 'john', 'doe', 'johndoe', 'password123', '123 abc st', 'johndoe@example.com'),
( 'howie', 'duitt', 'howieduitt', 'password123', '456 def ave', 'howieduitt@example.com'),
( 'albee', 'beck', 'albeebeck', 'password123', '789 ghi dr', 'albeebeck@example.com'),
( 'lebron', 'james', 'lebronjames', 'password123', '123 abc st', 'lebronjames@example.com'),
( 'aubrey', 'graham', 'ovodrake', 'password123', '123 abc st', 'ovodrake@example.com'),
( 'rick', 'james', 'rickjames', 'password123', '456 xyz st', 'rickjames@example.com');

INSERT INTO cart_products (carts_owner, products_id, products_quantity, ordered) VALUES 
(1, 1, 1, true), 
(4, 2, 2, false), 
(5, 3, 1, true), 
(1, 5, 1, false), 
(2, 3, 2, true), 
(2, 6, 1, true),
(5, 2, 1, false);