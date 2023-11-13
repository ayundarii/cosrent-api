const { PrismaClient, PrismaClientKnownRequestError } = require("@prisma/client")
const prisma = new PrismaClient()

class CatalogControllers {
    static async getCatalogs(req, res){
        const result = await prisma.cosplayCatalog.findMany({
            include: {
                category:{
                    select: {
                        category: true,
                    }
                },
                items: true
            }
        })
        res.status(200).json({ data: result })
    }

    static async getCatalogById(req, res){
        const result = await prisma.cosplayCatalog.findUnique({
            where: {
                id: Number (req.params.id)
            },
            include: {
                category:{
                    select: {
                        category: true
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

    static async addCatalog(req, res){
        try {
            await prisma.category.findUnique({
                where: {
                    id: Number (req.body.categoryId)
                }
            })

            const addedCatalog = await prisma.cosplayCatalog.create({
                data: {
                    name: req.body.name,
                    description: req.body.description,
                    size: req.body.size,
                    price: Number(req.body.price),
                    img: req.body.img,
                    availability: Boolean(req.body.availability),
                    categoryId: req.body.categoryId
                },
                include: {
                    category:{
                        select: {
                            category: true
                        }
                    } 
                }
            })

            res.status(201).json({ data: addedCatalog, message: "Data Input Success" })
        } catch(error) {
            if(error instanceof PrismaClientKnownRequestError && error.code === 'P2003'){
                return res.status(404).json({ error: 'Category does not exist' })
            }

            res.status(500).json({ error: 'An error occured while trying to add a book' })
        } 
    }

    static async deleteCatalog(req, res){
        try {
            const result = await prisma.cosplayCatalog.findUnique({
                where: {
                    id: Number (req.params.id)
                }
            })
          
            await prisma.cosplayCatalog.delete({
                where: {
                    id: Number(req.params.id)
                }
            })

            res.status(200).json({ message: 'Catalog succesfully deleted.'})
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError && error.code === 'P2025'){
                return res.status(404).json({ error: 'Catalog ID does not exist' })
            }

            res.status(500).json({ error: 'An error occured while trying to delete a catalog' })
        }
    }

    static async updateCatalog(req, res){
        try {
            const update = await prisma.cosplayCatalog.update({
                where: {
                    id: Number (req.params.id)
                },
                data: {
                    name: req.body.name,
                    description: req.body.description,
                    size: req.body.size,
                    price: Number(req.body.price),
                    img: req.body.img,
                    availability: Boolean(req.body.availability),
                    categoryId: req.body.categoryId
                },
                
            })
            
            res.status(201).json({ data: update, message: "Data succesfully updated" })
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError && error.code === 'P2025'){
                return res.status(404).json({ error: 'Catalog ID does not exist' })
            }

            res.status(500).json({ error: 'An error occured while trying to delete a catalog' })
        }
    }
}

module.exports = CatalogControllers