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
        const {name, description, displayPrice, is_active, main_img_url} = req.body;
        const date_created = new Date()

        try{
            const newItem = await db.items.create_item(name, description, displayPrice, date_created, is_active, main_img_url)
    
            //NOT SURE HOW TO INSERT INTO item_images multiple rows
            // if(newItem){
            //     const id = newItem.item_id
            //     newImages = await db.items.add_images(id, image_url)
    
            // }
    
            res.status(200).send(newItem)

        }
        catch(err) { 
            console.log(err)
            res.sendStatus(500)
        }
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

        try{

            const db = req.app.get('db')
            const {id} = req.params
            const {name, description, displayPrice, is_active, image_urls} = req.body
            const updatedItem = await db.items.update_item(id, name, description, displayPrice, is_active)
          
        res.status(200).send(updatedItem)
        }
        catch(err) { 
            console.log(err)
            res.sendStatus(500)
        }

        // res.status(200).send(updatedItem, updatedItemImages)
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
        
    },
    addImagesToItem: async(req, res) => {
        try{
            const db = req.app.get('db')
            const {id} = req.params;
            const {image_urls} = req.body;
            console.log(image_urls, 'IMAGE_URLS')
            if(image_urls.length > 1){
                var updatedItemImages = [];
                for(let i = 0; i < image_urls.length; i++){
                    const el_img_url = image.urls[i]
                    const addedOneItem = await db.items.add_images(id, el_img_url[0])
                    updatedItemImages.push(addedOneItem)
                    console.log('added one Item', addedOneItem)
                }
                console.log('updated item images', updatedItemImages)
                
                res.status(200).send(updatedItemImages)
            }
            else {
            const updatedItemImages = await db.items.add_images(id, image_urls[0])
            console.log('updated item images', updatedItemImages)
            res.status(200).send(updatedItemImages)

            }
        }
        catch(err) { 
            console.log(err)
            res.sendStatus(500)
        }
    }

}