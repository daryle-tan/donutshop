DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS donutshop;

CREATE TABLE donutshop (
    shop_id SERIAL PRIMARY KEY,
    donut TEXT,
    drink TEXT,
    price money,
    days_open text,
    supplier text,
    employee text
);

INSERT INTO donutshop (donut, drink, price, days_open, supplier, employee) VALUES ('glazed', 'milk', .99, 'Sun-Mon', 'Dawn Foods', 'Donna');
INSERT INTO donutshop (donut, drink, price, days_open, supplier, employee) VALUES ('apple fritter', 'chocolate milk', 1.49, 'Sun-Mon', 'US Foods', 'Sara');
INSERT INTO donutshop (donut, drink, price, days_open, supplier, employee) VALUES ('blueberry cake', 'orange juice', .99, 'Sun-Mon', 'Elrich Farms', 'Chris');
INSERT INTO donutshop (donut, drink, price, days_open, supplier, employee) VALUES ('cinnamon twist', 'coffee', .89, 'Sun-Mon', 'Farmer Bros', 'Jaden');

CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    name TEXT,
    email varchar(30),
    phone_number varchar(20),
    age INT,
    gender text,
    amount_spent money,
    shop_id INT REFERENCES donutshop(shop_id)
);

INSERT INTO customers (name, email, phone_number, age, gender, amount_spent, shop_id) VALUES ('Bo', 'bo@gmail.com', '154-288-8888', 67, 'Female', 10.00, 4);
INSERT INTO customers (name, email, phone_number, age, gender, amount_spent, shop_id) VALUES ('Sam', 'sam@gmail.com', '254-289-8989', 28, 'Male', 25.54, 2);
INSERT INTO customers (name, email, phone_number, age, gender, amount_spent, shop_id) VALUES ('Jean', 'jean@gmail.com', '354-208-8118', 6, 'Female', 7.65, 3);
INSERT INTO customers (name, email, phone_number, age, gender, amount_spent, shop_id) VALUES ('Sean', 'sean@gmail.com', '454-338-1234', 44, 'They', 32.33, 1)
