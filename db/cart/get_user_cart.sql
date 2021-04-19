--get item_name, main_img_url, is_active from items
--get quantity from user_cart
--get size, size_price from item_sizes

select i.item_name, i.main_img_url, i.is_active, uc.quantity, isi.size, isi.size_price
from items i JOIN user_cart uc ON i.item_id = uc.item_id
JOIN item_sizes isi ON isi.size_id = uc.size_id
WHERE uc.user_id = $1;

