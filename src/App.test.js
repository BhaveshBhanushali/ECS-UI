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
})

describe('The App', () => {
  it('should render correctly with no props', () => {
    const { container } = mountWithTheme(render, App, {}, store)

    expect(container).not.toBeNull()
    expect(container.firstChild).not.toBeNull()
  })
})
