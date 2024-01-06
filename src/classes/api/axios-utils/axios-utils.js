import axios from 'axios'

/**
 * Various utilities for axios
 */
class AxiosUtils {
    createCancelTokenSource = () => {
      const { CancelToken } = axios
      const source = CancelToken.source()

      return source
    }
}
const utils = new AxiosUtils()

export default utils
