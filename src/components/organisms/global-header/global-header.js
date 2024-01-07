import React, {
  useState,
} from 'react'
import { useHistory } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import ToastMsg from '../../atoms/toast/toast'
import Logo from '../../../assets/images/logo.svg'
import './global-header.scss'

const GlobalHeader = function GlobalHeader() {
  const history = useHistory()
  const [toastText] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [toastTitle] = useState('')

  return (
    <>
      <Navbar expand="lg" fixed="top" className="navRoot p-0">
        <Container fluid className="px-3 py-1">
          <Nav className="col-6 justify-content-start leftNav">
            <div
              className="leftside"
              onClick={() => {
                history.push('/home')
              }}
              onKeyDown={() => {
                history.push('/home')
              }}
            >
              <img src={Logo} className="logo" alt="Logo" />
              <div className="title"> Employee Certification Solution </div>
            </div>
          </Nav>
          <Nav className="col-6 justify-content-end rightNav">
            <div className="rightside">
              {' '}
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
