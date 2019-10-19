import React, { Component } from 'react'
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import AppTitle from '../../../AppTitle';
import AppInput from '../../../AppInput/AppInput';
import AppButton from '../../../AppButton/AppButton';
import LoadingSpinner from '../../../LoadingSpinner';
import FirebaseHandler from '../../../../utils/FirebaseHandler';
import Routes from '../../../../constants/routes';
import AppColours from '../../../../constants/appColors';

export class ClassJoinPage extends Component {
  state = {
    inviteCode: '',
    joining: false,
    codeInvalid: false
  }

  joinClass = () => {
    this.setState({ joining: true });
    FirebaseHandler.callFunction('joinClass', { inviteCode: this.state.inviteCode }).then(() => {
      this.props.history.push(Routes.HOME);
    }).catch((err) => {
      console.log(err);
      this.setState({ codeInvalid: true, joining: false });
    });
  }

  render() {
    return (
      <React.Fragment>
        <button style={{
          width: 50, height: 50,
          background: 'transparent',
          border: 'none'
        }} onClick={() => {this.props.history.goBack()}}><ArrowBackRoundedIcon /></button>
        <div style={{
          width: 310,
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          <p style={{
            margin: 10, padding: 0,
            textAlign: 'center',
            fontSize: 100
          }}><span role="img" aria-label="hand">🤙</span></p>
          <AppTitle text="Csatlakozás egy osztályhoz" />
          <AppInput placeholder="Meghívókód" text={this.state.inviteCode}
          onTextChanged={(text) => {this.setState({ inviteCode: text, codeInvalid: false })}}
          style={{
            border: `2px solid ${this.state.codeInvalid ? AppColours.WARNING : 'transparent'}`
          }} />
          {!this.state.codeInvalid ? null : (
            <p style={{
              margin: 5,
              textAlign: 'center',
              color: AppColours.WARNING,
              fontSize: 16
            }}>Érvénytelen kód!</p>
          )}
          {this.state.joining ? <LoadingSpinner /> : (
            <AppButton type="highlight" text="Csatlakozás" onClick={this.joinClass} />
          )}
        </div>
      </React.Fragment>
    )
  }
}

export default ClassJoinPage
