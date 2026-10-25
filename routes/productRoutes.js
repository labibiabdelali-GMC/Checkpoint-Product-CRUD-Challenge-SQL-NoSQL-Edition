const express = require("express");

// Builds the same /products routes for either controller (NoSQL or SQL)
const productRoutes = (controller) => {
  const router = express.Router();

  router.post("/products", controller.createProduct);
  router.get("/products", controller.getProducts);
  router.get("/products/:id", controller.getProduct);
  router.put("/products/:id", controller.updateProduct);
  router.delete("/products/:id", controller.deleteProduct);

  return router;
};

module.exports = productRoutes;
