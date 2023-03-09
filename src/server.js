import express from 'express'
import { ManagerProduct, Product } from '../logica/managerProduct.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const admProduct = new ManagerProduct('./dataBase/ProductFile.json')

app.get('/products', async(req, res)=>{
    const products = await admProduct.getProduct()
    res.json(products)
})

app.get('/products/:id', async(req, res)=>{
    try{
        const products = await admProduct.getProductById(req.params.id)
        res.json(products)
    }catch (error){
        res.status(400).json({message: error.message})
    }
})

app.post('/products', async (req, res)=>{//La información para agregar un nuevo producto se envia por formulario, esto se hace por una consulta ajax, es un metodo post
    const newProducts = await new Product(req.body)
    const addProducts = await admProduct.addProduct(newProducts)
    res.json(addProducts)
})
    

app.put('/products/:id', async (req, res)=>{
    try {
        const update = await admProduct.updateProduct(req.params.id,req.body)
        res.json(update)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
    
})

app.delete('/products/:id', async (req, res)=>{
    const pid = parseInt(req.params.id)
    const deleteProduct = await admProduct.deleteProduct(pid)
    res.json(deleteProduct)
})

app.listen(8080,()=>console.log("MarnagerProduct funcionando en el puerto 8080"))
