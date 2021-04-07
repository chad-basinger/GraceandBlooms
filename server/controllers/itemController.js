module.exports = {
    getAllItems: async(req, res) => {
        const {db} = req.app.get('db')
        ListItems = await db.items.get_all_items()
        res.status(200).send(ListItems)
    },
    createItem: async(req, res) => {
        const {db} = req.app.get('db')
        const {name, description, price, active} = req.body;
        const {date_created} = Date()
        newItem = await db.items.create_item(name, description, price, image_url, date_created, active)
        

        res.status(200).send(newItem)
    },
    readItem: async(req, res) => {
        const {db} = req.app.get('db')
        const {id} = req.params
        itemListing = await db.items.get_item_by_id(id)
        item_images = await db.items.get_item_images(id)
        res.status(200).send(itemListing, item_images)
    },
    updateItem: async(req, res) => {
        const {db} = req.app.get('db')
        const {id} = req.params
        const {name, description, price, active} = req.body
        const {date} = Date()
        updatedItem = await db.items.update_item(id, name, description, price, date, active)
        //need to update item_images table

        res.status(200).send(updatedItem)
    },
    // addImages: async(req, res) => {
    //     const {db} = req.app.get('db')
    //     const {id} = req.
    // },
    
    deleteItem: async(req, res) => {
        const {db} = req.app.get('db')
        const {id} = req.params
        await db.items.delete_item(id)
        res.sendStatus(200)
    }

}