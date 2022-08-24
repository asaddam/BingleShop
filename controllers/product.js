// import models
const { Product } = require("../database/models")

module.exports = {
    getListProduct: async (filters) => {
        let options = {}
        if (typeof filters !== "undefined" || filters !== null) {
            options.where = filters
        }
        let product = []

        // error handling
        try {
            product = await Product.findAll(options)
        } catch (e) {
            console.log(e)
        }

        return product
    },

    getProductByID: async (id) => {
        let product = null
        console.log(id);
        try {
            product = await product.findOne({
                where: { id: id }
            })
            console.log(product)
        } catch (e) {
            console.log(e)
        }

        return product
    },

    deleteProductById: async (id) => {
        let product = null
        try {
            product = await product.destroy({
                where: { id: id }
            })
        } catch (e) {
            console.log(e)
        }

        return id;
    }

}