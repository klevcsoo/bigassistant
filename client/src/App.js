import React, { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Routes from './constants/routes'

// Pages
import LoginPage from './components/pages/auth/LoginPage/LoginPage'
import UserProfilePage from './components/pages/user/UserProfilePage'
import UserPage from './components/pages/main/UserPage'
import HomePage from './components/pages/main/HomePage'
import AboutPage from './components/pages/AboutPage/AboutPage'
import ClassPage from './components/pages/main/ClassPage'
import NotFoundPage from './components/pages/NotFoundPage'
import HomeworkPage from './components/pages/main/HomeworkPage'
import ExamsPage from './components/pages/main/ExamsPage'
import ClassSettings from './components/pages/class/ClassSettings'
import LoginOptionsPage from './components/pages/user/LoginOptionsPage'
import DeleteAccountPage from './components/pages/user/DeleteAccountPage'
import AddHomeworkPage from './components/pages/class-content/AddHomeworkPage'
import AddExamPage from './components/pages/class-content/AddExamPage'
import ClassJoinPage from './components/pages/class/ClassJoinPage'
import ClassCreatePage from './components/pages/class/ClassCreatePage'
import InspectExamPage from './components/pages/class-content/InspectExamPage'
import InspectHomeworkPage from './components/pages/class-content/InspectHomeworkPage'
import AppPopup from './components/AppPopup/AppPopup'
import AppConfirm from './components/AppPopup/AppConfirm'

const App = () => {
  const [ popupVisible, setPopupVisible ] = useState(false)
  const [ popupMessage, setPopupMessage ] = useState('')

  const displayPopup = (message, onClose) => {
    popupCloser = onClose

    setPopupMessage(message)
    setPopupVisible(true)
  }

  return (
    <div className="App">
      <AppPopup message={popupMessage} visible={popupVisible} onClose={() => {
        setPopupVisible(false)
        if (popupCloser) {popupCloser()}
      }} />
      <AppConfirm />
      <Router>
        <Switch>
          <Route exact path={Routes.HOME} render={(props) => <HomePage {...props} displayPopup={displayPopup} />} />

          <Route exact path={Routes.LOGIN} render={(props) => <LoginPage {...props} displayPopup={displayPopup} />} />
          <Route exact path={Routes.ABOUT} render={(props) => <AboutPage {...props} displayPopup={displayPopup} />} />

          <Route exact path={Routes.CLASS} render={(props) => <ClassPage {...props} displayPopup={displayPopup} />} />
          <Route path={Routes.CLASS_CREATE} render={(props) => <ClassCreatePage {...props} displayPopup={displayPopup} />} />
          <Route path={Routes.CLASS_JOIN} render={(props) => <ClassJoinPage {...props} displayPopup={displayPopup} />} />
          <Route path={Routes.CLASS_SETTINGS} render={(props) => <ClassSettings {...props} displayPopup={displayPopup} />} />

          <Route exact path={Routes.HOMEWORK} render={(props) => <HomeworkPage {...props} displayPopup={displayPopup} />} />
          <Route path={Routes.HOMEWORK_ADD} render={(props) => <AddHomeworkPage {...props} displayPopup={displayPopup} />} />
          <Route path={Routes.HOMEWORK_INSPECT} render={(props) => <InspectHomeworkPage {...props} displayPopup={displayPopup} />} />

          <Route exact path={Routes.EXAMS} render={(props) => <ExamsPage {...props} displayPopup={displayPopup} />} />
          <Route path={Routes.EXAMS_ADD} render={(props) => <AddExamPage {...props} displayPopup={displayPopup} />} />
          <Route path={Routes.EXAMS_INSPECT} render={(props) => <InspectExamPage {...props} displayPopup={displayPopup} />} />

          <Route exact path={Routes.USER} render={(props) => <UserPage {...props} displayPopup={displayPopup} />} />
          <Route exact path={Routes.LOGIN_OPTIONS} render={(props) => <LoginOptionsPage {...props} displayPopup={displayPopup} />} />
          <Route exact path={Routes.DELETE_ACCOUNT} render={(props) => <DeleteAccountPage {...props} displayPopup={displayPopup} />} />
          <Route path={Routes.USER_PROFILE} render={(props) => <UserProfilePage {...props} displayPopup={displayPopup} />} />

          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  )
}

var popupCloser = null

export default App
