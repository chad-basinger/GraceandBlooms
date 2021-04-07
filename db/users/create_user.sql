insert into users (email, hash, age, is_admin)
values($1, $2, $3, 'false')
returning *