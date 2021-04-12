insert into item_sizes (size, size_price)
values($1, $2)
returning *;
