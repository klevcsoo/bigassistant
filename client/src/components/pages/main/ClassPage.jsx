import React, { Component } from 'react';
import FirebaseHandler from '../../../utils/FirebaseHandler';
import Routes from '../../../constants/routes';
import { Spring } from 'react-spring/renderprops';

// Components
import LoadingSpinner from '../../LoadingSpinner';
import AppPopup from '../../AppPopup/AppPopup';
import AppDivider from '../../AppDivider';
import AppButton from '../../AppButton/AppButton';
import AppUserButton from '../../AppButton/AppUserButton';
import MainPageLayout from '../../layout/MainPageLayout';
import AppSubtitle from '../../AppSubtitle';

export class ClassPage extends Component {
  state = {
    popupVisible: false,
    popupMessage: '',
    clientInfo: null,
    classmates: [],
    inviteCode: null,
    leavingClass: false
  }

  leaveClass = () => {
    this.setState({ leavingClass: true });
    FirebaseHandler.callFunction('leaveClass', {}).then(() => {
      this.props.history.push(Routes.HOME);
    });
  }

  componentDidMount() {
    FirebaseHandler.getClientInfo((result) => {
      this.setState({ clientInfo: result });
      FirebaseHandler.readDataContinuously(`/classes/${this.state.clientInfo.classId}/members`, (snapshot) => {
        this.setState({ classmates: [] });
        snapshot.forEach((memberSnapshot) => {
          let uid = memberSnapshot.val();
          FirebaseHandler.callFunction('getUserInfo', { uid: uid }).then((userInfo) => {
            let user = userInfo.data;
            user.uid = uid;
            this.setState(state => {
              let updatedState = state;
              updatedState.classmates.push(user);
              return updatedState;
            });
          });
        });
      });

      FirebaseHandler.readData(`/classes/${this.state.clientInfo.classId}/metadata/inviteCode`, (snapshot) => {
        this.setState({ inviteCode: snapshot.val() });
      });
    });
  }

  componentWillUnmount() {
    if (this.state.clientInfo) {
      FirebaseHandler.removeDataListener(`/classes/${this.state.clientInfo.classId}/members`);
    } else console.log('No listener attached.');
  }

  render() {
    return (
      <MainPageLayout pageTitle="Osztály" pageActive="class" history={this.props.history}>
        {this.state.popupVisible ? <AppPopup message={this.state.popupMessage} onClose={this.hidePopup} /> : null }
        {!this.state.clientInfo ? <LoadingSpinner /> : !this.state.clientInfo.classId ? (
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)'
          }}>
            <p style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 300
            }}>Nem vagy tagja egy osztálynak sem<span role="img" aria-label="emoji">🤨</span></p>
          </div>
        ) : (
          <div>
            <div>
              <h3 style={{
                margin: 0, padding: 0,
                textAlign: 'center',
                fontWeight: 300, fontSize: '20px'
              }}>Meghívó kód: <span style={{ fontWeight: 400 }}>{this.state.inviteCode}</span></h3>
            </div>
            <AppDivider/>
            <AppButton type="highlight" text="Órarend" />
            {this.state.clientInfo.classRank === 'admin' ? (
              <AppButton text="Osztály beállítások" onClick={() => {this.props.history.push(Routes.CLASS_SETTINGS)}} />
            ) : this.state.leavingClass ? <LoadingSpinner /> : (
              <AppButton type="warning" text="Kilépés az osztályból" onClick={this.leaveClass} />
            )}
            <AppDivider />
            <AppSubtitle text="Osztály tagjai:" />
            {this.state.classmates.length === 0 ? <LoadingSpinner/> : (
              <div>
                {this.state.classmates.map((classmate) => (
                  <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} key={classmate.uid}>
                    {(props) => (
                      <div style={props}>
                        <AppUserButton {...classmate} onClick={() => {
                          this.props.history.push(`${Routes.USER}/${classmate.uid}`)
                        }} />
                      </div>
                    )}
                  </Spring>
                ))}
              </div>
            )}
          </div>
        )}
      </MainPageLayout>
    )
  }
}

export default ClassPage
