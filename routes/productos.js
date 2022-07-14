const express = require("express");
const routes_controller = require('./controllers/productos.controller');
const generador = require('../generador/productos');

const { Router } = express;

let router = new Router();

router.get("/", (req, res) => {
  res.sendFile("/public/index.html")
});

router.get('/productos', async function (req, res) {
  const productos = await routes_controller.getProductos()
  res.send(productos)
});

router.get("/productos/:id", async (req, res) => {
  const producto = await routes_controller.getProducto(req, res)
  if (!producto){
    res.send("No existe el producto.");
  }else{
    res.send(producto);
  }
});

router.post("/productos", function (req, res) {
  routes_controller.nuevoProducto(req);
  res.redirect("../../../");
});

router.put("/productos/:id", async (req, res) => {
  const update = await routes_controller.actualizarProducto(req);
  if (update)
    res.send("Producto actualizado");
  else
    res.send("No existe el producto.");
});

router.delete("/productos/:id", async (req, res) => {
  const deleted = await routes_controller.borrarProducto(req);
  if (deleted)
    res.send("Producto Borrado");
  else
    res.send("No existe el producto.");
});

//FAKER
router.get('/productos-test', (req,res)=>{
  let productos = [];
  let cant = req.query.cant || 5;
  if (cant == 0) {
    return res.status(404).json({ error: "no hay productos cargados" });
  }
  for (let i=0; i<cant; i++) {
      let producto = generador.get();
      producto.id = i + 1;
      productos.push(producto);
  }
 
  res.send(productos);
});

module.exports = router;

//LOGIN (COOKIE)
router.get('/logout', (req,res)=>{
  const username = req.cookies.username
  res.clearCookie('username');
  res.render('logout', { username: username });
  req.session.destroy(err=>{
    if (err){
        res.json({status: 'Logout error', body: err});
    } else {
        res.send('Logout ok!');
    }
  });
});

router.get('/login', (req,res)=>{
  res.render('login');
});

router.post('/doLogin', (req,res)=>{
  const username = req.body.usuario
  console.log(req.body);
  console.log(req.params);
  console.log(req.query);
  res.cookie('username', username,  { signed: false, maxAge: 5000 } );
  res.redirect('/');
});

