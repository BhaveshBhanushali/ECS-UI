import { render } from '@testing-library/react'
import { mountWithTheme } from '../../../classes/utilities/test-provider'
import ToastMsg from './toast'

describe('The ToastMsg', () => {
  it('should render correctly with no props', () => {
    const { container } = mountWithTheme(render, ToastMsg, {})

    expect(container).not.toBeNull()
    expect(container.firstChild).not.toBeNull()
  })

  it('should render correctly with props', () => {
    const toastTitle = ''
    const toastText = 'Msg'

    const { container } = mountWithTheme(render, ToastMsg, { toastTitle, toastText })

    expect(container).not.toBeNull()
    expect(container.firstChild).not.toBeNull()
  })
})
