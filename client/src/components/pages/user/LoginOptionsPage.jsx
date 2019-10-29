import React, { Component } from 'react'
import FirebaseHandler from '../../../utils/FirebaseHandler'
import AppColours from '../../../constants/appColors'
import { Helmet } from 'react-helmet'
// Components
import AppTitle from '../../AppTitle'
import AppSubtitle from '../../AppSubtitle'
import LoadingSpinner from '../../LoadingSpinner'
import AppBackButton from '../../AppButton/AppBackButton'

export class LoginOptionsPage extends Component {
  state = {
    loggedInWith: null
  }

  componentDidMount() {
    
    FirebaseHandler.getApp().auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loggedInWith: user.providerData[0].providerId
        });
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <meta name="theme-color" content={AppColours.BACKGROUND} />
        </Helmet>
        <div style={{
          position: 'fixed',
          top: 0, left: 0,
          bottom: 0, right: 0,
          overflow: 'hidden'
        }}>
          <AppBackButton history={this.props.history} />
          <div style={{
            width: '80vh',
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)'
          }}>
            <AppSubtitle text="Bejelentkezve a következővel:" />
            {!this.state.loggedInWith ? <LoadingSpinner /> :
              this.state.loggedInWith === 'facebook.com' ? (
                <div>
                  <a href="https://www.facebook.com" style={{ color: AppColours.FACEBOOK }}><AppTitle text="Facebook" /></a>
                </div>
              ) : (
                <div>
                  <a href="https://www.google.com" style={{ color: AppColours.TEXT }}><AppTitle text="Google" /></a>
                </div>
              )
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default LoginOptionsPage
