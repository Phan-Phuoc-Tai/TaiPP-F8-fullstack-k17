-- 1. Thiết kế schema database cho hệ thống ví điện tử mini
-- Lý do nên dùng kiểu NUMERIC(18,2) cho các cột tiền tệ
-- + Là số thập phân có độ chính xác cố định
-- + Tránh sai số khi làm tròn

-- Tại sao bảng wallets phải lưu cột balance (số dư tại thời điểm hiện tại)
-- thay vì tính lại từ toàn bộ transactions mỗi khi cần.
-- + Dễ dàng rà soát số dư tại các thời điểm khác nhau.
-- + Không làm chậm tốc độ truy vấn. Thay vì phải quét và SUM tất cả record của amount trong transactions, ta chỉ cần lấy record của cột balance ở bảng wallets
-- + Dễ dàng kiểm tra user có đủ tiền để thực hiện chuyển tiền hay không

-- 2. Viết transaction cho luồng chuyển tiền
-- Viết transaction mô phỏng luồng người dùng A chuyển tiền cho người dùng B
BEGIN;
UPDATE wallets
SET balance = balance - 7500
-- WHERE owner_name = 'usera';
-- NOTE: Transaction sử dụng WHERE owner_name = 'usera' có thể gây ra lỗi nếu tên người dùng không tồn tại hoặc trùng lặp. Nên sử dụng wallet ID thay vì tên người dùng để đảm bảo chính xác
WHERE id = 1;

UPDATE wallets
SET balance = balance + 7500
-- WHERE owner_name = 'userb';
WHERE id = 2;

INSERT INTO transactions (sender_wallet_id, receiver_wallet_id, type_id, amount, note)
VALUES (1, 2, 3, 7500,'usera transfer');

INSERT INTO transaction_logs (transaction_id, step, status)
VALUES (LASTVAL(), 'Automatic money transfer', 'success');

COMMIT;

-- Viết thêm transaction đơn giản hơn cho luồng nạp tiền vào ví
-- (không có sender, chỉ cộng vào balance và ghi log).
BEGIN;
UPDATE wallets
SET balance = balance + 5500
WHERE owner_name = 'usera';

INSERT INTO transactions (sender_wallet_id, receiver_wallet_id, type_id, amount, note)
VALUES (null, 1, 1, 5500, 'deposit with live bank');

INSERT INTO transaction_logs (transaction_id, step, status)
VALUES (LASTVAL(), 'Automatic money deposit', 'success');
COMMIT;

-- Nếu bỏ transaction và hai lệnh UPDATE chạy riêng lẻ, điều gì sẽ xảy ra
-- nếu server bị crash giữa lệnh trừ tiền ví A và lệnh cộng tiền ví B.
-- Lệnh trừ tiền ví A vẫn được thực hiện và ví B không nhận được tiền
