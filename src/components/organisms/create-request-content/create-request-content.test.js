import { render } from '@testing-library/react'
import { mountWithTheme } from '../../../classes/utilities/test-provider'
import CreateRequestContent from './create-request-content'

describe('The CreateRequestContent', () => {
  it('should render correctly with no props', () => {
    const { container } = mountWithTheme(render, CreateRequestContent, {})

    expect(container).not.toBeNull()
    expect(container.firstChild).not.toBeNull()
  })
})
