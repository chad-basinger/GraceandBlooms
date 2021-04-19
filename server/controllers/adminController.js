module.exports = {
    addSizePrice: async(req, res) => {
        const {size, price} = req.body
        const {item_id} = req.params
        const db = req.app.get('db')
        try {
            const sizes = await db.admin.add_size_price(item_id, size, price)
            res.status(200).send(sizes)

        }
        catch(err) { 
            console.log(err)
            res.sendStatus(500)
        }

        
    },
    getAllSizes: async(req, res) => {
        const db = req.app.get('db')
        const {item_id} = req.params
        try {
            const allSizes = await db.admin.get_all_sizes_for_item(item_id)
            res.status(200).send(allSizes)
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    getChosenSizeID: async(req, res) => {
        const db = req.app.get('db')
        const {size, item_id} = req.params
        try {
            let sizeID = await db.admin.get_chosen_size(item_id, size)
            res.status(200).send(sizeID)
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },
    deleteSize: async(req, res) => {
        const db = req.app.get('db')
        const {size_id} = req.params
        try {
            await db.admin.deleteSize(size_id)
            .then(_ => res.sendStatus(200))
            
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    }
}