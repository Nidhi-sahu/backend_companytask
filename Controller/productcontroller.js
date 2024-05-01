const connection = require('../Model/model');
const multer = require('multer');
const path = require('path');


// Endpoint to retrieve all products
const getProducts = async (req, res) => {
 let sqlquery = 'SELECT * FROM products';
let data = req.body;
await connection.query(sqlquery,data, function(error,result)
{
      if(error){
        console.log(error)
       }
      else{
        res.send(result)
      }
})
}

const postproduct = async (req, res) => {
    var fullUrl = req.protocol +'://'+ req.get("host")+'/image/';
    try{
        let data =  [
            req.body.id,
            req.body.name,
            req.body.price,
            req.body.category,
            req.body.description,
            // req.file.originalname 
            fullUrl+req.file.filename
        ];
        let sqlQuery = "INSERT INTO products(id,name,price,category,description,image) values(?,?,?,?,?,?)";
        await connection.query(sqlQuery,data,function(error,result)
    {
            if (error){
                console.log("error",error.sqlMessage)
            }
            else{
                res.json(result);
            }
        })
    }
        catch(error){
            console.log(error.message);
        }
    };

// Endpoint to filter products by category
const filterProductsByCategory = async (req, res) => {
    const category = req.params.category; 
    let sqlQuery = 'SELECT * FROM products WHERE category= ?'; 
    await connection.query(sqlQuery, [category], function(error, result) {
        if (error) {
            console.error('Error filtering products by category:', error);
            res.status(500).json({ error: 'Failed to filter products' });
        } else {
            res.json(result);
        }
    });
};

// Endpoint to search products by name
const searchProductsByName = async (req, res) => {
    const name = req.params.name;
    const sqlQuery = 'SELECT * FROM products WHERE name LIKE ?'
    const searchValue = `%${name}%`;
        await connection.query(sqlQuery, [searchValue], function(error, result){
        
            if (error) {
                console.error('Error', error);
                res.status(500).json({ error: 'Failed to search' });
            } else {
                res.json(result);
                
            }
        });
    };

   
module.exports = { getProducts, filterProductsByCategory, searchProductsByName ,postproduct };

