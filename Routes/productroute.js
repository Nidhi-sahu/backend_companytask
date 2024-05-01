const express = require('express');
const routeproducts = express.Router();
const multer = require('multer');
const path = require('path');
const {
    getProducts,
    filterProductsByCategory, 
    searchProductsByName,
    postproduct
   
} = require("../Controller/productcontroller");

const storage = multer.diskStorage({
    destination:'./image',
    filename:(req,file,cb) =>{
        return cb(null, `${file.originalname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage
})

routeproducts.get('/getproduct', getProducts); 
routeproducts.get('/filterproduct/:category', filterProductsByCategory); 
routeproducts.get('/getsearchproduct/:name', searchProductsByName);
 routeproducts.post('/addproduct', upload.single('image'), postproduct);


module.exports = routeproducts;
