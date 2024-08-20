

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'anusiya@123',
    database: 'ecommerce'
});

db.connect(err => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + db.threadId);
});

app.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


app.get('/cart', (req, res) => {
    db.query('SELECT cart_items.id, cart_items.quantity, products.name, products.price,products.image FROM cart_items JOIN products ON cart_items.product_id = products.id', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/cart', (req, res) => {
    const { product_id, quantity } = req.body;
    console.log("body",req.body)
    db.query('INSERT INTO cart_items (product_id, quantity) VALUES (?, ?)', [product_id, quantity], (err, results) => {
        if (err) throw err;
        res.json({ id: results.insertId });
    });
});


app.put('/cart/:id', (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    db.query('UPDATE cart_items SET quantity = ? WHERE id = ?', [quantity, id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


app.delete('/cart/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM cart_items WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
