import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import history from '../history'
import { store as mainStore } from '../../redux/store'

// eslint-disable-next-line
export const mountWithTheme = (mountFn, Component, props = {}, _store = null) => mountFn(
  <Provider store={_store || mainStore}><Component {...props} /></Provider>,
)

export const mountWithThemeAndRouter = (mountFn, Component, props = {}, _store = null) => mountFn(
  <Router history={history}>
    <Provider store={_store || mainStore}><Component {...props} /></Provider>
  </Router>,
)
