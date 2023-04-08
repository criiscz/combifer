
-- insert data into AGENTS table
INSERT INTO AGENTS (document_type, person_type, name, last_name, phone, email)
VALUES
('National ID', 'Natural Person', 'John', 'Doe', '+1 555-555-5555', 'john.doe@example.com'),
('Passport', 'Juridical Person', 'Acme Inc.', '', '+1 555-123-4567', 'info@acme.com'),
('National ID', 'Natural Person', 'Jane', 'Doe', '+1 555-555-1234', 'jane.doe@example.com'),
('National ID', 'Natural Person', 'Bob', 'Smith', '+1 555-555-6789', 'bob.smith@example.com');

-- insert data into ROLES table
INSERT INTO ROLES (name, description)
VALUES
('Administrator', 'Has access to all modules'),
('Manager', 'Has access to sales and orders modules'),
('Salesperson', 'Has access to sales module only'),
('Order Clerk', 'Has access to orders module only');

-- insert data into USERS table
INSERT INTO USERS (username, password, description, agent_id)
VALUES
('admin', '12345', 'System administrator', 1),
('manager', 'password', 'Sales and orders manager', 2),
('salesperson', 'secret', 'Salesperson', 3),
('orderclerk', 'p@ssw0rd', 'Order clerk', 4);

-- insert data into USER_ROLES table
INSERT INTO USER_ROLES (role_id, user_id)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4);

-- insert data into PERMISSIONS table
INSERT INTO PERMISSIONS (name, access_module, role_id)
VALUES
('Create Orders', 'Orders', 2),
('Update Orders', 'Orders', 2),
('Delete Orders', 'Orders', 2),
('Create Sales', 'Sales', 2),
('Update Sales', 'Sales', 2),
('Delete Sales', 'Sales', 2),
('View Sales', 'Sales', 3),
('View Orders', 'Orders', 4);

INSERT INTO locations (name, description, img_url) VALUES ('Warehouse A', 'Large warehouse for storing products', 'https://example.com/warehouseA.jpg');
INSERT INTO locations (name, description, img_url) VALUES ('Retail Store 1', 'Small retail store located in downtown', 'https://example.com/retailstore1.jpg');
INSERT INTO locations (name, description, img_url) VALUES ('Retail Store 2', 'Medium retail store located in the suburbs', 'https://example.com/retailstore2.jpg');
INSERT INTO locations (name, description, img_url) VALUES ('Factory', 'Large factory for manufacturing products', 'https://example.com/factory.jpg');
INSERT INTO locations (name, description, img_url) VALUES ('Office', 'Corporate office for managing company operations', 'https://example.com/office.jpg');

-- insert data into ORDERS table
INSERT INTO ORDERS (create_date, receive_date, description, employee_id)
VALUES
('2023-04-01', '2023-04-08', 'Order for Acme Inc.', 2),
('2023-04-02', '2023-04-09', 'Order for Jane Doe', 4),
('2023-04-03', NULL, 'Urgent order for Bob Smith', 4);

-- insert data into ORDER_PRODUCTS table
INSERT INTO ORDER_PRODUCTS (product_quantity, product_unit_price, product_name, order_id, product_lot_id)
VALUES
(10, 2.50, 'Pencil', 1, 1),
(5, 10.00, 'Printer', 2, 2),
(2, 100.00, 'Smartphone', 3, 3);

INSERT INTO PRODUCT_LOTS (price, enter_date, quantity, emptyness_date, product_id)
VALUES
  (10.50, '2022-01-01', 100, NULL, 1),
  (12.00, '2022-01-05', 150, NULL, 1),
  (9.75, '2022-02-10', 80, NULL, 2),
  (8.90, '2022-02-15', 120, NULL, 2),
  (11.25, '2022-03-20', 90, '2022-04-25', 3),
  (13.50, '2022-04-01', 200, '2022-06-30', 3),
  (10.80, '2022-05-05', 70, NULL, 4),
  (7.50, '2022-05-10', 100, NULL, 4);


INSERT INTO PRODUCTS (name, description, measure_unit, location_id, category_product_id)
VALUES ('Blue T-Shirt', 'Soft cotton t-shirt in blue color', 'piece', 1, 1);

INSERT INTO PRODUCTS (name, description, measure_unit, location_id, category_product_id)
VALUES ('Black Jeans', 'Slim-fit black jeans made of stretch denim', 'piece', 2, 1);

INSERT INTO PRODUCTS (name, description, measure_unit, location_id, category_product_id)
VALUES ('Red Sneakers', 'Sporty red sneakers with white sole', 'pair', 3, 2);

INSERT INTO PRODUCTS (name, description, measure_unit, location_id, category_product_id)
VALUES ('White Polo', 'Classic white polo shirt with logo', 'piece', 1, 1);

INSERT INTO PRODUCTS (name, description, measure_unit, location_id, category_product_id)
VALUES ('Leather Jacket', 'Brown leather jacket with zip and pockets', 'piece', 2, 3);


INSERT INTO sales (creation_date, description, client_id, employee_id) VALUES
    ('2022-01-15', 'Sale of 10 t-shirts to client A', 1, 2),
    ('2022-02-01', 'Sale of 5 jeans to client B', 2, 3),
    ('2022-03-05', 'Sale of 3 jackets to client C', 3, 1),
    ('2022-04-22', 'Sale of 2 dresses to client A', 1, 2),
    ('2022-05-10', 'Sale of 8 shorts to client D', 4, 3);

INSERT INTO SALE_PRODUCTS (product_quantity, product_discount, product_measure_unit, product_unit_price, product_name, product_description, sale_id, tax_id, product_lot_id) VALUES
(10, 0.1, 'pieces', 12.5, 'Product A', 'This is a description for Product A', 1, 1, 1),
(5, 0, 'liters', 8.75, 'Product B', 'This is a description for Product B', 1, 2, 2),
(3, 0.05, 'pieces', 20, 'Product C', 'This is a description for Product C', 2, 1, 3),
(20, 0.2, 'pieces', 15.99, 'Product D', 'This is a description for Product D', 2, 2, 4),
(7, 0, 'liters', 6.5, 'Product E', 'This is a description for Product E', 3, 1, 5);


INSERT INTO taxes (name, description, value) VALUES ('VAT', 'Value Added Tax', 0.18);
INSERT INTO taxes (name, description, value) VALUES ('Sales Tax', 'Tax on sales or transfer of goods', 0.05);
INSERT INTO taxes (name, description, value) VALUES ('Excise Tax', 'Tax on specific goods like tobacco and alcohol', 0.2);
INSERT INTO taxes (name, description, value) VALUES ('Property Tax', 'Tax on the value of owned property', 0.1);
INSERT INTO taxes (name, description, value) VALUES ('Income Tax', 'Tax on personal income', 0.3);

