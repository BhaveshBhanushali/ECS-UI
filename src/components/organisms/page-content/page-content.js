import React, {
  useState, useEffect,
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import PropTypes from 'prop-types'
import './page-content.scss'
import {
  setLoaderVisibility,
  setLoadingText,
} from '../../../redux/loaderSlice'
import { setECSRequests } from '../../../redux/userSlice'
import api from '../../../classes/api'
import PageTitle from '../../atoms/page-title'

const PageContent = function PageContent() {
  const dispatch = useDispatch()
  const ecsRequests = useSelector((state) => state.user.ecsRequests)

  const showLoader = (msg) => {
    dispatch(setLoaderVisibility(true))
    dispatch(setLoadingText(msg || 'Loading...'))
  }

  const hideLoader = () => {
    dispatch(setLoaderVisibility(false))
    dispatch(setLoadingText(''))
  }

  const getECSRequestList = async () => {
    try {
      showLoader('Getting ECS Request List')
      const userResult = await api.ecsAPI.getECSRequestList()
      if (userResult && userResult.length > 0) {
        dispatch(setECSRequests(userResult.result))
      }
    } catch (err) {
      console.error('Failed to get ECS request list: ', err)
    } finally {
      hideLoader()
    }
  }

  useEffect(() => {
    if (!ecsRequests) {
      getECSRequestList()
    }
  }, [ecsRequests])

  return (
    <div className="row flexGrow mx-0">
      <PageTitle titleText="Sample React App" />
    </div>
  )
}

export default PageContent
