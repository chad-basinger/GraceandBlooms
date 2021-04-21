update items 
set item_name = $2,
item_description = $3,
item_price = $4,
is_active = $5
where item_id = $1
returning *;

