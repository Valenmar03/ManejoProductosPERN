import { Request, Response} from 'express'
import { validationResult } from 'express-validator'
import Product from '../models/Product.model'

export const createProduct = async (req : Request, res : Response) => {
    const product = await Product.create(req.body)
    res.json({data: product}) 
}