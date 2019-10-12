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

  render() {
    return (
      <MainPageLayout pageTitle="Osztály" pageActive="class" history={this.props.history}>
        {this.state.popupVisible ? <AppPopup message={this.state.popupMessage} onClose={this.hidePopup} /> : null }

        {!this.state.clientInfo || this.state.classmates.length === 0 ? <LoadingSpinner/> : (
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
            <AppDivider />
            <div>
              {this.state.classmates.map((classmate) => (
                <AppUserButton {...classmate} onClick={this.handleClassmateClick.bind(this, classmate.uid)} />)
              )}
            </div>
          </div>
        )}
      </MainPageLayout>
    )
  }
}

export default ClassPage
