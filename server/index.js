require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const app = express()
const authCtrl = require('./controllers/authController')
const itemCtrl = require('./controllers/itemController')
const adminCtrl = require('./controllers/adminController')


app.use(express.json())

const {SERVER_PORT, DB_CONNECTION, SESSION_SECRET} = process.env

app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14
    }
}))

//auth endpoints
app.post('/api/auth/register', authCtrl.register);
app.post('/api/auth/login', authCtrl.login);
app.get('/api/auth/me', authCtrl.getSessionUser)
app.post('/api/auth/logout', authCtrl.logout);


//item endpoints
app.get('/api/item/all', itemCtrl.getAllItems);

app.post('/api/item/add', itemCtrl.createItem);

app.get('/api/item/:id', itemCtrl.readItem);

app.put('/api/item/:id', itemCtrl.updateItem);

app.delete('/api/item/:id', itemCtrl.deleteItem);

//admin endpoints
app.post('/api/admin/addSizeAndPrice', adminCtrl.addSizePrice)

app.get('/api/admin/getAllSizes', adminCtrl.getAllSizes)


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

