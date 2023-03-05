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

routes.put('/update/:id',(req, res)=>{//id no existe y campos
    
    if(!(req.params.id && req.body.nombre && req.body.precio && req.body.img)){
        return res.status(401).json({status: 401, mensaje: "Campos obligarorios", data: req.body})
    }

    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    req.body.fechaCreacion = date

    req.getConnection((err, conn)=>{
  
        conn.query("UPDATE FerrProductos set ? WHERE id = ?",[req.body, req.params.id], (err, rows)=>{
            try {
                if(rows.affectedRows == 0){ throw new Error()}

                return res.status(200).json({status: 200, mensaje: "Producto Actualizado", data: req.body, rows: rows})
            } catch (error) {
                return res.status(401).json({status: 401, mensaje: "la id no existe", data: req.params.id, err: error})
            }
        })
    }) 
    
})


routes.delete('/delete/:id',(req, res)=>{//id no existe y campos
    
    if(!(req.params.id)){
        return res.status(401).json({status: 401, mensaje: "Campos obligarorios", data: req.body})
    }

    req.getConnection((err, conn)=>{        
        conn.query("DELETE FROM FerrProductos WHERE id = ?",[req.params.id ], (err, rows)=>{

            try {
                if(rows.affectedRows == 0){ throw new Error()}

                return res.status(200).json({status: 200, mensaje: "Producto Eliminado", data: req.params.id, rows: rows})
            } catch (error) {
                return res.status(401).json({status: 401, mensaje: "la id no existe", data: req.params.id, err: error})
            }
        })
    })
})


routes.get('/products/:id',(req, res)=>{// id y dampos
    
    if(!(req.params.id)){
        return res.status(401).json({status: 401, mensaje: "Campos obligarorios", data: req.body})
    }
    
    req.getConnection((err, conn)=>{
        if(err) { return res.send(err) }
        
        conn.query("SELECT * FROM FerrProductos WHERE id = ?", [req.params.id], (err, rows)=>{
            try {
                if(rows.length == 0){ throw new Error()}
                return res.status(200).json({status: 200, mensaje: "Producto unico", data: req.params.id, rows: rows})
         
            } catch (error) {
                return res.status(401).json({status: 401, mensaje: "la id no existe", data: req.params.id, err: error})
            }
        })    
    })
})

routes.get('/consulta',(req, res)=>{// el valor no existe
    const query = req.query

    if(!(query.campo && query.valor)){
        return res.status(401).json({status: 401, mensaje: "Campos obligarorios", data: req.body})
    }

    req.getConnection((err, conn)=>{

        conn.query(`SELECT * FROM FerrProductos WHERE ${query.campo} = ?`, [query.valor], (err, rows)=>{
            try {
                if(rows.length == 0){ throw new Error()}

                return res.status(200).json({status: 200, mensaje: "Existente", data: query, rows: rows})
            } catch (error) {
                return res.status(401).json({status: 401, mensaje: `El valor ${query.valor} no existe`, data: query, err: error})
            }
        })    
    })
})












module.exports = routes