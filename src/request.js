const axios = require('axios');
const { config } = require('./config');
const apiPath = 'https://api.snov.io/v2/domain-emails-with-info'

function requestToApi(domain, positions, limit = 1) {
  return axios({
    url: apiPath,
    method: 'get',
    headers: {
      Authorization: `Bearer ${config.token}`
    },
    params: {
      type: 'all',
      domain,
      limit,
      positions
    }
  });
}

module.exports = requestToApi