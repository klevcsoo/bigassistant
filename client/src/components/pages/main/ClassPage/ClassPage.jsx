import React, { Component } from 'react';
import './ClassPage.css';
import FirebaseHandler from '../../../../utils/FirebaseHandler';
import Routes from '../../../../constants/routes';

// Components
import LoadingSpinner from '../../../LoadingSpinner';
import AppPopup from '../../../AppPopup/AppPopup';
import AppDivider from '../../../AppDivider';
import AppButton from '../../../AppButton/AppButton';
import AppUserButton from '../../../AppButton/AppUserButton';
import MainPageLayout from '../../../layout/MainPageLayout';
import AppSubtitle from '../../../AppSubtitle';

export class ClassPage extends Component {
  state = {
    popupVisible: false,
    popupMessage: '',
    clientInfo: null,
    classmates: [],
    inviteCode: null
  }

  handleClassmateClick = (uid) => {
    this.props.history.push(`${Routes.USER}/${uid}`);
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
            }}>Nem vagy tagja egy osztálynak sem🤨</p>
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
            <AppButton text="Osztály beállítások" onClick={() => {this.props.history.push(Routes.CLASS_SETTINGS)}} />
            <AppDivider />
            <AppSubtitle text="Osztály tagjai:" />
            {this.state.classmates.length === 0 ? <LoadingSpinner/> : (
              <div>
                {this.state.classmates.map((classmate) => (
                  <AppUserButton {...classmate} key={classmate.uid} onClick={this.handleClassmateClick.bind(this, classmate.uid)} />)
                )}
              </div>
            )}
          </div>
        )}
      </MainPageLayout>
    )
  }
}

export default ClassPage
