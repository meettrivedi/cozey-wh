const express = require('express');
const fs = require('fs');
const orderRouter = require('../routes/orderRoutes');

const app = express();
app.use('/warehouse', orderRouter);
// app.use('/warehouse', productRouter);

const orders = JSON.parse(fs.readFileSync('data/orders.json'));
const products = JSON.parse(fs.readFileSync('data/products.json'));
const items = JSON.parse(fs.readFileSync('data/items.json'));


app.get('/', (req, res) => {
    console.log('called /');
    res.send({all:{ orders, products, items}});

});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});