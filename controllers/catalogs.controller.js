const { PrismaClient, PrismaClientKnownRequestError } = require("@prisma/client")
const prisma = new PrismaClient()

class CatalogControllers {
    static async getCatalogs(req, res) {
        try {
            const result = await prisma.cosplayCatalog.findMany();
            res.json({ data: result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

module.exports = CatalogControllers