insert into items (item_name, item_description, item_price, date_created, is_active)
VALUES ($1, $2, $3, $4, $5)
returning *;

