const connection = require('../Model/model');

// Endpoint to retrieve all products
const testgetProducts = async (req, res) => {
    let sqlquery = 'SELECT * FROM testimonials';
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


   module.exports = { testgetProducts}