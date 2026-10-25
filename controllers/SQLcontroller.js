const db = require("../config/mysql");

// POST /products
exports.createProduct = async (req, res) => {
  try {
    const { name, price, category = null, inStock = true } = req.body;
    if (!name || price === undefined) {
      return res.status(400).json({ message: "name and price are required" });
    }
    const [result] = await db.query(
      "INSERT INTO products (name, price, category, inStock) VALUES (?, ?, ?, ?)",
      [name, price, category, inStock]
    );
    res.status(201).json({ id: result.insertId, name, price, category, inStock });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /products
exports.getProducts = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /products/:id
exports.getProduct = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "Product not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /products/:id
exports.updateProduct = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "Product not found" });

    // Keep old values for any field not sent in the body
    const { name, price, category, inStock } = { ...rows[0], ...req.body };
    await db.query(
      "UPDATE products SET name = ?, price = ?, category = ?, inStock = ? WHERE id = ?",
      [name, price, category, inStock, req.params.id]
    );
    res.json({ id: rows[0].id, name, price, category, inStock });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM products WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
