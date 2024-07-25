\c lonline;

INSERT INTO distributors (userName, password) VALUES
('johndoe', 'password123'),
('janedoe', 'password123'),
('normanthomas', 'password123');

INSERT INTO products (distributor_id, productName, productPrice) VALUES 
(2, 'headphones', 149.99),
(2, 'apple macbook', 1099.99),
(2, 'speaker', 59.99),
(1, 'headphones', 99.99),
(1, 'ps5 controller', 69.99),
(1, 'tv', 149.99),
(3, '3d-printer', 499.99),
(3, '3d-pen', 44.99);

INSERT INTO consumers (userName, password, address) VALUES 
('larrylamouth', 'password123', '123 abc st'),
('al-sean', 'password123', '456 xyz st');

INSERT INTO cart_products (carts_owner, products_id, products_quantity) VALUES 
(1, 1, 1), 
(1, 2, 2), 
(1, 3, 1), 
(1, 5, 1), 
(2, 3, 2), 
(2, 6, 1),
(2, 2, 1);