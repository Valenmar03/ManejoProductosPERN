import { Request, Response} from 'express'
import { check, validationResult} from 'express-validator'
import Product from '../models/Product.model'

export const createProduct = async (req : Request, res : Response) =>{

    await check('name').notEmpty().withMessage('Product cant be empty').run(req)
    await check('price')
        .isNumeric()
        .notEmpty()
        .custom(value => value > 0)
        .withMessage('Price not valid')
        .run(req)

    let errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }

    const product = await Product.create(req.body)
    res.json({data: product}) 
}