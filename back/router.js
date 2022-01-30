const express = require('express');
const router = express.Router();
const db = require("./database");

/* GET home page. */
router.get('/category', function (req, res, next) {
  db.getCategories().then(r => res.json(r), e => res.json(e));
});
router.get('/category/:id', function (req, res, next) {
  db.getItemsFromCategory(req.params.id).then(r => res.json(r));
});
router.get('/item', function (req, res, next) {
  db.getItems().then(r => res.json(r));
});

router.get('/item/:id', function (req, res, next) {
  db.getItem(req.params.id).then(r => res.json(r));
});
router.post('/order', function (req, res, next) {
  console.log(req.body)
  db.addOrder(req.body.email, req.body.items);
});

module.exports = router;
