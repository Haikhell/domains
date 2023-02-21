const requestToApi = require('./request')
const readCsv = require('./csvReader');
const { models } = require('./models');
const write = require('./csvWriter');
const positions = ["CEO", "CTO", "COO", "CDO", "CMO", "COO", "Head of engineering"];
const fileName = 'data.csv';

(async () => {
  const domains = await readCsv(fileName)

  const resultInfoArray = []

  for (let i = 0; i < 1; i++) {
    try {
      const resRequest = ((await requestToApi(domains[i], positions)).data)

      for (let i = 0; i < resRequest.emails.length; i++) {
        resRequest.emails[i].domain = domains[i]
      }

      await models.Domain.bulkCreate(resRequest.emails)

      resultInfoArray.push(...resRequest.emails)
    } catch (error) {
      console.log(error)
    }

    await write(resultInfoArray)
  }
})()