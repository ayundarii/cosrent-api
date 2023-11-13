const { PrismaClient, PrismaClientKnownRequestError } = require("@prisma/client")
const prisma = new PrismaClient()

class CategoryController {
    static async getCategory(req, res){
        const result = prisma.category.findMany()
        res.json({ data: result })
    }
}

module.exports = CategoryController