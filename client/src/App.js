import React, { Component } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Routes from './constants/routes'

// Pages
import LoginPage from './components/pages/auth/LoginPage/LoginPage';
import UserProfilePage from './components/pages/auth/UserProfilePage/UserProfilePage';
import UserPage from './components/pages/main/UserPage/UserPage';
import HomePage from './components/pages/main/HomePage/HomePage';
import AboutPage from './components/pages/AboutPage/AboutPage';
import ClassPage from './components/pages/main/ClassPage/ClassPage';
import NotFoundPage from './components/pages/NotFoundPage';
import HomeworkPage from './components/pages/main/HomeworkPage/HomeworkPage';
import ExamsPage from './components/pages/main/ExamsPage/ExamsPage';
import ClassSettings from './components/pages/class/ClassSettingsPage/ClassSettings';
import LoginOptionsPage from './components/pages/user/LoginOptionsPage';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path={Routes.HOME} component={HomePage} />

            <Route exact path={Routes.LOGIN} component={LoginPage} />
            <Route exact path={Routes.ABOUT} component={AboutPage} />
            {/* <Route exact path={Routes.ADMIN_CONSOLE} component={} /> */}

            <Route exact path={Routes.CLASS} component={ClassPage} />
            {/* <Route path={Routes.CLASS_CREATE} component={} /> */}
            {/* <Route path={Routes.CLASS_JOIN} component={} /> */}
            <Route path={Routes.CLASS_SETTINGS} component={ClassSettings} />

            <Route exact path={Routes.HOMEWORK} component={HomeworkPage} />
            {/* <Route path={Routes.HOMEWORK_ADD} component={} /> */}

            <Route exact path={Routes.EXAMS} component={ExamsPage} />
            {/* <Route path={Routes.EXAMS_ADD} component={} /> */}

            <Route exact path={Routes.USER} component={UserPage} />
            <Route path={Routes.USER_PROFILE} component={UserProfilePage} />

            <Route path={Routes.LOGIN_OPTIONS} component={LoginOptionsPage} />

            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App