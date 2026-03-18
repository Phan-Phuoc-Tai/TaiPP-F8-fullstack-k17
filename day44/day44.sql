-- 1. Tìm thông tin khách hàng theo địa chỉ
SELECT
    *
FROM
    khach_hang
WHERE dia_chi = 'Hoa xuan';

-- 2. Hiển thị thông tin các phòng được đặt nhiều lần
-- 2.1 Chỉ lấy những phòng được khách hàng đặt có số lần đặt lớn hơn 2 lần.
SELECT
    phong.id,
    dat_phong.ma_phong as ma_phong,
    phong.loai_phong,
    phong.so_khach_toi_da,
    phong.gia_phong,
    COUNT(dat_phong.ma_phong) as so_lan_dat
FROM
    phong
JOIN
    dat_phong
ON
    phong.ma_phong = dat_phong.ma_phong
GROUP BY phong.id,dat_phong.ma_phong
HAVING COUNT(dat_phong.ma_phong) >= 2;

-- 2.2 Trạng thái đặt phải là "Da dat".
SELECT
    phong.*, dat_phong.trang_thai_dat
FROM phong
JOIN
    dat_phong
ON
    phong.ma_phong = dat_phong.ma_phong
WHERE dat_phong.trang_thai_dat = 'Da dat';

-- 3. Tìm khách hàng theo tên và độ dài
SELECT
    id, ten_kh
FROM
    khach_hang
WHERE ((ten_kh LIKE '%H%')
   OR (ten_kh LIKE '%N%')
   OR (ten_kh LIKE '%M%'))
   AND LENGTH(ten_kh) <= 20;

--5. Tìm dịch vụ đi kèm theo đơn vị tính và giá
SELECT
    *
FROM
    dich_vu_di_kem
WHERE (don_vi_tinh ilike '%lon%' AND don_gia > 10000)
   OR (don_vi_tinh ilike '%cai%' AND don_gia < 5000);

-- 6. Hiển thị chi tiết đơn đặt phòng theo năm và giá phòng
SELECT
    dat_phong.*
FROM
    dat_phong
JOIN
    phong
ON
    dat_phong.ma_phong = phong.ma_phong
WHERE (ngay_dat >= '2016-01-01' AND ngay_dat < '2018-01-01')
  AND phong.gia_phong > 50000;