const fs = require('fs');

const orders = JSON.parse(fs.readFileSync('data/orders.json'));
const products = JSON.parse(fs.readFileSync('data/products.json'));
const items = JSON.parse(fs.readFileSync('data/items.json'));

const getPickingList = (req, res) => {
    const today = new Date();
    today.setHours(-4, 0, 0);

    let pickingItemList = {};
    orders.orders.forEach(order => {
        const orderDate = new Date(order.order_date);
        if (Math.floor(today.getTime() / 1000) - Math.floor(orderDate.getTime() / 1000) === 86400) {
            order.line_items.forEach(line_item => {
                products[line_item["product_id"]].items.forEach(item_id => {
                    pickingItemList[items[item_id]] = (pickingItemList[items[item_id]] || 0) + 1;
                })
            })
        }
    });
    res.send(pickingItemList);
};

const getPackingList = (req, res) => {

    const today = new Date();
    today.setHours(-4, 0, 0);

    let data = [];
    orders.orders.forEach(order => {
        const orderDate = new Date(order.order_date);
        if (Math.floor(today.getTime() / 1000) - Math.floor(orderDate.getTime() / 1000) === 86400) {
            const packOrder = {};
            packOrder["ships_to"] = [];
            packOrder["ships_to"].push(order["customer_name"]);
            packOrder["ships_to"].push(order["shipping_address"]);
            packOrder["order_date"] = orderDate.toDateString();
            packOrder["line_items"] = [];
            order.line_items.forEach(line_item => {
                const packLineItem = {};
                packLineItem[line_item["product_name"]] = [];
                products[line_item["product_id"]].items.forEach(item_id => {
                    packLineItem[line_item["product_name"]].push(items[item_id]);
                });
                packOrder["line_items"].push(packLineItem);
            });
            data.push(packOrder);
        }

    });

    res.send({ orders: data });

};

// const setPickingList = (req, res) => {};

module.exports = { getPickingList, getPackingList };