import React from 'react'
import PropTypes from 'prop-types'
import Spinner from 'react-bootstrap/Spinner'
import { VARIANTS_TYPES } from '../../../data/constants'
import './loader.scss'

const Loader = function Loader({
  loadingText,
}) {
  return (
    <div className="full-hight-container position-fixed top-0 start-0 LoaderRoot">
      <Spinner animation="border" className="position-absolute spinner" size="lg" variant={VARIANTS_TYPES.secondary} />

      {loadingText && (
        <div className="text-secondary position-absolute text-center LoaderlabelText">
          {loadingText}
        </div>
      )}
    </div>
  )
}
Loader.defaultProps = {
  loadingText: '',
}

Loader.propTypes = {
  loadingText: PropTypes.string,
}

export default Loader
