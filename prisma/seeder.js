const { PrismaClient } = require("@prisma/client");
const { generateHash } = require("../utils/bcrypt");
const prisma = new PrismaClient();

const Users = [
    {
        username: 'admin',
        password: generateHash('admin123'),
        role: 1
    },
    {
        username: 'ayundari',
        password: generateHash('ayupradnyandarii'),
        role: 2
    },
]
const Categories = [
    {
        category: 'Genshin Impact',
        description: 'Various catalogs from the famous game Genshin Impact',
    },
    {
        category: 'Honkai Star Rails',
        description: 'Various catalogs from the game Honkai Star Rails',
    },
    {
        category: 'Violet Evergarden',
        description: 'Various catalogs inspired by the anime Violet Evergarden',
    }
];

const Items = [
    {
        name: 'Wig March 7th',
        description: 'Wig for the March 7th Cosplay',
        catalogId: 1
    },
    {
        name: 'Dress March 7th',
        description: 'Dress for the March 7th Cosplay',
        catalogId: 1
    },
    {
        name: 'Wig Kokomi',
        description: 'Wig for the Kokomi Cosplay',
        catalogId: 2
    },
    {
        name: 'Dress Kokomi',
        description: 'Dress for the Kokomi Cosplay',
        catalogId: 2
    },
    {
        name: 'Wig Violet',
        description: 'Wig for the Violet Cosplay',
        catalogId: 3
    },
    {
        name: 'Dress Violet',
        description: 'Dress for the Violet Cosplay',
        catalogId: 3
    },
  ];

const CosplayCatalogs = [
    {
        name: 'March 7th',
        description: 'Catalog inspired by the character March 7th from Honkai Star Rails',
        size: 'M',
        price: 70000,
        img: 'https://drive.google.com/file/d/1lbxHH9gSD8cKbdfkrIIOiaDcAOlfBRcW/view?usp=sharing',
        availability: true,
        categoryId: 2, 
    },  
    {
        name: 'Kokomi',
        description: 'Catalog inspired by the character Kokomi from Genshin Impact',
        size: 'S',
        price: 80000,
        img: 'https://drive.google.com/file/d/1Jag1e9-0T2q0p26-RDpxcCZ1if4ZApfk/view?usp=sharing', 
        availability: true,
        categoryId: 1, 
      },
      {
        name: 'Violet Evergarden',
        description: 'Catalog inspired by the anime Violet Evergarden',
        size: 'L',
        price: 90000,
        img: 'https://drive.google.com/file/d/1-GOC-c9Z3rCFUtpkTk_MG2g45MJs3CG6/view?usp=sharing', 
        availability: true,
        categoryId: 3, 
      },  
];

async function main() {
    for(const user of Users) {
        await prisma.user.create({
           data: user
        })
    }

    for(const category of Categories) {
        await prisma.category.create({
           data: category
        })
    }

    for (const catalog of CosplayCatalogs) {
        await prisma.cosplayCatalog.create({
            data: catalog
        })
    }

    for (const item of Items) {
        await prisma.item.create({
            data: item
        })
    }

    console.log("🌱 Seeder run succesfully")
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })