import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleInfo, faCircleCheck, faCircleXmark,
} from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button'
import ReactModal from 'react-bootstrap/Modal'
import { VARIANTS_TYPES, MESSAGE_TYPES } from '../../../data/constants'
import './modal.scss'

const Modal = function Modal({
  isVisible, modalCloseHandler, titleText, messageText, modalType, isCentered,
  primaryBtnHandler, primaryBtnText, secondaryBtnHandler, secondaryBtnText, backdrop,
}) {
  const getModalTitle = () => {
    if (titleText) {
      return titleText
    }

    switch (modalType) {
      case MESSAGE_TYPES.success:
        return 'Successfully Processed Request'
      case MESSAGE_TYPES.error:
        return 'Error Processing Request'
      default:
        return 'Note'
    }
  }

  const getModalStyle = () => {
    switch (modalType) {
      case MESSAGE_TYPES.success:
        return 'rootSuccess'
      case MESSAGE_TYPES.error:
        return 'rootError'
      default:
        return 'rootInfo'
    }
  }

  const getColorByModelType = () => {
    switch (modalType) {
      case MESSAGE_TYPES.success:
        return 'success'
      case MESSAGE_TYPES.error:
        return 'error'
      default:
        return 'info'
    }
  }

  const getModalIcon = () => {
    switch (modalType) {
      case MESSAGE_TYPES.success:
        return faCircleCheck
      case MESSAGE_TYPES.error:
        return faCircleXmark
      default:
        return faCircleInfo
    }
  }

  return (
    <>
      <ReactModal
        show={isVisible}
        onHide={modalCloseHandler}
        backdrop={backdrop}
        keyboard={false}
        className={getModalStyle()}
        centered={isCentered}
      >
        <ReactModal.Header closeButton>
          <ReactModal.Title className={getColorByModelType()}>{getModalTitle()}</ReactModal.Title>
        </ReactModal.Header>
        <ReactModal.Body className="py-4">
          <div className="row py-3 modalContentWrapper">
            <div className="col-4 align-self-center text-center">
              <FontAwesomeIcon icon={getModalIcon()} className={`iconMdl ${getColorByModelType()}`} />
            </div>
            <div className="col-8 align-self-center">
              {messageText}
            </div>
          </div>
        </ReactModal.Body>
        <ReactModal.Footer>
          {(secondaryBtnText && secondaryBtnHandler) && (
            <Button variant={VARIANTS_TYPES.secondary} onClick={secondaryBtnHandler}>
              {secondaryBtnText}
            </Button>
          )}
          {(primaryBtnText && primaryBtnHandler) && (
            <Button variant={VARIANTS_TYPES.primary} className="blueBtn" onClick={primaryBtnHandler}>
              {primaryBtnText}
            </Button>
          )}
        </ReactModal.Footer>
      </ReactModal>
    </>
  )
}
Modal.defaultProps = {
  isVisible: false,
  isCentered: false,
  modalCloseHandler: () => { },
  titleText: '',
  modalType: MESSAGE_TYPES.info,
  primaryBtnHandler: () => { },
  primaryBtnText: '',
  secondaryBtnHandler: () => { },
  secondaryBtnText: '',
  backdrop: 'static',
}

Modal.propTypes = {
  isVisible: PropTypes.bool,
  isCentered: PropTypes.bool,
  modalCloseHandler: PropTypes.func,
  titleText: PropTypes.string,
  messageText: PropTypes.string.isRequired,
  modalType: PropTypes.oneOf(Object.keys(MESSAGE_TYPES)),
  primaryBtnHandler: PropTypes.func,
  primaryBtnText: PropTypes.string,
  secondaryBtnHandler: PropTypes.func,
  secondaryBtnText: PropTypes.string,
  backdrop: PropTypes.string,
}

export default Modal
