require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const app = express()
const authCtrl = require('./controllers/authController')
const itemCtrl = require('./controllers/itemController')


app.use(express.json())

const {SERVER_PORT, DB_CONNECTION, SESSION_SECRET} = process.env

app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}))

//auth endpoints
app.post('/api/auth/register', authCtrl.register);
app.post('/api/auth/login', authCtrl.login);
app.get('/api/auth/me', authCtrl.getSessionUser)
app.post('/api/auth/logout', authCtrl.logout);


//item endpoints
app.get('/api/items', itemCtrl.getAllItems);

app.post('/api/item', itemCtrl.createItem);

app.get('/api/item/:id', itemCtrl.readItem);

app.put('/api/item/:id', itemCtrl.editItem);

app.put('/api/item/:id', itemCtrl.deactivateItem);

app.delete('/api/item/:id', itemCtrl.deleteItem);


massive({
    connectionString: DB_CONNECTION,
    ssl: {
        rejectUnauthorized: false
    }
})
.then(db => {
    app.set('db', db)
    console.log('db connection successful AF')
    app.listen(SERVER_PORT, () => console.log(`Server is smashing on port ${SERVER_PORT}`))
})
.catch(err => console.log(err))

