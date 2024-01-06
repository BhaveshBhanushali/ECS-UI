import { render } from '@testing-library/react'
import comfigureStore from 'redux-mock-store'
import { mountWithTheme } from '../../../classes/utilities/test-provider'
import Loader from './loader'

const mockStore = comfigureStore()
describe('The Loader', () => {
  const store = mockStore({
    loader: {
      isLoaderVisible: true,
      loadingText: 'Loading',
    },
  })
  it('should render correctly with no props', () => {
    const { container } = mountWithTheme(render, Loader, {}, store)

    expect(container).not.toBeNull()
    expect(container.firstChild).not.toBeNull()
  })

  it('should render correctly with props', () => {
    const loadingText = 'test loading text'

    const { container } = mountWithTheme(render, Loader, { loadingText }, store)

    expect(container).not.toBeNull()
    expect(container.firstChild).not.toBeNull()
  })
})
