const { PrismaClient, PrismaClientKnownRequestError } = require("@prisma/client")
const prisma = new PrismaClient()

class CategoryController {
    static async getCategory(req, res){
        const result = await prisma.category.findMany()
        
        res.json({ data: result })
    }

    static async getCategoryById(req, res){
        const result = await prisma.category.findUnique({
            where: {
                id: Number (req.params.id)
            }
        })
    
        if(result){
            res.status(200).json({ data: result })  
        } else {
            res.status(404).json({ message: "Data not found" })
        }
    }

    static async addCategory(req, res){
        const result = await prisma.category.create({
            data: {
                category: req.body.category,
                description: req.body.description
            }
        })
    
        res.status(201).json({ data: result, message: "Data Input Success" })
    }

    static async deleteCategory(req, res){
        try {
            const result = await prisma.category.findUnique({
                where: {
                    id: Number (req.params.id)
                }
            })
          
            await prisma.category.delete({
                where: {
                    id: Number (req.params.id)
                }
            })

            res.status(200).json({ message: 'Category succesfully deleted.'})
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError && error.code === 'P2025'){
                return res.status(404).json({ error: 'Category ID does not exist' })
            }

            res.status(500).json({ error: 'An error occured while trying to delete a category' })
        }
    }

    static async updateCategory(req, res){
        const update = await prisma.category.update({
            where: {
                id: Number (req.params.id)
            },
            data: {
                category: req.body.genre,
                description: req.body.description
            }
        })

        if(update){
            res.status(201).json({ data: update, message: "Data succesfully updated" })
        } else {
            res.status(404).json({ message: "Data not found" })
        }
    }
}

module.exports = CategoryController