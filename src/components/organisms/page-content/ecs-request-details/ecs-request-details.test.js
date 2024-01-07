import { render } from '@testing-library/react'
import { mountWithTheme } from '../../../../classes/utilities/test-provider'
import ECSRequestDetails from './ecs-request-details'

jest.mock('jspdf', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('The ECSRequestDetails', () => {
  it('should render correctly with no props', () => {
    const { container } = mountWithTheme(render, ECSRequestDetails, {})

    expect(container).not.toBeNull()
    expect(container.firstChild).not.toBeNull()
  })
})
