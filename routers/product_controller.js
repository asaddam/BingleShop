// /product

// import library
const express = require('express')
const _ = require('lodash')

// import use case
const product_uc = require("../controllers/product")

// init router
const router = express.Router()

router.get('/', async function (req, res) {
    let category = req.query['category']
    let option = null
    if (typeof category !== "undefined") {
        option = {
            category: category
        }
    }

    let product = await product_uc.getListProduct(option)
    let res_data = {
        "status": "ok",
        "message": "success",
        "data": product
    }
    res.json(res_data)
})

router.get('/detail/:id', async function (req, res) {
    let id = parseInt(req.params.id)
    let res_data = {
        "status": "ok",
        "message": "success",
        "data": null
    }
    let product = await product_uc.getProductByID(id)
    if (product == null) {
        res_data.status = 'failed'
        res_data.message = 'product not found'
        res.status(400)
    }
    res_data.data = product
    res.json(res_data)
})

router.delete('/:id', async function (req, res) {
    let id = parseInt(req.params['id'])
    let res_data = {
        "status": "ok",
        "message": "success",
        "data": null
    }

    let product = await product_uc.getProductByID(id);
    let idProductDeleted = null;
    if (product === null) {
        res_data.status = 'failed'
        res_data.message = 'product not found'
        res.status(400)
    } else {
        idProductDeleted = await product_uc.deleteProductById(id);
        res_data.message = `${product.name} deleted successfully`
        res.status(400)
    }

    res.json(res_data);

})

module.exports = router