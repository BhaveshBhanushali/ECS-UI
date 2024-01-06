import React from 'react'
import PropTypes from 'prop-types'
import { ToastContainer, Toast, ToastHeader } from 'react-bootstrap'
import './toast.scss'

const ToastMsg = function ToastMsg({
  toastTitle,
  toastText,
  closeToast,
  isVisible,
}) {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast
        onClose={closeToast}
        className="toastPopup"
        show={isVisible}
        delay={3000}
        autohide
      >
        <ToastHeader>
          <strong className="me-auto">{toastTitle}</strong>
        </ToastHeader>
        <Toast.Body>{toastText}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}
ToastMsg.defaultProps = {
  isVisible: false,
  toastTitle: null,
  toastText: '',
  closeToast: () => {},
}

ToastMsg.propTypes = {
  isVisible: PropTypes.bool,
  toastTitle: PropTypes.string,
  toastText: PropTypes.string,
  closeToast: PropTypes.func,
}
export default ToastMsg
