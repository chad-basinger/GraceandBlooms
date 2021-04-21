insert into item_images
(item_id, image_url)
values ($1, $2)
returning *;