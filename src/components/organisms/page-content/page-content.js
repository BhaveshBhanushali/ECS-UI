import React from 'react'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import './page-content.scss'
// import {
//   reducerFuncName as reducerFuncNameReducer,
// } from '../../../redux/SliceFile'
import PageTitle from '../../atoms/page-title'

export class PageContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="row flexGrow mx-0">
        <PageTitle titleText="Sample React App" />
      </div>
    )
  }
}

const mapStateToProps = () => ({
  // storePropertyName: state.storeScliceName.storePropertyName,
})

const mapDispatchToProps = {
//   setReducerFncName: setReducerName,
}

PageContent.defaultProps = {
  // storePropertyName: 'initial Value',
}

PageContent.propTypes = {
//   storePropertyName: PropTypes.oneOfType(PropTypes.string),
// setReducerFncName: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(PageContent)
