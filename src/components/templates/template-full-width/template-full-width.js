import React from 'react'
import PropTypes from 'prop-types'
import './template-full-width.scss'

const TemplateFullWidth = function TemplateFullWidth({
  globalHeaderEl, pageContentEl, globalFooterEl, mainContainerClasses, wrapperContainerClasses,
}) {
  return (
    <div className={`full-height-container ${mainContainerClasses}`}>
      <div>
        {globalHeaderEl}
      </div>
      <div className={`flexCol flexGrow contentWrapper ${wrapperContainerClasses} `}>
        {pageContentEl}
      </div>
      <div>
        {globalFooterEl}
      </div>
    </div>
  )
}

TemplateFullWidth.defaultProps = {
  globalHeaderEl: null,
  pageContentEl: null,
  globalFooterEl: null,
  mainContainerClasses: '',
  wrapperContainerClasses: '',
}

TemplateFullWidth.propTypes = {
  globalHeaderEl: PropTypes.node,
  pageContentEl: PropTypes.node,
  globalFooterEl: PropTypes.node,
  mainContainerClasses: PropTypes.string,
  wrapperContainerClasses: PropTypes.string,
}

export default TemplateFullWidth
