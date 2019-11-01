import React, { Component } from 'react'
import FirebaseHandler from '../../../../utils/FirebaseHandler'
import './LoginPage.css'

// Components
import AppPopup from '../../../AppPopup/AppPopup'
import AppTitle from '../../../AppTitle'
import AppButton from '../../../AppButton/AppButton'
import LoadingSpinner from '../../../LoadingSpinner'
import AuthContinue from './AuthContinue'
import AppColours from '../../../../constants/appColors'
import { Helmet } from 'react-helmet';

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

  createBackground = () => {
    const nOfStars = 20;
    const maxAnimDuration = 10; // seconds

    let stars = [];
    for (let i = 0; i < nOfStars; i++) {
      stars.push((
        <div className="p" style={{
          animationDuration: `${Math.floor(Math.random() * maxAnimDuration)}s`,
          top: `${Math.floor(Math.random() * 100)}%`
        }} key={Math.random().toString()}></div>
      ));
    }

    return stars;
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
        <Helmet>
          <meta name="theme-color" content={AppColours.BACKGROUND} />
        </Helmet>
        {this.state.popupVisible ? <AppPopup message={this.state.popupMessage} onClose={this.hidePopup} /> : null }

        <div className="login-main-container" style={{ backgroundColor: AppColours.BACKGROUND }}>
          <div>{this.createBackground()}</div>
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
      </div>
      </React.Fragment>
    )
  }
}

export default LoginPage
