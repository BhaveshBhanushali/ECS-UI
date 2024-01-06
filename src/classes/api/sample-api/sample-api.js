import axios from 'axios'

class SampleAPI {
  getUserProfile = async () => {
    try {
      const result = await axios({
        method: 'get',
        url: `${this.getHostURL()}/user/profileURL`,
        headers: this.getAPIHeaders(),
      })

      return result.data
    } catch (err) {
      if (err) {
        // throw err
        // handel custom error response
        console.error('Error fetching user profile.', err)
        throw err
      }
      return false
    }
  }

  getSampleAPI = async () => {
    try {
      const result = await axios({
        method: 'get',
        url: `${this.getBaseURL()}/GetAPI_URL`,
        headers: this.getAPIHeaders(),
      })

      return result.data
    } catch (err) {
      if (err) {
        // throw err
        // handel custom error response
        console.error('Error fetching all brands.', err)
        throw err
      }
      return false
    }
  }

  postSampleAPI = async (payload) => {
    try {
      const result = await axios({
        method: 'post',
        url: `${this.getBaseURL()}/proxy/PostAPI_URL`,
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

  getHostURL = () => 'http://localhost:8080'
  // getHostURL = () => `${window.location.origin}`

  getBaseURL = () => `${this.getHostURL()}/${process.env.REACT_APP_API_BASE_URL}`

  getAPIHeaders = () => ({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Cache: 'no-cache',
  })
  // if (window.location.host.indexOf('.apple.com') > -1) {
  //   return {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //     Cache: 'no-cache',
  //     'X-Requested-With': 'XMLHttpRequest',
  //     CSRF: window.csrf_token_val,
  //   }
  // }
}

export default SampleAPI
