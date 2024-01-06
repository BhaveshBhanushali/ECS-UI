import { useState } from 'react'
import axiosUtils from '../../api/axios-utils'

export default function useCancelToken() {
  const [tokenSource, setTokenSource] = useState(null)

  const createTokenSource = () => {
    const src = axiosUtils.createCancelTokenSource()

    setTokenSource(src)

    return src
  }
  const cancelPendingRequest = () => {
    if (tokenSource) {
      tokenSource.cancel('Cancelling old api call...')
    }
  }

  return {
    createTokenSource,
    cancelPendingRequest,
  }
}
