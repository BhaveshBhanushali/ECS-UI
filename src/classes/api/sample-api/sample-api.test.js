import axios from 'axios'
import SampleAPI from './sample-api'

const shoulddReturnData = 'should return data from an asynchronous request'
const responseFailed = 'Failed to get response'
const handleErrIncorrectResponse = 'should handle error, return false when response is incorrect'

jest.mock('axios')

describe('SampleAPI methods', () => {
  const sampleAPI = new SampleAPI()

  describe('getSampleAPI', () => {
    it(shoulddReturnData, async () => {
      const mockData = {
        data: {
          status: 'success',
          requestId: 'sample id',
          meta: {},
          result: [{ ObjKey: 'Val' },
            { ObjKey: 'Val2' }],
        },
      }

      axios.mockResolvedValue(mockData)

      const result = await sampleAPI.getSampleAPI()

      expect(result).toBeDefined()

      expect(axios).toHaveBeenCalledWith({
        method: 'get',
        url: `${sampleAPI.getBaseURL()}/GetAPI_URL`,
        headers: sampleAPI.getAPIHeaders(),
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
        result = await sampleAPI.getSampleAPI()
      } catch (e) {
        result = e
      }

      expect(result).toEqual(err)
    })
  })

  describe('getUserProfile', () => {
    it(shoulddReturnData, async () => {
      const mockData = {
        data: {
          status: 'success',
          requestId: 'sample id',
          meta: {},
          result: { userId: '1111', groupIds: ['123', '1234'] },
        },
      }

      axios.mockResolvedValue(mockData)

      const result = await sampleAPI.getUserProfile()

      expect(result).toBeDefined()

      expect(axios).toHaveBeenCalledWith({
        method: 'get',
        url: `${sampleAPI.getHostURL()}/user/profileURL`,
        headers: sampleAPI.getAPIHeaders(),
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
        result = await sampleAPI.getUserProfile()
      } catch (e) {
        result = e
      }

      expect(result).toEqual(err)
    })
  })

  describe('postSampleAPI', () => {
    it(shoulddReturnData, async () => {
      const sampleData = {
        countries: ['India'],
        brands: ['Apple'],
      }
      const mockData = {
        data: {
          status: 'success',
          requestId: 'sample id',
          meta: {},
          result: [{
            brandName: 'Apple',
            countryName: 'India',
            sampleDataResp: [{
              fiscalYear: '2023', noPremiumProducts: '24',
            }],
          }],
        },
      }

      axios.mockResolvedValue(mockData)

      const result = await sampleAPI.postSampleAPI(sampleData)

      expect(result).toBeDefined()

      expect(axios).toHaveBeenCalledWith({
        method: 'post',
        url: `${sampleAPI.getBaseURL()}/proxy/PostAPI_URL`,
        headers: sampleAPI.getAPIHeaders(),
        data: sampleData,
      })

      expect(result).toEqual(mockData.data)
    })

    it(handleErrIncorrectResponse, async () => {
      const sampleData = {
        countries: ['India'],
        brands: ['Apple'],
      }

      axios.mockResolvedValue({
        get data() {
          throw new Error(responseFailed)
        },
      })
      const result = await sampleAPI.postSampleAPI(sampleData)

      expect(result).toBe(false)
    })
  })
})
