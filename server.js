const express = require("express");
const connectMongo = require("./config/mongo");
const productRoutes = require("./routes/productRoutes");
const NoSQLcontroller = require("./controllers/NoSQLcontroller");
const SQLcontroller = require("./controllers/SQLcontroller");

const app = express();
app.use(express.json());

connectMongo();

app.use("/nosql", productRoutes(NoSQLcontroller)); // MongoDB
app.use("/sql", productRoutes(SQLcontroller)); // MySQL

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
