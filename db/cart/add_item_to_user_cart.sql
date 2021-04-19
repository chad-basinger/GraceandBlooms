insert into user_cart (user_id, item_id, quantity, chosen_size)
values($1, $2, $3, $4)
returning *;