import { render } from '@testing-library/react'
import { mountWithTheme } from '../../../classes/utilities/test-provider'
import PageTitle from './page-title'

describe('The PageTitle', () => {
  it('should render correctly with no props', () => {
    const { container } = mountWithTheme(render, PageTitle, {})

    expect(container).not.toBeNull()
    expect(container.firstChild).not.toBeNull()
  })

  it('should render correctly with props', () => {
    const titleText = 'page-title'
    const { container } = mountWithTheme(render, PageTitle, { titleText })

    expect(container).not.toBeNull()
    expect(container.firstChild).not.toBeNull()
  })
})
