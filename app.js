import express from "express";
import productsRouter from "./routes/productsRouter.js";
import cartsRouter from "./routes/cartsRouter.js";

const app = express()
const port = 8080

//Middlewares
app.use(express.json());

//Rutas
app.use("/api/products",productsRouter)
app.use("/api/carts",cartsRouter )


app.listen(port,console.log("Servidor corriendo en el puerto " + port))