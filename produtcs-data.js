let products = require("../products.json")
const { writeDataToJSON } = require("./handlers")

function findAll() {
  return new Promise((res, rej) => {
    res(products)
  })
} 
function findById(id) {
   return new Promise((res,rej) => {
    const product = products.find(p => p.id === id)
    console.log({product});
    res(product)
   })
}

function create(product) {
  return new Promise((res, rej) => {
    const newProduct = {
      id: Date.now().toString(),
      ...product
    }
    products.push(newProduct)
    writeDataToJSON("./products.json", products)
    res(newProduct)
  })
}

function update(id, product) {
  return new Promise((res, rej) => {
    const index = products.findIndex((p) => p.id === id)
    products[index] ={id, ...product}
    writeDataToJSON("./products.json", products)
    res(products[index])
  })
}

function remove(id) {
  return new Promise((res, rej) => {
    products = products.filter((p) =>  p.id !== id)
    writeDataToJSON("./products.json", products)
    res()
  })
}

module.exports = {
  findAll, 
  findById,
  create,
  update,
  remove
}