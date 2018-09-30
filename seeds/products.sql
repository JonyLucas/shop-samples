USE `shop`;

SELECT @books := `id` FROM `category` WHERE `name` = 'books';
SELECT @games := `id` FROM `category` WHERE `name` = 'games';
SELECT @phones := `id` FROM `category` WHERE `name` = 'phones';

INSERT INTO `product` (`name`, `price`, `category`)
VALUES ('What Have You Done, Matthew FarrellMatthew Farrell', '4.99', @books);

INSERT INTO `product` (`name`, `price`, `category`)
VALUES ('The Ragged Edge of Night, Olivia HawkerOlivia Hawker', '7.99', @books);

INSERT INTO `product` (`name`, `price`, `category`)
VALUES ('The Rule of One, Ashley SaundersAshley Saunders', '12.99', @books);

INSERT INTO `product` (`name`, `price`, `category`)
VALUES ("PlayerUnknown's Battlegrounds", '50.00', @games);

INSERT INTO `product` (`name`, `price`, `category`)
VALUES ('Forza Horizon 4: Ultimate Edition', '99.99', @games);

INSERT INTO `product` (`name`, `price`, `category`)
VALUES ("Assassin's Creed Odyssey", '59.99', @games);

INSERT INTO `product` (`name`, `price`, `category`)
VALUES ("Samsung Galaxy S7", '1403.57', @phones);

INSERT INTO `product` (`name`, `price`, `category`)
VALUES ("iPhone 7 Plus", '3199.99', @phones);

INSERT INTO `product` (`name`, `price`, `category`)
VALUES ("Moto G6 Play", '789.99', @phones);
