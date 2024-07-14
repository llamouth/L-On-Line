\c lonline;

INSERT INTO distributor (userName, password) VALUES
('johndoe', 'password123'),
('janedoe', 'password123'),
('normanthomas', 'password123');

INSERT INTO products (distributor, productName, productPrice) VALUES 
('janedoe', 'headphones', 14999),
('janedoe', 'apple macbook', 109999),
('janedoe', 'speaker', 5999),
('johndoe', 'headphones', 9999),
('johndoe', 'ps5 controller', 6999),
('johndoe', 'tv', 14999),
('normanthomas', '3d-printer', 49999),
('normanthomas', '3d-pen', 4499);

INSERT INTO consumer (userName, password, address) VALUES 
('larrylamouth', 'password123', '123 abc st'),
('al-sean', 'password123', '456 xyz st');