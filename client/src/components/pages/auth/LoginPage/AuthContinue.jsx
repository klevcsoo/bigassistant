import React, { Component } from 'react'
import FirebaseHandler from '../../../../FirebaseHandler'
import AppUserButton from '../../../AppButton/AppUserButton';

export class AuthContinue extends Component {
  state = {
    profilePic: `${FirebaseHandler.getUser().photoURL}?height=500`,
    name: FirebaseHandler.getUser().displayName
  }

  render() {
    return (
      <React.Fragment>
        <AppUserButton photoUrl={this.state.profilePic} name={this.state.name} onClick={this.props.onContinue} />
      </React.Fragment>
    )
  }
}

export default AuthContinue
