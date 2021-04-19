insert into user_cart (user_id, item_id, quantity, size_id)
values($1, $2, $3, $4)
returning *;