DROP TABLE IF EXISTS AGENTS CASCADE;
DROP TABLE IF EXISTS ROLES CASCADE;
DROP TABLE IF EXISTS USERS  CASCADE;
DROP TABLE IF EXISTS USER_ROLES CASCADE;
DROP TABLE IF EXISTS PERMISSIONS CASCADE;
DROP TABLE IF EXISTS ORDERS CASCADE;
DROP TABLE IF EXISTS ORDER_PRODUCTS CASCADE;
DROP TABLE IF EXISTS PRODUCT_LOTS CASCADE;
DROP TABLE IF EXISTS PRODUCTS CASCADE;
DROP TABLE IF EXISTS SALES  CASCADE;
DROP TABLE IF EXISTS SALE_PRODUCTS CASCADE;
DROP TABLE IF EXISTS TAXES CASCADE;
DROP TABLE IF EXISTS CATEGORY_PRODUCTS CASCADE;
DROP TABLE IF EXISTS LOCATION CASCADE;
DROP TABLE IF EXISTS RECOMMENDATION_PRODUCTS CASCADE;

CREATE TABLE AGENTS (
  id_document INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  document_type TEXT NOT NULL,
  person_type TEXT NOT NULL,
  name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone VARCHAR(15) NOT NULL,
  email TEXT NOT NULL
);

CREATE TABLE ROLES (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT
);

CREATE TABLE USERS (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  username VARCHAR(45) UNIQUE NOT NULL,
  password VARCHAR(45) NOT NULL,
  description TEXT,
  agent_id INT NOT NULL
);

CREATE TABLE USER_ROLES (
  role_id INT NOT NULL,
  user_id INT NOT NULL
);

CREATE TABLE PERMISSIONS (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  access_module TEXT NOT NULL,
  role_id INT NOT NULL
);

CREATE TABLE ORDERS (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  create_date DATE NOT NULL,
  receive_date DATE,
  description TEXT,
  employee_id INT NOT NULL
);

CREATE TABLE ORDER_PRODUCTS (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  product_quantity INT NOT NULL,
  product_unit_price FLOAT NOT NULL,
  product_name TEXT NOT NULL,
  order_id INT NOT NULL,
  product_lot_id INT NOT NULL
);

CREATE TABLE PRODUCT_LOTS (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  price FLOAT NOT NULL,
  enter_date DATE NOT NULL,
  quantity INT NOT NULL,
  emptyness_date DATE,
  product_id INT NOT NULL
);

CREATE TABLE PRODUCTS (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  measure_unit TEXT NOT NULL,
  location_id Int NOT NULL,
  category_product_id Int NOT NULL
);

CREATE TABLE SALES (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  creation_date DATE NOT NULL,
  description TEXT,
  client_id INT NOT NULL,
  employee_id INT NOT NULL
);

CREATE TABLE SALE_PRODUCTS (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  product_quantity INT NOT NULL,
  product_discount FLOAT NOT NULL,
  product_measure_unit TEXT NOT NULL,
  product_unit_price FLOAT NOT NULL,
  product_name TEXT NOT NULL,
  product_description TEXT,
  sale_id INT NOT NULL,
  tax_id INT NOT NULL,
  product_lot_id INT NOT NULL
);

CREATE TABLE TAXES (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  value FLOAT NOT NULL
);

CREATE TABLE CATEGORY_PRODUCTS (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT
);

CREATE TABLE LOCATION (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  img_url TEXT
);

CREATE TABLE RECOMMENDATION_PRODUCTS (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  client_id INT NOT NULL,
  product_id INT NOT NULL,
  create_date DATE NOT NULL
);

ALTER TABLE USERS ADD CONSTRAINT fk_USERS_AGENT1 FOREIGN KEY (agent_id) REFERENCES AGENTS (id_document);

ALTER TABLE USER_ROLES ADD CONSTRAINT fk_USER_ROLES_ROLES1 FOREIGN KEY (role_id) REFERENCES ROLES (id);

ALTER TABLE USER_ROLES ADD CONSTRAINT fk_USER_ROLES_USERS1 FOREIGN KEY (user_id) REFERENCES USERS (id);

ALTER TABLE PERMISSIONS ADD CONSTRAINT fk_PERMISSIONS_ROLES1 FOREIGN KEY (role_id) REFERENCES ROLES (id);

ALTER TABLE ORDERS ADD FOREIGN KEY (employee_id) REFERENCES AGENTS (id_document);

ALTER TABLE SALES ADD FOREIGN KEY (employee_id) REFERENCES AGENTS (id_document);

ALTER TABLE SALES ADD FOREIGN KEY (client_id) REFERENCES AGENTS (id_document);

ALTER TABLE SALE_PRODUCTS ADD FOREIGN KEY (tax_id) REFERENCES TAXES (id);

ALTER TABLE SALE_PRODUCTS ADD FOREIGN KEY (product_lot_id) REFERENCES PRODUCT_LOTS (id);

ALTER TABLE ORDER_PRODUCTS ADD FOREIGN KEY (product_lot_id) REFERENCES PRODUCT_LOTS (id);

ALTER TABLE ORDER_PRODUCTS ADD FOREIGN KEY (order_id) REFERENCES ORDERS (id);

ALTER TABLE PRODUCT_LOTS ADD FOREIGN KEY (product_id) REFERENCES PRODUCTS (id);

ALTER TABLE PRODUCTS ADD FOREIGN KEY (category_product_id) REFERENCES CATEGORY_PRODUCTS (id);

ALTER TABLE PRODUCTS ADD FOREIGN KEY (location_id) REFERENCES LOCATION (id);

ALTER TABLE SALE_PRODUCTS ADD FOREIGN KEY (sale_id) REFERENCES SALES (id);

ALTER TABLE RECOMMENDATION_PRODUCTS ADD FOREIGN KEY (client_id) REFERENCES AGENTS (id_document);

ALTER TABLE RECOMMENDATION_PRODUCTS ADD FOREIGN KEY (product_id) REFERENCES PRODUCTS (id);

