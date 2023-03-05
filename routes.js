const { json, application } = require("express");
const express = require("express")
const routes = express.Router()



routes.get('/products',(req, res)=>{
    
    req.getConnection((err, conn)=>{
        if(err) { return res.status(401).json({status: 401, mensaje: "Algo salio mal", data: req.body, err: err}) }
        conn.query("SELECT * FROM FerrProductos", (err, rows)=>{
            if(err) { return res.status(401).json({status: 401, mensaje: "Algo salio mal", data: req.body, err: err})}

            return res.status(200).json({status: 200, mensaje: "Todos los productos", rows: rows})
        })   
    })
})








module.exports = routes