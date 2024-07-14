const {describe, it} = require('@jest/globals');
const { getPickingList, getPackingList } = require('../controllers/ordersController');
const express = require('express');
const request = require('supertest');
const orderRoutes = require('../routes/orderRoutes');
const fs = require('fs');


const app = express();
app.use('/warehouse',orderRoutes);


const orders = JSON.parse(fs.readFileSync('data/orders.json'));
const products = JSON.parse(fs.readFileSync('data/products.json'));
const items = JSON.parse(fs.readFileSync('data/items.json'));

describe('getPickingList', () => {
    it('should return a list of items to pick', () => {
        const req = {};
        const res = {
            send: jest.fn()
        };

        getPickingList(req, res);

        expect(res.send).toHaveBeenCalled();
    });
    it("should return only yesterday's order items", () => {
        return request(app).get("/warehouse/orders/picking-list")
        .expect(200)
        .then((res)=> {
            expect(res.status).toBe(200);
            expect(res.body).toEqual(
                {
                    "Red Roses Bouquet": 1,
                    "Box of chocolates": 2,
                    "Love card": 2,
                    "Women’s perfume": 1,
                    "Client Gift Box": 1,
                    "Bottle of wine": 2,
                    "Fruit basket": 2,
                    "Pen": 1,
                    "Birthday Box": 1,
                    "Birthday cupcake": 1,
                    "$100 Visa Gift Card": 1,
                    "Birthday card": 1
                }
            );
        })
    });
});
