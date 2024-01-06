import { render } from '@testing-library/react'
import { mountWithTheme } from '../../../classes/utilities/test-provider'
import NotFound from './notFound'

describe('The NotFound', () => {
  it('should render correctly with no props', () => {
    const { container } = mountWithTheme(render, NotFound, {})

    expect(container).not.toBeNull()
    expect(container.firstChild).not.toBeNull()
  })
})
