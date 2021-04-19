select *
from item_sizes
where item_id = $1
AND size_price = $2;