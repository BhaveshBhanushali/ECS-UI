import { render } from '@testing-library/react'
import { mountWithTheme } from '../../../classes/utilities/test-provider'
import Modal from './modal'
import { MESSAGE_TYPES } from '../../../data/constants'

describe('The Modal', () => {
  it('should render correctly with required props', () => {
    const messageText = 'test loading text'
    const isVisible = true

    const { getByText } = mountWithTheme(render, Modal, { messageText, isVisible })

    expect(getByText(messageText)).not.toBeNull()
  })

  it('should render correctly with all props', () => {
    const messageText = 'test loading text'
    const modalType = MESSAGE_TYPES.success
    const isVisible = true
    const secondaryBtnText = 'Cancel'
    const primaryBtnText = 'Retry'

    const { getByText } = mountWithTheme(render, Modal, {
      messageText, modalType, isVisible, secondaryBtnText, primaryBtnText,
    })

    expect(getByText(messageText)).not.toBeNull()
  })
})
