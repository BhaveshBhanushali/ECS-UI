import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './App.scss'
import Home from './components/pages/home'
import NotFound from './components/pages/notFound'
import Loader from './components/molecules/loader'
import { setLoaderVisibility, setLoadingText } from './redux/loaderSlice'
import { setUser } from './redux/userSlice'
import api from './classes/api'

function App() {
  const dispatch = useDispatch()

  const [isUserProfileLoading, setIsUserProfileLoading] = useState(false)
  const [userLoginAttempts, setUserLoginAttempts] = useState(0)

  const isLoaderVisible = useSelector((state) => state.loader.isLoaderVisible)
  const loadingText = useSelector((state) => state.loader.loadingText)
  const user = useSelector((state) => state.user)

  const showLoader = (msg) => {
    dispatch(setLoaderVisibility(true))
    dispatch(setLoadingText(msg))
  }

  const hideLoader = () => {
    dispatch(setLoaderVisibility(false))
    dispatch(setLoadingText(''))
  }

  const getUserProfile = async () => {
    try {
      showLoader('Getting user profile details')
      setIsUserProfileLoading(true)
      const userResult = await api.sampleAPI.getUserProfile()
      if (userResult && userResult.status === 'success' && userResult.result) {
        dispatch(setUser(userResult.result))
        setUserLoginAttempts(0)
      }
    } catch (err) {
      console.error('Failed to get user details: ', err)
    } finally {
      hideLoader()
      setIsUserProfileLoading(false)
      setUserLoginAttempts(userLoginAttempts + 1)
    }
  }

  useEffect(() => {
    if (!user) {
      getUserProfile()
    }
  }, [user, isUserProfileLoading, userLoginAttempts])

  return (
    <div className="full-height-container">
      <Router>
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
      {isLoaderVisible && <Loader loadingText={loadingText || 'Loading...'} />}
    </div>
  )
}

export default App
