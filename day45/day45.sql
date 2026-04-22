-- Bài 1: Tính tổng doanh thu của hệ thống
-- Sửa cấu trúc bảng, thêm cột mới (price_at_purchase),
ALTER TABLE order_items
ADD COLUMN price_at_purchase numeric(10,2);

-- sau đó cập nhật dữ liệu cho cột price_at_purchase
UPDATE order_items
SET price_at_purchase = products.current_price
FROM products
WHERE order_items.product_id = products.id;

-- ngăn chặn việc quên nhập giá sau này
ALTER TABLE order_items
ALTER COLUMN price_at_purchase
SET NOT NULL;

-- tính tổng tiền đơn hàng sử dụng cột price_at_purchase.
SELECT
    SUM(order_items.quantity * order_items.price_at_purchase)
        AS total_revenue
FROM orders
INNER JOIN order_items
ON orders.id = order_items.order_id;
-- Kết quả không thay đổi khi giá sản phẩm thay đổi: Checked

-- Bài 2: Lấy ra 5 khách hàng chi tiêu
-- nhiều nhất trong tháng 1/2026
SELECT
    users.id,
    users.full_name,
    SUM(order_items.quantity * order_items.price_at_purchase) AS total_amount
FROM users
INNER JOIN orders
ON users.id = orders.user_id
INNER JOIN order_items
ON orders.id = order_items.order_id
WHERE orders.order_date > '2025-12-31'
    AND orders.order_date < '2026-02-01'
    AND orders.status = 'completed'
GROUP BY users.id
ORDER BY total_amount DESC
LIMIT 5;

-- Bài 3: Lấy ra 5 user có số lượng bình luận nhiều nhất
-- trong tháng 1/2026
SELECT
    users.id,
    users.full_name,
    COUNT(comments.user_id) as comments_count
FROM users
INNER JOIN comments
ON users.id = comments.user_id
WHERE comments.created_at > '2025-12-31'
    AND comments.created_at < '2026-02-01'
GROUP BY users.id
ORDER BY comments_count DESC
LIMIT 5;

-- Bài 4: Lấy ra tất cả sản phẩm kèm số lượng bình luận
SELECT
    products.id,
    products.name,
    products.current_price,
    COUNT(comments.product_id) AS comments_count
FROM products
LEFT JOIN comments
ON products.id = comments.product_id
GROUP BY products.id
ORDER BY comments_count DESC;

-- Bài 5: Lấy ra các khách hàng có tổng chi tiêu
-- lớn hơn mức chi tiêu trung bình

WITH avg_amount_cte AS (
    SELECT
        SUM(order_items.quantity * order_items.price_at_purchase)
            AS total_amount
    FROM users
    INNER JOIN orders
    ON users.id = orders.user_id
    INNER JOIN order_items
    ON orders.id = order_items.order_id
    WHERE orders.order_date > '2025-12-31'
        AND orders.order_date < '2026-02-01'
        AND orders.status = 'completed'
    GROUP BY users.id
)
SELECT
    users.id,
    users.full_name,
    SUM(order_items.quantity * order_items.price_at_purchase) 
        AS total_amount,
    (
        SELECT
            AVG(avg_amount_cte.total_amount)
        FROM avg_amount_cte
    ) AS avg_amount
FROM users
INNER JOIN orders
ON users.id = orders.user_id
INNER JOIN order_items
ON orders.id = order_items.order_id
GROUP BY users.id
HAVING SUM(order_items.quantity * order_items.price_at_purchase) 
           >
       (
           SELECT
               AVG(avg_amount_cte.total_amount)
           FROM avg_amount_cte
       );

-- Bài 6: Với mỗi danh mục, tìm sản phẩm có tổng số lượng
-- bán ra nhiều nhất

WITH total_sold_cte AS (
    SELECT
    products.category AS category,
    products.name,
    SUM(order_items.quantity) AS total_sold
    FROM products
    INNER JOIN order_items
    ON products.id = order_items.product_id
    GROUP BY products.category, products.id
),
    max_sold_cte AS (
        SELECT
            category,
            MAX(total_sold) AS max_sold
        FROM total_sold_cte
        GROUP BY category
    )
SELECT
    total_sold_cte.*
FROM total_sold_cte
INNER JOIN max_sold_cte
ON total_sold_cte.category = max_sold_cte.category
    AND total_sold_cte.total_sold = max_sold_cte.max_sold;

-- Bài 7: Tạo một báo cáo tổng hợp cho từng khách hàng
CREATE TABLE users_summary(
    id serial primary key ,
    username varchar(50) NOT NULL ,
    total_order integer NOT NULL ,
    total_amount integer NOT NULL ,
    total_comments integer NOT NULL ,
    avg_order numeric(10,1) NOT NULL,
    CONSTRAINT fk_username
                          FOREIGN KEY (username)
                          REFERENCES users(username)
);

