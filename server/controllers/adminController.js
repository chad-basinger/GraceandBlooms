module.exports = {
    addSizePrice: async(req, res) => {
        const {size, price} = req.body
        const db = req.app.get('db')
        try {
            const sizes = await db.admin.add_size_price(size, price)
            res.status(200).send(sizes)

        }
        catch(err) { 
            console.log(err)
            res.sendStatus(500)
        }

        
    },
    getAllSizes: async(req, res) => {
        const db = req.app.get('db')
        try {
            const allSizes = await db.admin.get_all_sizes()
            res.status(200).send(allSizes)
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },
    deleteSize: async(req, res) => {
        const db = req.app.get('db')
        try {
            await db.admin.deleteSize(req.params.id)
            .then(_ => res.sendStatus(200))
            
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    }
}