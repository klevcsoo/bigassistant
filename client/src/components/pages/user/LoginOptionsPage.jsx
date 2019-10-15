import React, { Component } from 'react'
import AppTitle from '../../AppTitle'
import AppSubtitle from '../../AppSubtitle'
import LoadingSpinner from '../../LoadingSpinner'
import AppColours from '../../../constants/appColors'
import FirebaseHandler from '../../../utils/FirebaseHandler'

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
        <div style={{ height: 40 }}></div>
        <div>
          <AppSubtitle text="Bejelentkezve a következővel:" />
          {!this.state.loggedInWith ? <LoadingSpinner /> :
            this.state.loggedInWith === 'facebook.com' ? (
              <div>
                <a href="https://www.facebook.com" style={{ color: AppColours.FACEBOOK }}><AppTitle text="Facebook" /></a>
              </div>
            ) : (
              <div>
                <a href="https://www.google.com" style={{ color: 'black' }}><AppTitle text="Google" /></a>
              </div>
            )
          }
        </div>
        <div style={{ height: 40 }}></div>
      </React.Fragment>
    )
  }
}

export default LoginOptionsPage
