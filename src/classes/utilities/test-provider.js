import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import history from '../history'
// import { ThemeProvider } from 'react-jss'
import { store as mainStore } from '../../redux/store'
// import { theme } from '@design-system'

/**
 * Helper function for Jest Tests. Will mount a component with the correct `theme` context
 *
 * @param {Function}        mountFn     Function to call to mount the passed component with theme
 * @param {React.Component} Component   Component to mount with theme
 *
 * @returns {Object} An object containing two mounted components:
 *  - the outermost `ThemeProvider` as `themeWrapper` created by react-jss
 *  - the passed `Component` as `wrapper` which should be the jumping-off point for assertions
 */
// eslint-disable-next-line
export const mountWithTheme = (mountFn, Component, props = {}, _store = null) => mountFn(
  // <ThemeProvider theme={theme}>
  <Provider store={_store || mainStore}><Component {...props} /></Provider>,
  // </ThemeProvider>,
)

export const mountWithThemeAndRouter = (mountFn, Component, props = {}, _store = null) => mountFn(
  // <ThemeProvider theme={theme}>
  <Router history={history}>
    <Provider store={_store || mainStore}><Component {...props} /></Provider>
  </Router>,
  // </ThemeProvider>,
)
