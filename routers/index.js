const express = require('express');
const authRoutes = require('./auth');
const productRoutes = require('./product_controller');
const orderRoutes = require('./order_controller');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Web API' });
});

router.use('/auth', authRoutes);
router.use('/product', productRoutes);
router.use('/order', orderRoutes);

module.exports = router;
