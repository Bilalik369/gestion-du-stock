const express = require("express");
const multer = require("multer");
const Product = require("../models/Product");

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});


const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Seuls les fichiers JPEG, PNG et JPG sont autorisés"), false);
    }
    cb(null, true);
  },
});


router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des produits" });
  }
});


router.post("/", upload.single("image"), async (req, res) => {
  const { title, description, price, stock } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!title || !description || !price || !stock || !image) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires" });
  }

  try {
    const newProduct = new Product({ title, description, price, stock, image });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'ajout du produit" });
  }
});


router.put("/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { title, description, price, stock } = req.body;
  const image = req.file ? req.file.filename : req.body.image;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { title, description, price, stock, image },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: "Produit non trouvé" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Erreur de mise à jour du produit" });
  }
});


router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Produit non trouvé" });
    }
    res.json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression du produit" });
  }
});

module.exports = router;
