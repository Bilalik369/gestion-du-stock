const express = require('express');
const multer = require('multer');
const Product = require('../models/Product');



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
