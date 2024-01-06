import axios from 'axios'
import ECSAPI from './ecs-api'

const shoulddReturnData = 'should return data from an asynchronous request'
const responseFailed = 'Failed to get response'
const handleErrIncorrectResponse = 'should handle error, return false when response is incorrect'

jest.mock('axios')

describe('ECSAPI methods', () => {
  const ecsAPI = new ECSAPI()

  describe('getECSRequestList', () => {
    it(shoulddReturnData, async () => {
      const mockData = {
        data: [
          {
            address_to: 'Bank of Jupiter',
            issued_on: '7/2/2023',
            purpose: 'Loan Application',
            reference_no: 42,
            status: 'New',
          },
          {
            address_to: 'Bank of Mars',
            issued_on: '6/27/2023',
            purpose: 'Loan Application',
            reference_no: 83,
            status: 'Under Review',
          },
        ],
      }

      axios.mockResolvedValue(mockData)

      const result = await ecsAPI.getECSRequestList()

      expect(result).toBeDefined()

      expect(axios).toHaveBeenCalledWith({
        method: 'get',
        url: `${ecsAPI.getHostURL()}/request-list?subscription-key=${process.env.REACT_APP_SUBSCRIPTION_KEY}`,
        headers: ecsAPI.getAPIHeaders(),
      })

      expect(result).toEqual(mockData.data)
    })

    it('should hamdel error, throw error when response is incorrect', async () => {
      const err = new Error(responseFailed)
      axios.mockResolvedValue({
        get data() {
          throw err
        },
      })
      let result
      try {
        result = await ecsAPI.getECSRequestList()
      } catch (e) {
        result = e
      }

      expect(result).toEqual(err)
    })
  })

  describe('postECSRequestCertificate', () => {
    it(shoulddReturnData, async () => {
      const sampleData = {
        address_to: 'Embassy of Neptun11',
        purpose: 'Visa Application',
        issued_on: '12/9/2022',
        employee_id: '123456',
      }
      const mockData = {
        data: {
          responce: 'Ok',
        },
      }

      axios.mockResolvedValue(mockData)

      const result = await ecsAPI.postECSRequestCertificate(sampleData)

      expect(result).toBeDefined()

      expect(axios).toHaveBeenCalledWith({
        method: 'post',
        url: `${ecsAPI.getBaseURL()}/request-certificate?subscription-key=${process.env.REACT_APP_SUBSCRIPTION_KEY}`,
        headers: ecsAPI.getAPIHeaders(),
        data: sampleData,
      })

      expect(result).toEqual(mockData.data)
    })

    it(handleErrIncorrectResponse, async () => {
      const sampleData = {
        address_to: 'Embassy of Neptun11',
        purpose: 'Visa Application',
        issued_on: '12/9/2022',
        employee_id: '123456',
      }

      axios.mockResolvedValue({
        get data() {
          throw new Error(responseFailed)
        },
      })
      const result = await ecsAPI.postECSRequestCertificate(sampleData)

      expect(result).toBe(false)
    })
  })
})
