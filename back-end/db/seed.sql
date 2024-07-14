\c lonline;

INSERT INTO distributor (userName, password) VALUES
('johndoe', 'password123'),
('janedoe', 'password123'),
('normanthomas', 'password123');

INSERT INTO products (distributor_id, productName, productPrice) VALUES 
(2, 'headphones', 14999),
(2, 'apple macbook', 109999),
(2, 'speaker', 5999),
(1, 'headphones', 9999),
(1, 'ps5 controller', 6999),
(1, 'tv', 14999),
(3, '3d-printer', 49999),
(3, '3d-pen', 4499);

INSERT INTO consumer (userName, password, address) VALUES 
('larrylamouth', 'password123', '123 abc st'),
('al-sean', 'password123', '456 xyz st');