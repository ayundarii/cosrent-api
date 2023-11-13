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
        try {
            // Check if the catalog exists and is available
            const catalog = await prisma.cosplayCatalog.findUnique({
                where: {
                    id: req.body.catalogId,
                    availability: true,
                },
            });

            if (!catalog) {
                return res.status(404).json({ error: 'Catalog not found or not available' });
            }

            // Check if rental dates are valid
            const rentalStartDate = new Date(req.body.rentalStartDate);
            const rentalEndDate = new Date(req.body.rentalEndDate);

            if (isNaN(rentalStartDate) || isNaN(rentalEndDate) || rentalStartDate >= rentalEndDate) {
                return res.status(400).json({ error: 'Invalid rental dates' });
            }

            // Check any other conditions before creating the transaction

            // If all checks pass, create the transaction
            const result = await prisma.transaction.create({
                data: {
                    rentalStartDate: rentalStartDate.toISOString(),
                    rentalEndDate: rentalEndDate.toISOString(),
                    description: req.body.description,
                    totalCost: req.body.totalCost,
                    status: req.body.status,
                    catalogId: req.body.catalogId,
                    userId: req.body.userId,
                },
            });

            res.status(201).json({ data: result, message: 'Data Input Success' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while processing the request' });
        }
    }

    static async deleteTransaction(req, res){
        try {
            const transactionId = Number(req.params.id);

            // Check if the transaction exists
            const existingTransaction = await prisma.transaction.findUnique({
                where: {
                    id: transactionId,
                },
            });

            if (!existingTransaction) {
                return res.status(404).json({ error: 'Transaction ID does not exist' });
            }

            // Check if the status is 'pending' or 'done'
            if (existingTransaction.status === 'pending' || existingTransaction.status === 'done') {
                await prisma.transaction.delete({
                    where: {
                        id: transactionId,
                    },
                });

                res.status(200).json({ message: 'Transaction successfully deleted.' });
            } else {
                res.status(403).json({ error: 'Cannot delete a transaction with status other than pending or done.' });
            }
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                return res.status(404).json({ error: 'Transaction ID does not exist' });
            }

            console.error(error);
            res.status(500).json({ error: 'An error occurred while trying to delete a transaction' });
        }
    }

    static async updateTransaction(req, res){
        try {
            const transactionId = Number(req.params.id);
            const updateData = {
                rentalStartDate: req.body.rentalStartDate,
                rentalEndDate: req.body.rentalEndDate,
                description: req.body.description,
                totalCost: req.body.totalCost,
                status: req.body.status,
                catalogId: req.body.catalogId,
                userId: req.body.userId
            };

            // Check if the transaction exists
            const existingTransaction = await prisma.transaction.findUnique({
                where: {
                    id: transactionId,
                },
                include: {
                    cosplayCatalog: true,
                },
            });

            console.log(existingTransaction)

            if (!existingTransaction) {
                return res.status(404).json({ error: 'Transaction ID does not exist' });
            }

            console.log(updateData)
            // Update the transaction
            const updatedTransaction = await prisma.transaction.update({
                where: {
                    id: transactionId,
                },
                data: updateData,
                include: {
                    cosplayCatalog: true
                }
            });

            // If the status is 'accepted', set the catalog's availability to false
            if (updateData.status === 'accepted' && existingTransaction.cosplayCatalog.availability) {
                await prisma.cosplayCatalog.update({
                    where: {
                        id: existingTransaction.catalogId,
                    },
                    data: {
                        availability: false,
                    },
                });
            }

            // If the status is 'done', set the catalog's availability to true
            if (updateData.status === 'done' && !existingTransaction.cosplayCatalog.availability) {
                await prisma.cosplayCatalog.update({
                    where: {
                        id: existingTransaction.catalogId,
                    },
                    data: {
                        availability: true,
                    },
                });
            }

            res.status(201).json({ data: updatedTransaction, message: 'Data successfully updated' });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                return res.status(404).json({ error: 'Transaction ID does not exist' });
            }

            console.error(error);
            res.status(500).json({ error: 'An error occurred while updating the transaction' });
        }
    }
}

module.exports = TransactionController