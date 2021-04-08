update items 
set item_name = $2,
item_description = $3,
item_price = $4,
date_created = $5,
is_active = $6
where item_id = $1
returning *;

