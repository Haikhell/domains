const { requestToApi, authUser } = require('./requests')
const readCsv = require('./csvReader');
const write = require('./csvWriter');

const { config } = require('./config');
const { models } = require('./models');

const positions = ["CEO", "CTO", "COO", "CDO", "CMO", "COO", "Head of engineering"];
const fileName = 'data.csv'; // назва файлу з якого стягувати CSV данні (список доменів)

(async () => {
  const authToken = await authUser()

  if (!authToken) {
    return
  }

  const domains = await readCsv(fileName)

  const resultInfoArray = []

  for (let i = 0; i < domains.length; i++) {

    if (config.STEP_LOGS === 'true') {
      console.log(`request to domain: ${domains[i]}`)
    }

    const emails = await models.Domain.findAll({
      where: {
        domain: domains[i]
      },
    })

    if (emails.length <= 0) {
      try {
        const resRequest = ((await requestToApi(authToken, domains[i], positions, countNeedEmailsFind).data))

        for (let i = 0; i < resRequest.emails.length; i++) {
          resRequest.emails[i].domain = domains[i]
        }

        await models.Domain.bulkCreate(resRequest.emails)

        resultInfoArray.push(...resRequest.emails)
        resultInfoArray.push(...emails)
      } catch (error) {
        console.log(error)
        if (config.NODE_ENV === 'development') {
          if (error.response) {
            console.log(error.response)
          } else {
            console.log(error.message)
          }
        }
      }
    } else {
      resultInfoArray.push(...emails)
    }

  }
  await write(resultInfoArray)

})()

