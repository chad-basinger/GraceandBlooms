module.exports = {
    getAllItems: async(req, res) => {
        const db = req.app.get('db')
        try {
            const ListItems = await db.items.get_all_items()
            res.status(200).send(ListItems)

        }
        catch(err) { 
            console.log(err)
            res.sendStatus(500)
        }

        
    },
    createItem: async(req, res) => {
        const db = req.app.get('db')
        const {name, description, price, active} = req.body;
        const date_created = new Date()
        newItem = await db.items.create_item(name, description, price, date_created, active)

        //NOT SURE HOW TO INSERT INTO item_images multiple rows
        // if(newItem){
        //     const id = newItem.item_id
        //     newImages = await db.items.add_images(id, image_url)

        // }

        res.status(200).send(newItem)
    },
    readItem: async(req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        const itemListing = await db.items.get_item_by_id(id)
        const item_images = await db.items.get_item_images(id)

        var itemResponse = {
            item: itemListing,
            images: item_images
        }
        //return item details and all images tied to that item
        res.status(200).send(itemResponse)
    },
    updateItem: async(req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        const {name, description, price, active} = req.body
        const {date} = Date()
        updatedItem = await db.items.update_item(id, name, description, price, date, active)
        //need to update item_images table

        res.status(200).send(updatedItem)
    },
    deleteItem: async(req, res) => {
        const db = req.app.get('db')
        const {id} = req.params

        try{
            await db.items.delete_item_images(id)
            await db.items.delete_item(id)

            res.sendStatus(200)
        }
        catch(err) { 
            console.log(err)
            res.sendStatus(500)
        }
        
    }

}