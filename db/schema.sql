DROP DATABASE IF EXISTS cookingcrafty_db;
CREATE DATABASE cookingcrafty_db;

USE cookingcrafty_db;


DROP TABLE IF EXISTS user;
CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS recipe;
CREATE TABLE recipe (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    date_created DATETIME NOT NULL
);

DROP TABLE IF EXISTS user_recipe;
CREATE TABLE user_recipe (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	recipe_id INT NOT NULL,
	FOREIGN KEY (recipe_id)
	REFERENCES recipe(id),
	user_id INT NOT NULL,
	FOREIGN KEY (user_id)
	REFERENCES user(id)
);

DROP TABLE IF EXISTS ingredient;
CREATE TABLE ingredient (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS recipe_ingredient;
CREATE TABLE recipe_ingredient (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	recipe_id INT NOT NULL,
	FOREIGN KEY (recipe_id)
	REFERENCES recipe(id),
	ingredient_id INT NOT NULL,
	FOREIGN KEY (ingredient_id)
	REFERENCES ingredient(id)
);

-- DROP TABLE IF EXISTS user_ingredient;
-- CREATE TABLE user_ingedient (
-- 	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
-- 	user_id INT NOT NULL,
-- 	FOREIGN KEY (user_id)
-- 	REFERENCES user(id),
-- 	ingredient_name VARCHAR(255) NOT NULL,
-- 	FOREIGN KEY (ingredient_name)
-- 	REFERENCES ingredient(name)
-- );