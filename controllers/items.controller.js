const { PrismaClient, PrismaClientKnownRequestError } = require("@prisma/client")
const prisma = new PrismaClient()

class ItemController {
    static async getItems(req, res){
        const result = await prisma.item.findMany()
        
        res.json({ data: result })
    }

    static async getItemById(req, res){
        const result = await prisma.item.findUnique({
            where: {
                id: Number (req.params.id)
            },
            include: {
                cosplayCatalog:{
                    select: {
                        name: true,
                        description: true
                    }
                } 
            }
        })
    
        if(result){
            res.status(200).json({ data: result })  
        } else {
            res.status(404).json({ message: "Data not found" })
        }
    }

    static async addItem(req, res){
        const result = await prisma.item.create({
            data: {
                name: req.body.name,
                description: req.body.description,
                catalogId: req.body.catalogId
            }
        })
    
        res.status(201).json({ data: result, message: "Data Input Success" })
    }

    static async deleteItem(req, res){
        try {
            const result = await prisma.item.findUnique({
                where: {
                    id: Number (req.params.id)
                }
            })
          
            await prisma.item.delete({
                where: {
                    id: Number (req.params.id)
                }
            })

            res.status(200).json({ message: 'Item succesfully deleted.'})
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError && error.code === 'P2025'){
                return res.status(404).json({ error: 'Item ID does not exist' })
            }

            res.status(500).json({ error: 'An error occured while trying to delete a category' })
        }
    }

    static async updateItem(req, res){
        try {
            const update = await prisma.category.update({
                where: {
                    id: Number (req.params.id)
                },
                data: {
                    name: req.body.name,
                    description: req.body.description,
                    catalogId: req.body.catalogId
                }
            })

            
            res.status(201).json({ data: update, message: "Data succesfully updated" })
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError && error.code === 'P2025'){
                return res.status(404).json({ error: 'Item ID does not exist' })
            }

            res.status(500).json({ error: 'An error occured while trying to delete a catalog' })
        }
    }
}

module.exports = ItemController