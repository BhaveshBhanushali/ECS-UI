import { render } from '@testing-library/react'
import { mountWithTheme } from '../../../classes/utilities/test-provider'
import CreateRequest from './createRequest'

describe('The CreateRequest', () => {
  it('should render correctly with no props', () => {
    const { container } = mountWithTheme(render, CreateRequest, {})

    expect(container).not.toBeNull()
    expect(container.firstChild).not.toBeNull()
  })
})
