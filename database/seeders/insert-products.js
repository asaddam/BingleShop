module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Products", [
            {
                name: "Jeans",
                category: "Celana",
                price: 25000,
                stock: 10,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Bumbu Nasi Goreng",
                category: "makanan",
                price: 10000,
                stock: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Baju Anak",
                category: "pakaian",
                price: 2000,
                stock: 100,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Products", null, {})
    }
}