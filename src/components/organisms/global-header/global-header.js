import React, {
  useState,
} from 'react'
// import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
// import {
//   setLoaderVisibility,
//   setLoadingText,
// } from '../../../redux/loaderSlice'
import ToastMsg from '../../atoms/toast/toast'
//   import Person from '../../../assets/images/user-icon.svg'
import Logo from '../../../assets/images/logo.svg'
import './global-header.scss'

const GlobalHeader = function GlobalHeader() {
  // const dispatch = useDispatch()
  // const user = useSelector((state) => state.user)
  const history = useHistory()
  const [toastText] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [toastTitle] = useState('')

  // const showLoader = (msg) => {
  //   dispatch(setLoaderVisibility(true))
  //   dispatch(setLoadingText(msg))
  // }
  // const TriggerToast = (resStatus, resText) => {
  //   setToastTitle(resStatus === 'Error' ? 'OOPS!!' : 'Success')
  //   setShowToast(true)
  //   setToastText(resText)
  // }
  // const hideLoader = () => {
  //   dispatch(setLoaderVisibility(false))
  //   dispatch(setLoadingText(''))
  // }
  return (
    <>
      <Navbar expand="lg" fixed="top" className="navRoot p-0">
        <Container fluid className="px-3 py-1">
          <Nav className="col-6 justify-content-start leftNav">
            {/* <IconBtn
                icon={faSearch}
                onClickHandler={()=>{}}
                btnLabelRight="Search"
              /> */}
            <div
              className="leftside"
              onClick={() => {
                // if (onClickFunc) {
                //   onClickFunc()
                // }
                history.push('/home')
              }}
              onKeyDown={() => {
                // if (onClickFunc) {
                //   onClickFunc()
                // }
                history.push('/home')
              }}
            >
              <img src={Logo} className="logo" alt="Logo" />
              <div className="title"> Employee Certification Solution </div>
            </div>
          </Nav>
          <Nav className="col-6 justify-content-end rightNav">
            {/* <Nav.Link className="py-0" href="">
                <IconBtn
                  icon={faSave}
                  onClickHandler={onSaveBtnCick}
                  tooltipText="Save Layout Preferences"
                />
              </Nav.Link> */}
            <div className="rightside">
              {/* {(user && (user?.firstName || user?.lastName)) && (
                <div className="person__name">
                  {' '}
                  {user?.firstName || ''}
                  {' '}
                  {user?.lastName || ''}
                </div>
              )}
              {' '}
              <img src={Logo} className="person__icon" alt="Person Icon" /> */}
            </div>
          </Nav>
        </Container>
      </Navbar>
      <ToastMsg
        isVisible={showToast}
        closeToast={() => setShowToast(false)}
        toastTitle={toastTitle}
        toastText={toastText}
      />

    </>
  )
}

export default GlobalHeader
