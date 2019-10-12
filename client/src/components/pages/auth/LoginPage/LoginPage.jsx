import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import Routes from '../../../../constants/routes'
import FirebaseHandler from '../../../../FirebaseHandler'
import './LoginPage.css'

// Components
import AppPopup from '../../../AppPopup/AppPopup'
import AppTitle from '../../../AppTitle'
import AppButton from '../../../AppButton/AppButton'
import AppDivider from '../../../AppDivider'
import LoadingSpinner from '../../../LoadingSpinner'
import AuthContinue from './AuthContinue'

export class LoginPage extends Component {
  state = {
    loading: false,
    popupVisible: false,
    popupMessage: '',
    authLoading: true,
    authCanContinue: false
  }

  showPopup = (message) => {
    this.setState({ popupVisible: true, popupMessage: message });
  }
  hidePopup = () => {
    this.setState({ popupVisible: false, popupMessage: '' });
  }

  startLoading = () => {
    this.setState({ loading: true });
  }
  stopLoading = () => {
    this.setState({ loading: false });
  }

  loginWithFacebook = () => {
    this.startLoading();
    FirebaseHandler.loginWithFacebook();
  }
  loginWithGoogle = () => {
    this.startLoading();
    FirebaseHandler.loginWithGoogle();
  }

  continueToApp = () => {
    this.props.history.push('/');
  }

  componentDidMount() {
    FirebaseHandler.getApp().auth().onAuthStateChanged((user) => {
      this.setState({
        authLoading: false,
        authCanContinue: !!user
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.popupVisible ? <AppPopup message={this.state.popupMessage} onClose={this.hidePopup} /> : null }

        <div className="login-main-container">
          <div className="login-background-mask"></div>
          <div className="login-methods-container">
              <AppTitle text="BIGAssistant" />
              {this.state.authLoading ? <LoadingSpinner static /> :
                (this.state.authCanContinue ?
                  <AuthContinue onContinue={this.continueToApp} /> :
                  <React.Fragment>
                    <AppButton text="Bejelentkezés Facebook-al" onClick={this.loginWithFacebook} facebook />
                    <AppButton text="Bejelentkezés Google-el" onClick={this.loginWithGoogle} />
                  </React.Fragment>
                )
              }
          </div>
          <div className="login-information-container">
              <AppDivider/>
              <Router><Link to={Routes.ABOUT}><h1>Információ</h1></Link></Router>
          </div>
      </div>
      </React.Fragment>
    )
  }
}

export default LoginPage
