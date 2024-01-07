import React, {
  useEffect,
} from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
// import PropTypes from 'prop-types'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './page-content.scss'
import {
  setLoaderVisibility,
  setLoadingText,
} from '../../../redux/loaderSlice'
import { setECSRequests } from '../../../redux/userSlice'
import api from '../../../classes/api'
import PageTitle from '../../atoms/page-title'
import ECSRequestsTable from './ecs-requests-table'
import IconBtn from '../../atoms/icon-btn'

const PageContent = function PageContent() {
  const history = useHistory()
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
        dispatch(setECSRequests(userResult))
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
    console.info('called ====>> ', ecsRequests)
  }, [ecsRequests])

  return (
    <div className="row flexGrow mx-0">
      <div className="col pt-2 flexGrow align-top justify-content-start">
        <PageTitle titleText="Employee Certificate Requests" />
        <div className="row justify-content-end px-3">
          <IconBtn
            icon={faPlus}
            onClickHandler={() => { history.push('/createRequest') }}
            btnLabelLeft="Request Certificate"
            btnClass="w-25 py-2"
          />
        </div>
        {(ecsRequests && ecsRequests?.length > 0 && (
          <ECSRequestsTable />
        ))
          || (
            <span>
              No requests available, please create a new request
              using the &apos;Request Certificate&apos; button
            </span>
          )}
      </div>
    </div>
  )
}

export default PageContent
