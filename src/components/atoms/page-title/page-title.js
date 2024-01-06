import React from 'react'
import PropTypes from 'prop-types'
import './page-title.scss'

const PageTitle = function PageTitle({
  titleText,
}) {
  return (
    <h3 className="pageTitle">
      {titleText}
    </h3>
  )
}
PageTitle.defaultProps = {
  titleText: null,
}

PageTitle.propTypes = {
  titleText: PropTypes.node,
}
export default PageTitle
