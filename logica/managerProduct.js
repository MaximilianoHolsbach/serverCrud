import fs from 'fs/promises'
import {randomUUID}  from 'crypto'

export class ManagerProduct{
    constructor(path){// paso la ruta como parametro
        this.path=path
        this.file = []
    }

    async readFile(){
        this.file = JSON.parse(await fs.readFile(this.path, 'utf-8'))// Cargo el archivo en una función para llamarla más adelante
        return this.file
    }

    async saveFile(){// Genero la funcion Save para llamarla en addProduct
        const json = JSON.stringify(this.file,null,2)
        await fs.writeFile(this.path,json)//Guardo los cambios
    }

    async getProduct(){
        await this.readFile()
        console.log(this.file)
        return this.file
    }

    async getLimitProduct(limit){
        if (!limit){
            await this.getProduct()
            return this.file
        }else{
            await this.getProduct()
            const list = this.file.slice(0, limit)
            return list
        }
    }

    async addProduct(product){
        await this.readFile()
       if(this.file.length == 0){
            product.id=1
            this.file.push(product)
            await this.saveFile()
        }else {
            product.id = this.file[this.file.length - 1].id + 1
            this.file.push(product)
            await this.saveFile()
        }
    }

    async getProductById(id){
        await this.readFile()
        this.shared = this.file.find((product) => {if(product.id == id){return product}})
        if(this.shared == undefined){
            console.log(`El ID ${id} no es valido`)
            throw new Error(`El ID ${id} no es valido`)
        }else{
            return this.shared
        }
    }

    async updateProduct(id,res){
        try{
            await this.getProductById(id)
            if(!this.shared){
                throw new Error(`El producto cpn id ${id} no se encuentra`)
            }
            await this.readFile()
            this.file = this.file.map((product) =>{if(product.id == id){return{...product,...res}}return{...product}})
            await this.saveFile()
        }catch(error){
            console.log('Error al actualizar el producto')
            throw new Error(`Error al actualizar el producto`)
        }
    }

    async deleteProduct(id){
        /*this.readFile()
        const indice = this.file.findIndex(product => product.id == id)
        return indice*/
        try{
            await this.getProductById(id)
            if(!this.shared){
                throw new Error(`El producto cpn id ${id} no se encuentra`)
            }
            this.readFile()
            this.file = this.file.filter((product) => product.id !== id)
            await this.saveFile()
            return this.file
        }catch(error){
            console.log('Error al eliminar archivo')
        }
    }
}

export class Product{
    constructor({title,description,price,thumbnail,stock}){
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = randomUUID()
        this.stock = stock
    }
}

//const admin = new ManagerProduct('./dataBase/ProductFile.json')

//await admin.addProduct(new Product('Test','Insumo para impresoras Ricoh',10,'https://c8.alamy.com/compes/2gxf6rm/icono-de-impresora-laser-moderna-en-estilo-de-contorno-aislado-sobre-fondo-blanco-2gxf6rm.jpg',50))
//await admin.addProduct(new Product('Toner Ricoh 1170D','Insumo para modelos 1515,161,171,201',8,'https://c8.alamy.com/compes/2gxf6rm/icono-de-impresora-laser-moderna-en-estilo-de-contorno-aislado-sobre-fondo-blanco-2gxf6rm.jpg',50))
//await admin.addProduct(new Product('Toner Brother 2370','Toner Brother generico',51,'https://c8.alamy.com/compes/2gxf6rm/icono-de-impresora-laser-moderna-en-estilo-de-contorno-aislado-sobre-fondo-blanco-2gxf6rm.jpg',50))
//await admin.addProduct(new Product('Cilindro Ricoh 1515','Unidad de imagen',150,'https://c8.alamy.com/compes/2gxf6rm/icono-de-impresora-laser-moderna-en-estilo-de-contorno-aislado-sobre-fondo-blanco-2gxf6rm.jpg',50))
//await admin.addProduct(new Product('Toner Ricoh SP5200','Toner cartridge',100,'https://c8.alamy.com/compes/2gxf6rm/icono-de-impresora-laser-moderna-en-estilo-de-contorno-aislado-sobre-fondo-blanco-2gxf6rm.jpg',50))
//await admin.addProduct(new Product('Toner Ricoh 1130D','Toner para equipo 1500,1900,2500',10,'https://c8.alamy.com/compes/2gxf6rm/icono-de-impresora-laser-moderna-en-estilo-de-contorno-aislado-sobre-fondo-blanco-2gxf6rm.jpg',50))
//await admin.getProduct()
//console.log(await admin.getProductById(3)) 
//await admin.updateProduct(2,{'title':'prueba','price':'11'})
//await admin.deleteProduct(2)


