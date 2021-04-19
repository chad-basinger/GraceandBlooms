insert into item_sizes (item_id, size, size_price)
values($1, $2, $3)
returning *;
