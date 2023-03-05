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




routes.post('/new',(req, res)=>{
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    req.body.fechaCreacion = date

    if(!(req.body.nombre && req.body.precio && req.body.img)){
        return res.status(401).json({status: 401, mensaje: "Campos obligarorios", data: req.body})
    }
    
    req.getConnection((err, conn)=>{

        conn.query("INSERT INTO FerrProductos set ?", [req.body], (err, rows)=>{
            if(err) { return res.status(401).json({status: 401, mensaje: "Algo salio mal", data: req.body, err: err}) }
            
            return res.status(200).json({status: 200, mensaje: "Producto Agregado", data: req.body, rows: rows})
        })
    })
})








module.exports = routes