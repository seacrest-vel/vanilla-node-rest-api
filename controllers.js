const { getBodyData } = require("./handlers");
const { findAll, findById, create, update, remove } = require("./produtcs-data")

async function getProducts(req, res) {
  try {
    const products = await findAll();

    res.writeHead(200, {
      "Content-type": "application/json"
    })
    res.end(JSON.stringify(products))

  } catch (err) {
    console.error(err)
  }
}

async function getProduct(request, response, id){
  try {
    const product = await findById(id)

    if (!product) {
      response.writeHead(404, {
        "Content-type": "application/json"
      })
      response.end(JSON.stringify({message:"Product not found"}))
    }
    else {
      response.writeHead(200, {
        "Content-type": "application/json"
      })
      response.end(JSON.stringify(product))
    }

  } catch (err) {
    console.error(err)
  }
}


async function createProduct(request, response){
  try {
    const body = await getBodyData(request)
    const {name, amount} = JSON.parse(body)

    const product = {name, amount}

    const newProduct = await create(product)

    response.writeHead(201, {
      "Content-Type": "application/json"
    })
    return response.end(JSON.stringify(newProduct))

  } catch (err) {
    console.error(err)
  }
}

async function updateProduct(req, res, id) {
  try {
    const product = await findById(id)

    if (!product) {
      res.writeHead(404, {
        "Content-type": "application/json"
      })
      res.end(JSON.stringify({message:"product not found"}))
    } else {
      const body = await getBodyData(req);

      const {name, amount} = JSON.parse(body)

      const productData = {
        name: name || product.name,
        amount: amount || product.amount
      }

      const updatedProduct = await update(id, productData)

      res.writeHead(200, {
        "Content-Type": "application/json"
      })
      return res.end(JSON.stringify(updatedProduct))
    }

  } catch (err) {
    console.error(err)
  }
}

async function deleteProduct(request, response, id){
  try {
    const product = await findById(id)

    if (!product) {
      response.writeHead(404, {
        "Content-type": "application/json"
      })
      response.end(JSON.stringify({message:"Product not found"}))
    }
    else {
      await remove(id)
      response.writeHead(200, {
        "Content-type": "application/json"
      })
      response.end(JSON.stringify({
        message: `Product ${id} removed`
      }))
    }

  } catch (err) {
    console.error(err)
  }
}


module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}