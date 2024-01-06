import { render } from '@testing-library/react'
import { mountWithTheme } from '../../../classes/utilities/test-provider'
import Home from './home'

describe('The Home', () => {
  it('should render correctly with no props', () => {
    const { container } = mountWithTheme(render, Home, {})

    expect(container).not.toBeNull()
    expect(container.firstChild).not.toBeNull()
  })
})
