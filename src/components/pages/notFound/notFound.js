import React from 'react'
import Logo from '../../../assets/images/logo.svg'

import './notFound.scss'

export const NotFound = () => (
  <div className="notfound">
    <img src={Logo} className="logo" alt="Logo" />
    <div className="infoText">
      <h2> Not Found </h2>
    </div>
  </div>
)

export default NotFound
