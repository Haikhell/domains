const createCsvWriter = require('csv-writer').createObjectCsvWriter;

async function write(records) {
  const csvWriter = createCsvWriter({
    path: 'result.csv',
    header: [
      { id: 'firstName', title: 'firstName' },
      { id: 'lastName', title: 'lastName' },
      { id: 'email', title: 'email' },
      { id: 'domain', title: 'domain' },
      { id: 'companyName', title: 'companyName' },
      { id: 'type', title: 'type' },
      { id: 'position', title: 'position' }
    ]
  });

  await csvWriter.writeRecords(records)       // returns a promise
    .then(() => {
      console.log('...Done');
    });

}


module.exports = write