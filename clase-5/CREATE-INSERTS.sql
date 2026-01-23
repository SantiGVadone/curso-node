-- creacion de la base de datos 
DROP DATABASE IF EXISTS moviesdb;
CREATE DATABASE moviesdb;

-- usar la base de datos 

USE moviesdb;

-- CREANDO LAS TABLAS

CREATE TABLE movie (
	id BINARY(16) PRIMARY KEY DEFAULT(UUID_TO_BIN(UUID())),
    title VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    director VARCHAR(255) NOT NULL,
    duration INT NOT NULL,
    poster TEXT, -- la dif entre text y varchar es que el text ocupa mas espacio ya que no tiene tamaño maximo 
    rate DECIMAL(2,1) NOT NULL
);

CREATE TABLE genre(
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE movie_genres(
	movie_id BINARY(16) REFERENCES movie(id),
    genre_id INT REFERENCES genre(id),
    PRIMARY KEY (movie_id,genre_id)
);

INSERT INTO genre (name) VALUES 
('Drama'), 
('Action'),
('Crime'),
('Adventure'),
('Sci-Fi'),
('Romance');

INSERT INTO genre (name) VALUES 
('Animation'), 
('Fantasy'), 
('Biography');

INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES 
(UUID_TO_BIN('dcdd0fad-a94c-4810-8acc-5f108d3b18c3'), 'The Shawshank Redemption', 1994, 'Frank Darabont', 142, 'https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp', 9.3),
(UUID_TO_BIN('c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf'), 'The Dark Knight', 2008, 'Christopher Nolan', 152, 'https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg', 9.0),
(UUID_TO_BIN('5ad1a235-0d9c-410a-b32b-220d91689a08'), 'Inception', 2010, 'Christopher Nolan', 148, 'https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg', 8.8),
(UUID_TO_BIN('241bf55d-b649-4109-af7c-0e6890ded3fc'), 'Pulp Fiction', 1994, 'Quentin Tarantino', 154, 'https://www.themoviedb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg', 8.9),
(UUID_TO_BIN('9e6106f0-848b-4810-a11a-3d832a5610f9'), 'Forrest Gump', 1994, 'Robert Zemeckis', 142, 'https://i.ebayimg.com/images/g/qR8AAOSwkvRZzuMD/s-l1600.jpg', 8.8),
-- ACÁ ESTÁ EL CAMBIO: Le agregué un '0' al final del ID
(UUID_TO_BIN('7e3fd5ab-60ff-4ae2-92b6-9597f0308d10'), 'Gladiator', 2000, 'Ridley Scott', 155, 'https://img.fruugo.com/product/0/60/14417600_max.jpg', 8.5),
(UUID_TO_BIN('c906673b-3948-4402-ac7f-73ac3a9e3105'), 'The Matrix', 1999, 'Lana Wachowski', 136, 'https://i.ebayimg.com/images/g/QFQAAOSwAQpfjaA6/s-l1200.jpg', 8.7),
(UUID_TO_BIN('b6e03689-cccd-478e-8565-d92f40813b13'), 'Interstellar', 2014, 'Christopher Nolan', 169, 'https://m.media-amazon.com/images/I/91obuWzA3XL._AC_UF1000,1000_QL80_.jpg', 8.6),
(UUID_TO_BIN('aa391090-b938-42eb-b520-86ea0aa3917b'), 'The Lord of the Rings: The Return of the King', 2003, 'Peter Jackson', 201, 'https://i.ebayimg.com/images/g/0hoAAOSwe7peaMLW/s-l1600.jpg', 8.9),
(UUID_TO_BIN('2e6900e2-0b48-4fb6-ad48-09c7086e54fe'), 'The Lion King', 1994, 'Roger Allers, Rob Minkoff', 88, 'https://m.media-amazon.com/images/I/81BMmrwSFOL._AC_UF1000,1000_QL80_.jpg', 8.5),
(UUID_TO_BIN('04986507-b3ed-442c-8ae7-4c5df804f896'), 'The Avengers', 2012, 'Joss Whedon', 143, 'https://img.fruugo.com/product/7/41/14532417_max.jpg', 8.0),
(UUID_TO_BIN('7d2832f8-c70a-410e-8963-4c93bf36cc9c'), 'Jurassic Park', 1993, 'Steven Spielberg', 127, 'https://vice-press.com/cdn/shop/products/Jurassic-Park-Editions-poster-florey.jpg?v=1654518755&width=1024', 8.1),
(UUID_TO_BIN('ccf36f2e-8566-47f7-912d-9f4647250bc7'), 'Titanic', 1997, 'James Cameron', 195, 'https://i.pinimg.com/originals/42/42/65/4242658e6f1b0d6322a4a93e0383108b.png', 7.8),
(UUID_TO_BIN('8fb17ae1-bdfe-45e5-a871-4772d7e526b8'), 'The Social Network', 2010, 'David Fincher', 120, 'https://i.pinimg.com/originals/7e/37/b9/7e37b994b613e94cba64f307b1983e39.jpg', 7.7),
(UUID_TO_BIN('6a360a18-c645-4b47-9a7b-2a71babbf3e0'), 'Avatar', 2009, 'James Cameron', 162, 'https://i.etsystatic.com/35681979/r/il/dfe3ba/3957859451/il_fullxfull.3957859451_h27r.jpg', 7.8);

INSERT INTO movie_genres (movie_id, genre_id) VALUES 
-- The Shawshank Redemption (Drama)
(UUID_TO_BIN('dcdd0fad-a94c-4810-8acc-5f108d3b18c3'), (SELECT id FROM genre WHERE name = 'Drama')),

-- The Dark Knight (Action, Crime, Drama)
(UUID_TO_BIN('c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf'), (SELECT id FROM genre WHERE name = 'Action')),
(UUID_TO_BIN('c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf'), (SELECT id FROM genre WHERE name = 'Crime')),
(UUID_TO_BIN('c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf'), (SELECT id FROM genre WHERE name = 'Drama')),

-- Inception (Action, Adventure, Sci-Fi)
(UUID_TO_BIN('5ad1a235-0d9c-410a-b32b-220d91689a08'), (SELECT id FROM genre WHERE name = 'Action')),
(UUID_TO_BIN('5ad1a235-0d9c-410a-b32b-220d91689a08'), (SELECT id FROM genre WHERE name = 'Adventure')),
(UUID_TO_BIN('5ad1a235-0d9c-410a-b32b-220d91689a08'), (SELECT id FROM genre WHERE name = 'Sci-Fi')),

-- Pulp Fiction (Crime, Drama)
(UUID_TO_BIN('241bf55d-b649-4109-af7c-0e6890ded3fc'), (SELECT id FROM genre WHERE name = 'Crime')),
(UUID_TO_BIN('241bf55d-b649-4109-af7c-0e6890ded3fc'), (SELECT id FROM genre WHERE name = 'Drama')),

-- Forrest Gump (Drama, Romance)
(UUID_TO_BIN('9e6106f0-848b-4810-a11a-3d832a5610f9'), (SELECT id FROM genre WHERE name = 'Drama')),
(UUID_TO_BIN('9e6106f0-848b-4810-a11a-3d832a5610f9'), (SELECT id FROM genre WHERE name = 'Romance')),

-- Gladiator (Action, Adventure, Drama)
(UUID_TO_BIN('7e3fd5ab-60ff-4ae2-92b6-9597f0308d10'), (SELECT id FROM genre WHERE name = 'Action')),
(UUID_TO_BIN('7e3fd5ab-60ff-4ae2-92b6-9597f0308d10'), (SELECT id FROM genre WHERE name = 'Adventure')),
(UUID_TO_BIN('7e3fd5ab-60ff-4ae2-92b6-9597f0308d10'), (SELECT id FROM genre WHERE name = 'Drama')),

-- The Matrix (Action, Sci-Fi)
(UUID_TO_BIN('c906673b-3948-4402-ac7f-73ac3a9e3105'), (SELECT id FROM genre WHERE name = 'Action')),
(UUID_TO_BIN('c906673b-3948-4402-ac7f-73ac3a9e3105'), (SELECT id FROM genre WHERE name = 'Sci-Fi')),

-- Interstellar (Adventure, Drama, Sci-Fi)
(UUID_TO_BIN('b6e03689-cccd-478e-8565-d92f40813b13'), (SELECT id FROM genre WHERE name = 'Adventure')),
(UUID_TO_BIN('b6e03689-cccd-478e-8565-d92f40813b13'), (SELECT id FROM genre WHERE name = 'Drama')),
(UUID_TO_BIN('b6e03689-cccd-478e-8565-d92f40813b13'), (SELECT id FROM genre WHERE name = 'Sci-Fi')),

-- The Lord of the Rings (Action, Adventure, Drama)
(UUID_TO_BIN('aa391090-b938-42eb-b520-86ea0aa3917b'), (SELECT id FROM genre WHERE name = 'Action')),
(UUID_TO_BIN('aa391090-b938-42eb-b520-86ea0aa3917b'), (SELECT id FROM genre WHERE name = 'Adventure')),
(UUID_TO_BIN('aa391090-b938-42eb-b520-86ea0aa3917b'), (SELECT id FROM genre WHERE name = 'Drama')),

-- The Lion King (Animation, Adventure, Drama)
(UUID_TO_BIN('2e6900e2-0b48-4fb6-ad48-09c7086e54fe'), (SELECT id FROM genre WHERE name = 'Animation')),
(UUID_TO_BIN('2e6900e2-0b48-4fb6-ad48-09c7086e54fe'), (SELECT id FROM genre WHERE name = 'Adventure')),
(UUID_TO_BIN('2e6900e2-0b48-4fb6-ad48-09c7086e54fe'), (SELECT id FROM genre WHERE name = 'Drama')),

-- The Avengers (Action, Adventure, Sci-Fi)
(UUID_TO_BIN('04986507-b3ed-442c-8ae7-4c5df804f896'), (SELECT id FROM genre WHERE name = 'Action')),
(UUID_TO_BIN('04986507-b3ed-442c-8ae7-4c5df804f896'), (SELECT id FROM genre WHERE name = 'Adventure')),
(UUID_TO_BIN('04986507-b3ed-442c-8ae7-4c5df804f896'), (SELECT id FROM genre WHERE name = 'Sci-Fi')),

-- Jurassic Park (Adventure, Sci-Fi)
(UUID_TO_BIN('7d2832f8-c70a-410e-8963-4c93bf36cc9c'), (SELECT id FROM genre WHERE name = 'Adventure')),
(UUID_TO_BIN('7d2832f8-c70a-410e-8963-4c93bf36cc9c'), (SELECT id FROM genre WHERE name = 'Sci-Fi')),

-- Titanic (Drama, Romance)
(UUID_TO_BIN('ccf36f2e-8566-47f7-912d-9f4647250bc7'), (SELECT id FROM genre WHERE name = 'Drama')),
(UUID_TO_BIN('ccf36f2e-8566-47f7-912d-9f4647250bc7'), (SELECT id FROM genre WHERE name = 'Romance')),

-- The Social Network (Biography, Drama)
(UUID_TO_BIN('8fb17ae1-bdfe-45e5-a871-4772d7e526b8'), (SELECT id FROM genre WHERE name = 'Biography')),
(UUID_TO_BIN('8fb17ae1-bdfe-45e5-a871-4772d7e526b8'), (SELECT id FROM genre WHERE name = 'Drama')),

-- Avatar (Action, Adventure, Fantasy)
(UUID_TO_BIN('6a360a18-c645-4b47-9a7b-2a71babbf3e0'), (SELECT id FROM genre WHERE name = 'Action')),
(UUID_TO_BIN('6a360a18-c645-4b47-9a7b-2a71babbf3e0'), (SELECT id FROM genre WHERE name = 'Adventure')),
(UUID_TO_BIN('6a360a18-c645-4b47-9a7b-2a71babbf3e0'), (SELECT id FROM genre WHERE name = 'Fantasy'));

