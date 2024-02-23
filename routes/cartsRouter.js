import { Router } from "express";
import fs from "fs"

const cartsRouter = Router()
const pathCart = "./data/carrito.json"

// (POST) CREA UN NUEVO CARRITO //
cartsRouter.post("/", (req,res) => {

    const cartRead = fs.readFileSync(pathCart, 'utf-8')
    const parsedCart = JSON.parse(cartRead)

    let cartNew = {

        id:parsedCart.length + 1,
        products: []

    }

    parsedCart.push(cartNew)
    let data = JSON.stringify(parsedCart)
    fs.writeFileSync(pathCart, data, null)

    res.send("carrito creado")

})

// (GET) MUESTRA LOS PRODUCTOS DEL CARRITO SEGUN SU ID //
cartsRouter.get("/:cid", (req,res) => {

    const cid = parseInt(req.params.cid)
    const cartRead = fs.readFileSync(pathCart, 'utf-8')
    const parsedCart = JSON.parse(cartRead)

    const cartView = parsedCart.find((cart) => cart.id === cid)
    const data = JSON.stringify(cartView)

    res.send(data)

})

// (POST) AGREGA PRODUCTOS NUEVOS AL CARRITO SELECCIONADO //
cartsRouter.post("/:cid/product/:pid", (req,res) => {

    const cid = req.params.cid
    const pid = req.params.pid

    const cartRead = fs.readFileSync(pathCart, "utf-8")
    const parsedCart = JSON.parse(cartRead)
    const { quantity } = req.body
  

    const foundCart = parsedCart.findIndex((item) => (item.id) === cid)
    
    const foundProduct = parsedCart[foundCart].products.findIndex((produ) => produ.product === pid)
    
    const getProduct = {

        product: pid,
        quantity: parseInt(quantity)
    }


    if (foundProduct !== -1) {

        parsedCart[foundCart].products[foundProduct].quantity += parseInt(quantity)

    } else {
       
        parsedCart[foundCart].products.push(getProduct)

    }

    let data = JSON.stringify(parsedCart)
    fs.writeFileSync(pathCart, data, null)

    res.send('Producto agregado al carrito')
    
})


export default cartsRouter