import { render } from '@testing-library/react'
import comfigureStore from 'redux-mock-store'
import { mountWithTheme } from '../../../../classes/utilities/test-provider'
import ECSRequestsTable from './ecs-requests-table'

jest.mock('jspdf', () => ({
  __esModule: true,
  default: jest.fn(),
}))

const mockStore = comfigureStore()
describe('The ECSRequestsTable', () => {
  const store = mockStore({
    loader: {
      isLoaderVisible: true,
      loadingText: 'Loading',
    },
    user: {
      ecsRequests: [
        {
          reference_no: 100,
          status: 'Done',
          address_to: 'Embassy of Earth',
          issued_on: '6/16/2023',
          purpose: 'Visa Formality',
        },
        {
          address_to: 'Embassy of Earth',
          issued_on: '8/20/2023',
          purpose: 'Visa Formality',
          reference_no: 91,
          status: 'Pending',
        },
      ],
    },
  })
  it('should render correctly with no props', () => {
    const { container } = mountWithTheme(render, ECSRequestsTable, {}, store)

    expect(container).not.toBeNull()
    expect(container.firstChild).not.toBeNull()
  })

  it('should render correctly with props', () => {
    const loadingText = 'test loading text'

    const { container } = mountWithTheme(render, ECSRequestsTable, { loadingText }, store)

    expect(container).not.toBeNull()
    expect(container.firstChild).not.toBeNull()
  })
})
