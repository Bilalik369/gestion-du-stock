const express = require('express');
const multer = require('multer');
const Product = require('../models/Product');
const { json } = require('body-parser');



const router = express.Router();


const storage =  multer.diskStorage({
    destination : (req, file, cb ) => (null,'uploads'),
    filename : (req , file, cb) => (null , Date.now() +'-'+file.originalname ),


});
const ulpoad = multer({
    storage, 
    limits :{fileSize : 2 * 1024 * 1024},
    fileFilter:(req, file , cb) => {
        const allowedTypes = ["image/jpeg ", "image.png", "image/jpg"];
        
        if(!allowedTypes.includes(file.mimetype)){
            return cb(new Erorr("Seuls les fiches JPEG , PNG et JPG sont autorise"), false);
        }
        cb(null , true );
    },
    
});


router.get('/', async(req, res) => {
    try{
        const product =  await product.finde();
        res.json(products);

    }catch{
        res.status(500).json({error : 'Erreur lors de la reacuperation des produit '});

    }
});


router.post("/" , ulpoad.single("image"), async(req , res) =>{
    const  {title , description , price , stock} = req.body;
    const image = req.file ? req.file.filename:null;

    if(!title || !description || !price || !stock){
        return res.status(400).json({erorr : 'toute les champ sont obligatoire'});
    }

    try{
       const newProduct = new Product({title, description, price, stock , image});
       await newProduct.save();
       res.status(201).json(newProduct);
       
    }catch(erorr){
        res.status(500).json({erorr : "Erreur lors de l'ajoute du produit"});

    }

} );



router.put('/:id' ,ulpoad.single("image"), async(req , res) =>{

    const{id} = req.params;
    const {title, description, price, stock} = req.body;
    const image = req.file ? req.filename : req.body.image;


    try{
        const updateProduct = await Product.findByIdAndUpdate(id, {title , description, price, stock , image},
            {new : true}

        );

        res.json(updateProduct);
    }catch(erorr){
        res.status(500).json({ erorr :"erreur de la metre a jour de produit"})
    }


});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      await Product.findByIdAndDelete(id);
      res.json({ message: "Produit supprimé avec succès" });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la suppression du produit" });
    }
  });
  
  module.exports = router;