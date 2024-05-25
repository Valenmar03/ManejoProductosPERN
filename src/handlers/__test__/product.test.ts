import request from 'supertest'
import server from '../../server'


describe('POST /api/products', () => {
    test('Should display validation errors', async () => {
        const res = await request(server).post('/api/products').send({})
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(4)
        
        expect(res.status).not.toBe(404)
        expect(res.body.errors).not.toHaveLength(2)
    })
    test('Should validate that the price is higher than 0', async () => {
        const res = await request(server).post('/api/products').send({
            name: 'Monitor Test',
            price: 0,
        })
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(1)
        
        expect(res.status).not.toBe(404)
        expect(res.body.errors).not.toHaveLength(2)
    })
    test('Should create a new product',async  () => {
        const res = await request(server).post('/api/products').send({
            name: 'Mouse Test',
            price: 50,
        })

        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('data')
    })
})