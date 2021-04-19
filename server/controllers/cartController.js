
module.exports ={
    getUserCart: async(req, res) => {
        const db = req.app.get('db');
        const {user_id} = req.params;

        try{
            const userCart = await db.cart.get_user_cart(user_id)

            return res.status(200).send(userCart)
        }
        catch(err){
            console.log(err)
            return res.sendStatus(501)
        }
    },
    addItemToCart: async(req, res) => {
        const db = req.app.get('db');
        const {user_id, item_id} = req.params
        const {quantity, chosenSizeID} = req.body;

        try{
            const itemAdded = await db.cart.add_item_to_user_cart(user_id, item_id, quantity, chosenSizeID)

            return res.status(200).send(itemAdded)

        }
        catch(err){
            console.log(err)
            return res.sendStatus(500)
        }

    },
    decreaseQuantity: (req, res) => {
        const db = req.app.get('db');
    },
    increaseQuantity: (req, res) => {
        const db = req.app.get('db');
    },
    deleteItemFromCart: (req, res) => {
        const db = req.app.get('db');
    },
    clearEntireCart: (req, res) => {
        const db = req.app.get('db');
    },
}