import React, { Component } from 'react'
import FirebaseHandler from '../../../utils/FirebaseHandler';
import Routes from '../../../constants/routes';
import AppColours from '../../../constants/appColors';
import { Helmet } from 'react-helmet';

// Components
import AppTitle from '../../AppTitle';
import AppInput from '../../AppInput/AppInput';
import AppButton from '../../AppButton/AppButton';
import LoadingSpinner from '../../LoadingSpinner';
import AppBackButton from '../../AppButton/AppBackButton';
import UserProfileHeader from './../../layout/UserProfileHeader';

export class ClassJoinPage extends Component {
  state = {
    inviteCode: '',
    joining: false,
    gettingClass: false,
    classPreview: null,
    codeInvalid: false
  }

  getPreview = () => {
    this.setState({ gettingClass: true });
    FirebaseHandler.callFunction('getClassPreview', {
      inviteCode: this.state.inviteCode
    }).then((result) => {
      this.setState({
        classPreview: result.data,
        gettingClass: false
      });
    }).catch((err) => {
      console.log(err);
      this.setState({ codeInvalid: true, gettingClass: false });
    });
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
        <Helmet>
          <meta name="theme-color" content={AppColours.BACKGROUND} />
        </Helmet>
        <AppBackButton history={this.props.history} />
        <div style={{
          width: '100vw',
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          {this.state.classPreview ? (
            <div>
              <UserProfileHeader {...this.state.classPreview} />
            </div>
          ) : (
            <div>
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
            </div>
          )}
          {this.state.joining || this.state.gettingClass ? <LoadingSpinner /> : (
            <AppButton type="highlight" text="Csatlakozás" onClick={() =>{
              if (this.state.classPreview) this.joinClass();
              else this.getPreview();
            }} />
          )}
        </div>
      </React.Fragment>
    )
  }
}

export default ClassJoinPage
