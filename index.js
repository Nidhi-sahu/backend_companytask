
const express = require('express');
const bodyParser = require('body-parser');
const routeuser = require('./Routes/userroute');
const routeproducts   = require('./Routes/productroute');
const routetesti = require('./Routes/testiroute')
const app = express();
app.use(bodyParser.json());
var cors = require("cors");
 app.use(cors(        //
    {
        origin: ["http://localhost:3000"],
        methods: ["POST,GET"],
        credentials: true
    }
 ));  
 app.use( express.static('image'));

app.use('/', routeuser);
app.use('/',routeproducts )
app.use('/' ,routetesti)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
