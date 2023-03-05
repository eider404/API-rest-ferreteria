const express = require("express");
const cors = require('cors');
const app = express();
//port listening
const PORT = process.env.PORT || 3000
//impotar rutas
const routes = require("./routes")

const bodyParcer = require('body-parser');

//Database
const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_USER = process.env.DB_USER || 'root'
const DB_PASSWORD = process.env.DB_PASSWORD || ''
const DB_NAME = process.env.DB_NAME || 'Tlapaleria'

const mysql = require('mysql');
const myconnection = require("express-myconnection");
const dbOptions = {
    database: DB_NAME,
    user: DB_USER,
    host: DB_HOST,
    port: 3306,
    password: DB_PASSWORD,
    //ssl: {}
    
}
try {
    app.use(myconnection(mysql, dbOptions,'single'))
    console.log(`Coneccion a ${dbOptions.database} exitosa `)
} catch (error) {
    console.log(error)
}


//accesos a las origenes
app.use(cors())

//analiza las solicitudes JSON 
app.use(bodyParcer.json());
app.use(bodyParcer.urlencoded({extended:false}));

//static
app.use('/',express.static('public'));

//direcciones
app.use("/",routes) 

app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`)
})