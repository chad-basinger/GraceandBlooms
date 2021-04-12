insert into users (email, hash, is_admin)
values($1, $2, 'false')
returning *