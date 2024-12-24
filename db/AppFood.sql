-- Step 1: Create the database
CREATE DATABASE FoodApp;

USE FoodApp;

-- Step 2: Create the tables
CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE restaurant (
    res_id INT AUTO_INCREMENT PRIMARY KEY,
    res_name VARCHAR(255),
    image VARCHAR(255),
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE food_type (
    type_id INT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE food (
    food_id INT AUTO_INCREMENT PRIMARY KEY,
    food_name VARCHAR(255),
    image VARCHAR(255),
    price FLOAT,
    description VARCHAR(255),
    type_id INT,
    FOREIGN KEY (type_id) REFERENCES food_type(type_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE sub_food (
    sub_id INT AUTO_INCREMENT PRIMARY KEY,
    sub_name VARCHAR(255),
    sub_price FLOAT,
    food_id INT,
    FOREIGN KEY (food_id) REFERENCES food(food_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    food_id INT,
    amount INT,
    code VARCHAR(255),
    arr_sub_id VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (food_id) REFERENCES food(food_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE rate_res (
    rate_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    res_id INT,
    amount INT,
    date_rate DATETIME,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (res_id) REFERENCES restaurant(res_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE like_res (
    like_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    res_id INT,
    date_like DATETIME,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (res_id) REFERENCES restaurant(res_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Step 3: Insert sample data (optional)
INSERT INTO user (full_name, email, password)
VALUES ('John Doe', 'john@example.com', 'password123');

INSERT INTO food_type (type_name)
VALUES ('Beverages'), ('Main Course');

INSERT INTO food (food_name, image, price, description, type_id)
VALUES ('Pizza', 'pizza.jpg', 10.99, 'Delicious cheese pizza', 2);

INSERT INTO restaurant (res_name, image, description)
VALUES ('Pizza Palace', 'pizzapalace.jpg', 'Best pizza in town');



-- Thêm dữ liệu mẫu vào bảng user
INSERT INTO user (full_name, email, password) 
VALUES 
('Nguyen Van A', 'nguyenvana@example.com', '123456'),
('Tran Thi B', 'tranthib@example.com', 'password1'),
('Le Hoang C', 'lehoangc@example.com', 'securepwd'),
('Pham Minh D', 'phamminhd@example.com', 'qwerty123'),
('Do Thi E', 'dothie@example.com', 'letmein'),
('Vu Van F', 'vuvanf@example.com', 'abc123'),
('Nguyen Thi G', 'nguyentig@example.com', 'mypassword'),
('Tran Van H', 'tranvanh@example.com', 'pass123'),
('Le Thi I', 'lethii@example.com', 'welcome1'),
('Nguyen Hoang J', 'nguyenhoangj@example.com', 'secure123');

-- Thêm dữ liệu mẫu vào bảng restaurant
INSERT INTO restaurant (res_name, image, description)
VALUES 
('Pizza Palace', 'pizza_palace.jpg', 'Best pizza in town'),
('Sushi World', 'sushi_world.jpg', 'Fresh and delicious sushi'),
('Burger Hub', 'burger_hub.jpg', 'Juicy and flavorful burgers'),
('Pho Delight', 'pho_delight.jpg', 'Authentic Vietnamese pho'),
('Banh Mi Corner', 'banh_mi_corner.jpg', 'Tasty banh mi sandwiches'),
('Taco Fiesta', 'taco_fiesta.jpg', 'Mexican tacos with a twist'),
('Pasta Paradise', 'pasta_paradise.jpg', 'Heavenly pasta dishes'),
('Steak House', 'steak_house.jpg', 'Premium quality steaks'),
('Dim Sum Spot', 'dim_sum_spot.jpg', 'Steamed and fried dim sum'),
('Korean BBQ', 'korean_bbq.jpg', 'Grilled Korean delicacies');

-- Thêm dữ liệu mẫu vào bảng food_type
INSERT INTO food_type (type_name)
VALUES 
('Appetizers'),
('Main Course'),
('Desserts'),
('Beverages'),
('Seafood'),
('Vegetarian'),
('Fast Food'),
('Asian Cuisine'),
('Western Cuisine'),
('Healthy Options');

-- Thêm dữ liệu mẫu vào bảng food
INSERT INTO food (food_name, image, price, description, type_id)
VALUES 
('Margherita Pizza', 'margherita_pizza.jpg', 7.99, 'Classic cheese and tomato pizza', 2),
('California Roll', 'california_roll.jpg', 9.99, 'Crab and avocado sushi roll', 5),
('Cheeseburger', 'cheeseburger.jpg', 5.49, 'Beef burger with cheese', 7),
('Chicken Pho', 'chicken_pho.jpg', 6.99, 'Vietnamese chicken noodle soup', 8),
('Classic Banh Mi', 'classic_banh_mi.jpg', 3.99, 'Banh mi with pork and pickled vegetables', 8),
('Churros', 'churros.jpg', 4.99, 'Fried dough with cinnamon sugar', 3),
('Spaghetti Carbonara', 'spaghetti_carbonara.jpg', 8.49, 'Creamy pasta with bacon', 9),
('Grilled Steak', 'grilled_steak.jpg', 14.99, 'Tender and juicy steak', 2),
('Shrimp Dumplings', 'shrimp_dumplings.jpg', 6.49, 'Steamed shrimp dumplings', 5),
('Matcha Latte', 'matcha_latte.jpg', 4.49, 'Creamy green tea latte', 4);

-- Thêm dữ liệu mẫu vào bảng sub_food
INSERT INTO sub_food (sub_name, sub_price, food_id)
VALUES 
('Extra Cheese', 1.50, 1),
('Spicy Mayo', 0.50, 2),
('Bacon', 2.00, 3),
('Fresh Basil', 0.75, 1),
('Pickled Vegetables', 0.99, 5),
('Sweet Sauce', 0.50, 6),
('Parmesan Cheese', 1.50, 7),
('Steamed Rice', 1.99, 4),
('Garlic Sauce', 0.75, 8),
('Seaweed Wrap', 0.99, 2);

-- Thêm dữ liệu mẫu vào bảng like_res
INSERT INTO like_res (user_id, res_id, date_like) 
VALUES 
(1, 1, '2024-12-01 10:30:00'),
(2, 1, '2024-12-02 14:00:00'),
(3, 2, '2024-12-02 16:00:00'),
(4, 3, '2024-12-03 09:00:00'),
(5, 4, '2024-12-03 13:00:00'),
(6, 1, '2024-12-04 11:30:00'),
(7, 5, '2024-12-04 15:45:00'),
(8, 6, '2024-12-05 08:20:00'),
(9, 3, '2024-12-05 18:00:00'),
(10, 2, '2024-12-06 12:00:00');




-- Thêm dữ liệu mẫu vào bảng orders
INSERT INTO orders (user_id, food_id, amount, code, arr_sub_id)
VALUES
(1, 1, 2, 'ORD001', 'S001'),
(2, 2, 1, 'ORD002', 'S002'),
(3, 1, 3, 'ORD003', 'S003'),
(4, 3, 1, 'ORD004', 'S004'),
(5, 4, 4, 'ORD005', 'S005'),
(1, 5, 2, 'ORD006', 'S006'),
(2, 1, 1, 'ORD007', 'S007'),
(6, 2, 3, 'ORD008', 'S008'),
(7, 3, 2, 'ORD009', 'S009'),
(8, 4, 1, 'ORD010', 'S010');

INSERT INTO rate_res (user_id, res_id, amount, date_rate)
VALUES 
(1, 2, 5, '2024-12-24 10:00:00'),
(2, 3, 4, '2024-12-24 10:15:00'),
(3, 4, 3, '2024-12-24 10:30:00'),
(4, 5, 5, '2024-12-24 10:45:00'),
(5, 6, 2, '2024-12-24 11:00:00'),
(6, 7, 4, '2024-12-24 11:15:00'),
(7, 8, 3, '2024-12-24 11:30:00'),
(8, 9, 4, '2024-12-24 11:45:00'),
(9, 10, 5, '2024-12-24 12:00:00'),
(10, 11, 1, '2024-12-24 12:15:00');


-- 1.Tìm 5 người đã like nhà hàng nhiều nhất:
SELECT user_id, COUNT(res_id) AS like_count
FROM like_res
GROUP BY user_id
ORDER BY like_count DESC
LIMIT 5;

-- 2.Tìm 2 nhà hàng có lượt like nhiều nhất:
SELECT res_id, COUNT(user_id) AS like_count
FROM like_res
GROUP BY res_id
ORDER BY like_count DESC
LIMIT 2;

-- 3.Tìm người đã đặt hàng nhiều nhất:
SELECT user_id, COUNT(order_id) AS order_count
FROM orders
GROUP BY user_id
ORDER BY order_count DESC
LIMIT 1;


-- 4.Tìm người dùng không hoạt động trong hệ thống (không đặt hàng, không like, không đánh giá nhà hàng):
SELECT user_id
FROM user
WHERE user_id NOT IN (
    SELECT DISTINCT user_id FROM like_res
)
AND user_id NOT IN (
    SELECT DISTINCT user_id FROM orders
)
AND user_id NOT IN (
    SELECT DISTINCT user_id FROM rate_res
);





