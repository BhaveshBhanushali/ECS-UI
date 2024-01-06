import { render } from '@testing-library/react'
import { mountWithTheme } from '../../../classes/utilities/test-provider'
import PageContent from './page-content'

describe('The PageContent', () => {
  it('should render correctly with no props', () => {
    const { container } = mountWithTheme(render, PageContent, {})

    expect(container).not.toBeNull()
    expect(container.firstChild).not.toBeNull()
  })
})


