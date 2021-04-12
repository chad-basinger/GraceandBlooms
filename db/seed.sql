--create table users
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
date_created timestamp,
is_active boolean NOT NULL,
main_img_url text
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

create table item_sizes (
size_id serial primary key,
size varchar(255),
size_price money
)


insert into items (item_name, item_description, item_price, date_created, is_active)
VALUES ('pink bracelet', 'very pink bracelet made with beads', 12.99, '04-06-21 12:00:17', true)

insert into item_sizes
(size, size_price)
values ('3.5cmm-5cmm', 10.99)

