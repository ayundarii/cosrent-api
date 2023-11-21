# Cosrent API

## Description:

This API is designed for managing cosplay rentals, providing a set of endpoints for operations related to catalogs, items, categories, transactions, and users within the context of a cosplay rental service.

## Key Features:
### Catalog Management:
* Retrieve a list of catalogs 📚.
* Get detailed information about a specific catalog 🧐.
* Add a new catalog ➕.
* Update catalog details 🔄.
* Delete a catalog ❌.

### Item Management:
* Retrieve a list of items 🎭.
* Get detailed information about a specific item 🛍️.
* Add a new item ➕.
* Update item details 🔄.
* Delete an item ❌.

### Category Management:
* Retrieve a list of categories 🗂️.
* Get detailed information about a specific category 📁.
* Add a new category ➕.
* Update category details 🔄.
* Delete a category ❌.

### Transaction Management:
* Retrieve a list of transactions 💼.
* Get detailed information about a specific transaction 📋.
* Add a new transaction ➕.
* Update transaction details 🔄.
* Delete a transaction (conditions apply) ❌.

### User Management:
* Retrieve a list of users 👥.
* Get detailed information about a specific user 👤.
* Add a new user ➕.
* Update user details 🔄.
* Delete a user ❌.

### Authentication:
* User authentication using JSON Web Tokens (JWT) 🔐.
* Secure endpoints requiring authentication for access 🚀.

## Tech Stack:
* Node.js
* Express.js
* Prisma (Database ORM)

## Features:
* Data seeding for initial setup 🌱.
* Robust error handling 🚨.
* JWT-based user authentication 🔒.

## API Documentation
https://documenter.getpostman.com/view/19992119/2s9YXmWfPP

## Installation

1. Install all dependencies:

   ```npm install```

2. Generate Prisma:

   ```npx prisma generate```

3. Run Prisma migrations:

   ```npx prisma migrate dev```

4. Run the seeder:

   ```npm run seed```

5. Run the project:

   ```npm run dev```
