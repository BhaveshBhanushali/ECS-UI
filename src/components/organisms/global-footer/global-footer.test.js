import { render } from '@testing-library/react'
import { mountWithTheme } from '../../../classes/utilities/test-provider'
import GlobalFooter from './global-footer'

describe('The GlobalFooter', () => {
  it('should render correctly with no props', () => {
    const { container } = mountWithTheme(render, GlobalFooter, {})

    expect(container).not.toBeNull()
    expect(container.firstChild).not.toBeNull()
  })
})
