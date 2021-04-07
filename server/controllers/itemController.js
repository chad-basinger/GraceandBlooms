module.exports = {
    getAllItems: async(req, res) => {
        const {db} = req.app.get('db')
        ListItems = await db.items.get_all_items()
        res.status(200).send(ListItems)
    },
    createItem: async(req, res) => {
        const {db} = req.app.get('db')
        const {name, description, price, image_url} = req.body;
        const {date_created} = Date()
        newItem = await db.items.create_item(name, description, price, image_url, date_created)

        res.status(200).send(newItem)
    },
    readItem: async(req, res) => {
        const {db} = req.app.get('db')
        const {id} = req.params
        itemListing = await db.items.get_item_by_id(id)
        res.status(200).send(itemListing)
    },
    editItem: (req, res) => {
        const {db} = req.app.get('db')
        

        res.status(200)
    },
    deactivateItem: (req, res) => {
        const {db} = req.app.get('db')
        res.status(200)
    },
    deleteItem: (req, res) => {
        const {db} = req.app.get('db')
        res.status(200)
    }
}