create table users (
user_id serial primary key,
email varchar(255),
hash text,
age smallint,
is_admin boolean default 'false'
)

create table items (
item_id serial primary key,
item_name varchar(255),
item_description text,
item_price money,
date_created timestamp
)

create table user_cart (
cart_id serial,
user_id integer references users(user_id),
item_id integer references items(item_id),
quantity integer,
primary key(cart_id, item_id)
)

create table reviews (
review_id serial primary key,
item_id integer references items(item_id),
comment text,
review_img_url varchar(255),
rating integer CHECK (rating <= 5),
user_id integer references users(user_id),
date_of_comment timestamp
)

create table item_images (
image_id serial primary key,
item_id integer references items(item_id),
image_url varchar(255)
)

