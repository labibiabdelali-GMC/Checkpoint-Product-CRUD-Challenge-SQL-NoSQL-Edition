# Product CRUD – SQL & NoSQL

A simple Node.js + Express API that manages products with **MongoDB (Mongoose)** and **MySQL (mysql2)**.

## Project structure

```
config/        mongo.js, mysql.js   -> database connections
models/        Product.js           -> Mongoose schema
               product.sql          -> MySQL table
controllers/   NoSQLcontroller.js   -> CRUD with Mongoose
               SQLcontroller.js     -> CRUD with mysql2 (parameterized queries)
routes/        productRoutes.js     -> /products routes
server.js      app entry point
```

## Product fields

| Field    | Type    | Rules           |
|----------|---------|-----------------|
| id       | auto    | auto-generated  |
| name     | string  | required        |
| price    | number  | required        |
| category | string  | optional        |
| inStock  | boolean | default: `true` |

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start MongoDB locally (default: `mongodb://127.0.0.1:27017/productsdb`).
3. Create the MySQL database and table:
   ```bash
   mysql -u root -p < models/product.sql
   ```
4. Run the server:
   ```bash
   npm start
   ```

You can change the default connection settings with these environment variables:
`MONGO_URI`, `MYSQL_HOST`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`, `PORT`.

## Endpoints

MongoDB routes start with `/nosql`, MySQL routes start with `/sql`.

| Method | Route           | Action         |
|--------|-----------------|----------------|
| POST   | `/products`     | Create product |
| GET    | `/products`     | Get all        |
| GET    | `/products/:id` | Get one        |
| PUT    | `/products/:id` | Update product |
| DELETE | `/products/:id` | Delete product |

Example: `POST http://localhost:5000/sql/products`

```json
{
  "name": "Laptop",
  "price": 999.99,
  "category": "Electronics"
}
```
