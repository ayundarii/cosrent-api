const { PrismaClient, PrismaClientKnownRequestError } = require("@prisma/client")
const prisma = new PrismaClient()

class TransactionController {
    static async getTransactions(req, res){
        const result = await prisma.transaction.findMany()
        
        res.json({ data: result })
    }

    static async getTransactionById(req, res){
        const result = await prisma.transaction.findUnique({
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

    static async addTransaction(req, res){
        const result = await prisma.transaction.create({
            data: {
                rentalStartDate: req.body.rentalStartDate,
                rentalEndDate: req.body.rentalEndDate,
                description: req.body.description,
                totalCost: req.body.totalCost,
                status: req.body.status,
                catalogId: req.body.catalogId,
                userId: req.body.userId
            }
        })
    
        res.status(201).json({ data: result, message: "Data Input Success" })
    }

    static async deleteTransaction(req, res){
        try {
            const result = await prisma.transaction.findUnique({
                where: {
                    id: Number (req.params.id)
                }
            })
          
            await prisma.transaction.delete({
                where: {
                    id: Number (req.params.id)
                }
            })

            res.status(200).json({ message: 'Transaction succesfully deleted.'})
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError && error.code === 'P2025'){
                return res.status(404).json({ error: 'Transaction ID does not exist' })
            }

            res.status(500).json({ error: 'An error occured while trying to delete a transaction' })
        }
    }

    static async updateTransaction(req, res){
        try {
            const update = await prisma.transaction.update({
                where: {
                    id: Number (req.params.id)
                },
                data: {
                    rentalStartDate: req.body.rentalStartDate,
                    rentalEndDate: req.body.rentalEndDate,
                    description: req.body.description,
                    totalCost: req.body.totalCost,
                    status: req.body.status,
                    catalogId: req.body.catalogId,
                    userId: req.body.userId
                }
            })

            
            res.status(201).json({ data: update, message: "Data succesfully updated" })
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError && error.code === 'P2025'){
                return res.status(404).json({ error: 'Transaction ID does not exist' })
            }

            res.status(500).json({ error: 'An error occured while trying to delete a transaction' })
        }
    }
}

module.exports = TransactionController