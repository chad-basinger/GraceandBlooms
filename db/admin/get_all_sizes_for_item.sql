select * from item_sizes
where item_id = $1
order by size_price asc;