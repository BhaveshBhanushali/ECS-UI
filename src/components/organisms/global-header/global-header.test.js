import { render } from '@testing-library/react'
import comfigureStore from 'redux-mock-store'
import { mountWithTheme } from '../../../classes/utilities/test-provider'
import GlobalHeader from './global-header'

const mockStore = comfigureStore()

describe('The GlobalHeader', () => {
  it('should render correctly with no props', () => {
    const store = mockStore({
      loader: {
        isLoaderVisible: true,
        loadingText: 'Loading',
      },
    })
    const { container } = mountWithTheme(render, GlobalHeader, {}, store)

    expect(container).not.toBeNull()
    expect(container.firstChild).not.toBeNull()
  })
})
