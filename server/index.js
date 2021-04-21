require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const app = express()
const authCtrl = require('./controllers/authController')
const itemCtrl = require('./controllers/itemController')
const adminCtrl = require('./controllers/adminController')
const cartCtrl = require('./controllers/cartController')
const auth = require('./middleware/authMiddleware');


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

app.post('/api/item/add', auth.adminsOnly, itemCtrl.createItem);

app.post('/api/item/addImages/:id', auth.adminsOnly, itemCtrl.addImagesToItem);

app.get('/api/item/:id', itemCtrl.readItem);

app.put('/api/item/:id', auth.adminsOnly, itemCtrl.updateItem);

app.delete('/api/item/:id', auth.adminsOnly, itemCtrl.deleteItem);

//cart endpoints
app.get('/api/cart/:user_id', cartCtrl.getUserCart)
app.get
app.post('/api/cart/:user_id/:item_id', cartCtrl.addItemToCart)
app.put('/api/cart/:cart_id/decrease/:item_id', cartCtrl.decreaseQuantity)
app.put('/api/cart/:cart_id/increase/:item_id', cartCtrl.increaseQuantity)
app.delete('/api/cart/:cart_id/delete/:item_id', cartCtrl.deleteItemFromCart)
app.delete('/api/cart/clear/:user_id', cartCtrl.clearEntireCart)


//size/price endpoints
app.post('/api/admin/addSizeAndPrice/:item_id', auth.adminsOnly, adminCtrl.addSizePrice)

app.get('/api/admin/getChosenSizeID/:item_id/:size', adminCtrl.getChosenSizeID)

app.get('/api/admin/getAllSizes/:item_id', adminCtrl.getAllSizes)

app.delete('/api/admin/size/:size_id', auth.adminsOnly, adminCtrl.deleteSize)


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

