
module.exports ={
    getUserCart: (req, res) => {
        const db = req.app.get('db');
    },
    addItemToCart: async(req, res) => {
        const db = req.app.get('db');
        const {user_id, item_id} = req.params
        const {quantity, chosen_size} = req.body;

        try{
            const itemAdded = await db.cart.add_item_to_user_cart(user_id, item_id, quantity, chosen_size)

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