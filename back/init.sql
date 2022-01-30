use shop;

CREATE TABLE IF NOT EXISTS orders (id  MEDIUMINT  NOT NULL AUTO_INCREMENT, order_id varchar(5),  email varchar(255), item_id varchar(5),  PRIMARY KEY (id));

CREATE TABLE IF NOT EXISTS items (id varchar(5), name varchar(255), category_id varchar(5), price INT(255));
INSERT INTO items (id, name, category_id, price) VALUES ('1', 'toy_1', '1', 100);
INSERT INTO items (id, name, category_id, price) VALUES ('2', 'toy_2', '1', 200);
INSERT INTO items (id, name, category_id, price) VALUES ('3', 'tool_1', '2', 500);
INSERT INTO items (id, name, category_id, price)  VALUES ('4', 'car_1', '3', 200000);
INSERT INTO items (id, name, category_id, price) VALUES ('5', 'car_2', '3', 125000);

CREATE TABLE IF NOT EXISTS categories (id varchar(5), name varchar(255));
INSERT INTO categories (id, name) VALUES ('1', 'toys');
INSERT INTO categories (id, name) VALUES ('2', 'tools');
INSERT INTO categories (id, name) VALUES ('3', 'cars');
