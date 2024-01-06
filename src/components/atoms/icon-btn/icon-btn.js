import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import './icon-btn.scss'

const IconBtn = function IconBtn({
  icon, onClickHandler, btnLabelLeft, btnLabelRight, tooltipText, btnClass,
}) {
  const renderButton = () => (
    <Button variant="dark" onClick={onClickHandler} className={`${btnClass} iconBtnRoot`}>
      {btnLabelLeft && (<span className="pe-2 labelText">{btnLabelLeft}</span>)}

      <FontAwesomeIcon icon={icon} />

      {btnLabelRight && (<span className="ps-2 labelText">{btnLabelRight}</span>)}
    </Button>
  )
  return (
    tooltipText
      ? (
        <OverlayTrigger
          placement="bottom"
          overlay={(
            <Tooltip id="button-tooltip-2">
              { tooltipText }
            </Tooltip>
          )}
        >
          { renderButton()}
        </OverlayTrigger>
      )
      : (
        renderButton()
      )
  )
}
IconBtn.defaultProps = {
  icon: null,
  onClickHandler: () => {},
  btnLabelLeft: '',
  btnLabelRight: '',
  tooltipText: '',
  btnClass: '',
}

IconBtn.propTypes = {
  icon: PropTypes.instanceOf(Object),
  onClickHandler: PropTypes.func,
  btnLabelLeft: PropTypes.string,
  btnLabelRight: PropTypes.string,
  tooltipText: PropTypes.string,
  btnClass: PropTypes.string,
}

export default IconBtn
