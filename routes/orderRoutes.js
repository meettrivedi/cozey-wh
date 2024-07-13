const express = require('express');
const { getPickingList, getPackingList } = require('../controllers/ordersController');

const orderRouter = express.Router();

orderRouter.get('/orders/picking-list', getPickingList);
orderRouter.get('/orders/packing-list', getPackingList);

module.exports = orderRouter;