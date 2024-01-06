import React from 'react'
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import './App.scss'
import Home from './components/pages/home'
import NotFound from './components/pages/notFound'
import Loader from './components/molecules/loader'

function App() {
  const isLoaderVisible = useSelector((state) => state.loader.isLoaderVisible)
  const loadingText = useSelector((state) => state.loader.loadingText)

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
