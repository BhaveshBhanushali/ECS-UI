import axios from 'axios'

class ECSAPI {
  getECSRequestList = async () => {
    try {
      const result = await axios({
        method: 'get',
        url: `${this.getBaseURL()}/request-list?subscription-key=${process.env.REACT_APP_SUBSCRIPTION_KEY}`,
        headers: this.getAPIHeaders(),
      })

      return result.data
    } catch (err) {
      if (err) {
        // throw err
        // handel custom error response
        console.error('Error fetching ECS request list.', err)
        throw err
      }
      return false
    }
  }

  postECSRequestCertificate = async (payload) => {
    try {
      const result = await axios({
        method: 'post',
        url: `${this.getBaseURL()}/request-certificate?subscription-key=${process.env.REACT_APP_SUBSCRIPTION_KEY}`,
        headers: this.getAPIHeaders(),
        data: payload,
      })

      return result.data
    } catch (err) {
      if (err.response) {
        console.error('Error executing api call.', err)
        throw err
      }
      return false
    }
  }

  getBaseURL = () => '/api'

  getAPIHeaders = () => ({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    Cache: 'no-cache',
  })
}

export default ECSAPI
