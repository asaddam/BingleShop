/*
endpoint: /admin
description: admin controller/router
 */

// import library
const express = require('express')
const _ = require('lodash')

// import use case
const order_uc = require('../controllers/order')

const order_constants = require('../internal/constants/order')

// init router
const router = express.Router()

// import product
let product_data = require('../data/product')

router.post('/product/add', function (req, res) {
    let body = req.body
    let res_data = {
        "status": "ok",
        "message": "success",
        "data": body
    }
    let new_id = product_data.length + 1
    body.id = new_id
    product_data.push(body)
    res.json(res_data)
})

router.put('/product/update/:id', function (req, res) {
    let id = parseInt(req.params['id'])
    let updated_data = req.body
    for(let i = 0; i < product_data.length; i++) {
        if(product_data[i].id === id) {
            product_data[i] = updated_data
        }
    }

    let res_data = {
        "status": "ok",
        "message": "success",
        "data": updated_data
    }

    res.json(res_data)
})

router.delete('/product/delete/:id', function (req, res) {
    let id = parseInt(req.params['id'])

    let new_product_list = []
    for(let i = 0; i < product_data.length; i++) {
        if (product_data[i].id !== id) {
            new_product_list.push(product_data[i])
        }
    }
    product_data = new_product_list

    let res_data = {
        "status": "ok",
        "message": "success",
        "data": null
    }

    res.json(res_data)
})

router.patch('/order/change-status', async (req, res) => {
    // TODO: update order status (req.body.status, req.body.order_id
    // TODO: canceled, jika dicancel maka undo change ke stock product
})

router.get('/order', async (req, res) => {
    let res_data = {
        status: 'ok',
        message: 'success'
    }
    if (req.query['status'] === 'completed') {
        res_data.data = await order_uc.listCompletedOrder()
    } else {
        res_data.data = await order_uc.listOrderExcludePending()
    }

    res.json(res_data)
})

router.patch('/order/update', async (req, res) => {
    let res_data = {
        status: 'ok',
        message: 'success',
        data: null
    }

    let order_id = req.body.id
    let status = order_constants[req.body.status]
    if (status === undefined) {
        res_data.status = 'failed'
        res_data.message = 'invalid status'
        return res.status(400).json(res_data)
    }
    await order_uc.changeOrderStatus(order_id, status)
    res.json(res_data)
})

module.exports = router
