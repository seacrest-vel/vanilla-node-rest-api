const {writeFileSync} = require("fs")

function writeDataToJSON(filename, content) {
  writeFileSync(filename, JSON.stringify(content), "utf-8", (err) => {
    if (err) {
      console.error(err)
    }
  })
}

function getBodyData(req) {
  return new Promise ((resolve, reject) => {
    try {
      let body = "" 
      req.on("data", (chunk) => {
        body += chunk.toString()
      }) 
      req.on("end", () => {
        resolve(body)
      })
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  getBodyData,
  writeDataToJSON
}