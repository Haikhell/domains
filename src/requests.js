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

async function authUser() {
  const {
    API_USER_ID,
    API_SECRET
  } = config

  if (!API_USER_ID || !API_SECRET) {
    console.log('User account or secret key not found')
    return null
  }

  const path = 'https://api.snov.io/v1/oauth/access_token'

  try {
    const res = await axios({
      url: path,
      method: 'get',
      params: {
        grant_type: 'client_credentials',
        client_id: API_USER_ID,
        client_secret: API_SECRET,
      }
    });

    return res.data.access_token
  } catch (error) {
    console.log('authorization is fail')
    return
  }



}

module.exports = { requestToApi, authUser }