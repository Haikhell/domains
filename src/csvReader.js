const csv = require('csv-parser')
const fs = require('fs')

async function readCsv(fileName) {
  const arrayData = []

  return new Promise((res, rej) => {
    fs.createReadStream(fileName)
      .pipe(csv())
      .on('data', (data) => arrayData.push(data.domain))
      .on('end', () => {
        res(arrayData)
      })
  })
}

module.exports = readCsv