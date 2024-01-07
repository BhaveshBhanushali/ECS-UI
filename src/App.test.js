import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import comfigureStore from 'redux-mock-store'
import { mountWithTheme } from './classes/utilities/test-provider'
import App from './App'

const mockStore = comfigureStore()
const store = mockStore({
  loader: {
    isLoaderVisible: true,
    loadingText: 'Loading',
  },
  user: {
    ecsRequests: [
      {
        reference_no: 100,
        status: 'Done',
        address_to: 'Embassy of Earth',
        issued_on: '6/16/2023',
        purpose: 'Visa Formality',
      },
      {
        address_to: 'Embassy of Earth',
        issued_on: '8/20/2023',
        purpose: 'Visa Formality',
        reference_no: 91,
        status: 'Pending',
      },
    ],
  },
})

describe('The App', () => {
  it('should render correctly with no props', () => {
    const { container } = mountWithTheme(render, App, {}, store)

    expect(container).not.toBeNull()
    expect(container.firstChild).not.toBeNull()
  })
})