-- Tên khách hàng
INSERT INTO
    users_summary (username, total_order, total_amount, total_comments, avg_order)
(SELECT username, 0, 0, 0, 0
 FROM users);

-- Tổng số đơn hàng
WITH total_order_cte AS (
    SELECT
        users.id AS userID,
        COUNT(user_id) AS total

    FROM users
    INNER JOIN orders
    ON users.id = orders.user_id
    WHERE order_date > '2025-12-31'
        AND order_date < '2026-02-01'
    GROUP BY users.id
    ORDER BY userID ASC
)
UPDATE users_summary
SET total_order = total_order_cte.total
FROM total_order_cte
WHERE users_summary.id = total_order_cte.userID;

-- Tổng số tiền đã chi
WITH total_amount_cte AS (
    SELECT
        users.id AS userID,
        SUM(order_items.quantity * order_items.price_at_purchase)
            AS total_amount
    FROM users
    INNER JOIN orders
    ON users.id = orders.user_id
    INNER JOIN order_items
    ON orders.id = order_items.order_id
    WHERE order_date > '2025-12-31'
            AND order_date < '2026-02-01'
    GROUP BY users.id
    ORDER BY userID ASC
)
UPDATE users_summary
SET total_amount = total_amount_cte.total_amount
FROM total_amount_cte
WHERE users_summary.id = total_amount_cte.userID;

--Số lượng bình luận đã viết.
WITH total_comments_cte AS (
    SELECT
        users.id AS userID,
        COUNT(comments.user_id) AS total_comments
    FROM users
    INNER JOIN comments
    ON users.id = comments.user_id
    GROUP BY users.id
    ORDER BY userID ASC
)
UPDATE users_summary
SET total_comments = total_comments_cte.total_comments
FROM total_comments_cte
WHERE users_summary.id = total_comments_cte.userID;

--Đơn hàng trung bình (tổng tiền / số đơn).
UPDATE users_summary
SET avg_order = total_amount / total_order
WHERE total_amount > 0;

-- Bài 8: Tìm các sản phẩm chưa từng được bán
SELECT
    products.id,
    products.name,
    products.current_price,
    products.category,
    COUNT(order_items.product_id) AS product_count
FROM products
LEFT JOIN order_items
ON products.id = order_items.product_id
GROUP BY products.id
HAVING COUNT(order_items.product_id) = 0;

-- Bài 9: Tính doanh thu theo từng tháng
WITH total_revenue_2026JAN_cte AS (
    SELECT
        '2026-01' AS "month",
        SUM(order_items.quantity * order_items.price_at_purchase)
            AS total_revenue
    FROM orders
    LEFT JOIN  order_items
    ON orders.id = order_items.order_id
    WHERE orders.order_date > '2025-12-31'
        AND orders.order_date < '2026-02-01'
),
total_revenue_2025DEC_cte AS (
    SELECT
        '2025-12' AS "month",
        SUM(order_items.quantity * order_items.price_at_purchase)
            AS total_revenue
    FROM orders
    INNER JOIN  order_items
    ON orders.id = order_items.order_id
    WHERE orders.order_date > '2025-11-30'
        AND orders.order_date < '2026-01-01'
),
total_order_2026JAN_cte AS (
    SELECT
        '2026-01' AS "month",
        COUNT(orders.order_date) AS total_order
    FROM orders
    WHERE orders.order_date > '2025-12-31'
        AND orders.order_date < '2026-02-01'
),
total_order_2025DEC_cte AS (
    SELECT
        '2025-12' AS "month",
        COUNT(orders.order_date) AS total_order
    FROM orders
    WHERE orders.order_date > '2025-11-30'
        AND orders.order_date < '2026-01-01'
)
SELECT
    total_revenue_2025DEC_cte.*,
    total_order_2025DEC_cte.total_order,
    (total_revenue_2025DEC_cte.total_revenue / total_order)
        AS avg_order
FROM total_revenue_2025DEC_cte
INNER JOIN total_order_2025DEC_cte
ON total_revenue_2025DEC_cte."month" = total_order_2025DEC_cte."month"
UNION ALL
SELECT
    total_revenue_2026JAN_cte.*,
    total_order_2026JAN_cte.total_order,
    (total_revenue_2026JAN_cte.total_revenue / total_order)
        AS avg_order
FROM total_revenue_2026JAN_cte
INNER JOIN total_order_2026JAN_cte
ON total_revenue_2026JAN_cte."month" = total_order_2026JAN_cte."month";

-- Bài 10: Tìm khách hàng trung thành
SELECT
    users.full_name,
    users_summary.total_order,
    users_summary.total_amount
FROM users
INNER JOIN users_summary
ON users.username = users_summary.username
WHERE total_order >= 2 
    AND total_amount >= 30000000;