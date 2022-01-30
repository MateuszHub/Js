const mysql = require('mysql');

const host = "mysql";
const user = "root";
const password = "root";
const database = "shop";

const con = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
});

async function getCategories() {
    return new Promise((acc, rej) => {
        con.query('SELECT * FROM categories', (err, rows) => {
            if (err) return rej(err);
            acc(rows);
        });
    });
}

async function getItems() {
    return new Promise((acc, rej) => {
        con.query('SELECT * FROM items', (err, rows) => {
            if (err) return rej(err);
            acc(rows);
        });
    });
}

async function getItem(id) {
    return new Promise((acc, rej) => {
        con.query('SELECT * FROM items WHERE id=?', [id], (err, rows) => {
            if (err) return rej(err);
            acc(rows);
        });
    });
}

async function getItemsFromCategory(category_id) {
    return new Promise((acc, rej) => {
        con.query('SELECT * FROM items WHERE category_id=?', [category_id], (err, rows) => {
            if (err) return rej(err);
            acc(rows);
        });
    });
}

async function addOrder(email, items) {
    return new Promise((acc, rej) => {
        con.query('SELECT IFNULL(max(order_id), 0) as max FROM orders', (err, rows) => {
            let orderId = parseInt(rows[0].max) + 1;
            console.log(orderId)
            items.forEach(item => {
                con.query('Insert into orders(order_id, email, item_id) VALUES(?,?,?)', [orderId, email, item], (err, rows) => {
                    if (err) return rej(err);
                });
            });
        });
        acc();
    });
}



module.exports = {
    getItems,
    getItem,
    getItemsFromCategory,
    getCategories,
    addOrder
};
