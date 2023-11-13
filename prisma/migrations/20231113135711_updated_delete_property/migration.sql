-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "catalogId" INTEGER NOT NULL,
    CONSTRAINT "Item_catalogId_fkey" FOREIGN KEY ("catalogId") REFERENCES "CosplayCatalog" ("id") ON DELETE NO ACTION ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("catalogId", "description", "id", "name") SELECT "catalogId", "description", "id", "name" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE TABLE "new_CosplayCatalog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "size" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "img" TEXT NOT NULL,
    "availability" BOOLEAN NOT NULL,
    "categoryId" INTEGER NOT NULL,
    CONSTRAINT "CosplayCatalog_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE NO ACTION ON UPDATE CASCADE
);
INSERT INTO "new_CosplayCatalog" ("availability", "categoryId", "createdAt", "description", "id", "img", "name", "price", "size", "updatedAt") SELECT "availability", "categoryId", "createdAt", "description", "id", "img", "name", "price", "size", "updatedAt" FROM "CosplayCatalog";
DROP TABLE "CosplayCatalog";
ALTER TABLE "new_CosplayCatalog" RENAME TO "CosplayCatalog";
CREATE TABLE "new_Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "rentalStartDate" DATETIME NOT NULL,
    "rentalEndDate" DATETIME NOT NULL,
    "description" TEXT,
    "totalCost" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "catalogId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Transaction_catalogId_fkey" FOREIGN KEY ("catalogId") REFERENCES "CosplayCatalog" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE NO ACTION ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("catalogId", "createdAt", "description", "id", "rentalEndDate", "rentalStartDate", "status", "totalCost", "updatedAt", "userId") SELECT "catalogId", "createdAt", "description", "id", "rentalEndDate", "rentalStartDate", "status", "totalCost", "updatedAt", "userId" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
