import { Request, Response} from 'express'
import Product from '../models/Product.model'

export const createProduct = async (req : Request, res : Response) => {
    const product = await Product.create(req.body)
    res.status(201).json({data: product}) 
}

export const getProducts = async (req : Request, res : Response) => {
    const products = await Product.findAll()
    if(!products){
        return res.status(404).json({
            error: 'No products found'
        })
    }

    res.json({data: products})
}

export const getProductById = async (req : Request, res : Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)
    if(!product){
        return res.status(404).json({
            error: 'Product not found'
        })
    }

    res.json({data: product})
}

export const updateProduct = async (req : Request, res : Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)
    if(!product){
        return res.status(404).json({
            error: 'Product not found'
        })
    }

    await product.update(req.body)
    await product.save()

    return res.json({data: product})
}

export const updateProductAvailability = async (req : Request, res : Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)
    if(!product){
        return res.status(404).json({
            error: 'Product not found'
        })
    }

    product.availability = !product.dataValues.availability
    await product.update(product)
    await product.save()
    return res.json({data: product})
}

export const deleteProduct = async (req : Request, res : Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)
    if(!product){
        return res.status(404).json({
            error: 'Product not found'
        })
    }

    await product.destroy()
    return res.json({message: 'Product successfully deleted'})
}