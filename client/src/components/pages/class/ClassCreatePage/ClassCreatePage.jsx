import React, { Component } from 'react'
import AppColours from '../../../../constants/appColors'
import FirebaseHandler from '../../../../utils/FirebaseHandler'

// Components
import SaveablePageLayout from '../../../layout/SaveablePageLayout'
import UserProfileHeader from '../../../layout/UserProfileHeader'
import AppDivider from '../../../AppDivider'
import AppInput from '../../../AppInput/AppInput'
import AppSwitch from '../../../AppSwitch/AppSwitch'
import LoadingSpinner from '../../../LoadingSpinner'
import AppPopup from '../../../AppPopup/AppPopup'

export class ClassCreatePage extends Component {
  state = {
    classInfo: {
      name: 'Osztály',
      photo: 'https://firebasestorage.googleapis.com/v0/b/bigassistant-dev.appspot.com/o/def-class-pic.png?alt=media&token=057b7534-0c9c-4280-aa91-1d9bf5fb96f1',
      closed: false
    },
    addingClass: false,
    addedClass: false,
    popupVisible: false,
    popupMessage: ''
  }

  displayPopup = (message) => {
    this.setState({
      popupMessage: message,
      popupVisible: true
    })
  }
  closePopup = () => {
    if (this.state.addedClass) this.props.history.goBack();
    else {
      this.setState({
        popupVisible: false,
        popupMessage: '',
        addedClass: false
      });
    }
  }

  createClass = () => {
    this.setState({ addingClass: true });
    FirebaseHandler.callFunction('joinClass', this.state.classInfo).then(() => {
      this.setState({ addedClass: true }, () => {
        this.displayPopup('Osztály létrehozva!');
      });
    }).catch((err) => {
      console.log(err);
      this.displayPopup(`Sikertelen létrehozás! Hibaüzenet: ${err}`);
    });
  }

  render() {
    return (
      <SaveablePageLayout pageTitle="Osztály létrehozása" buttonText="Létrehozás"
      history={this.props.history} onSave={this.createClass}>
        {!this.state.addingClass ? null : (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, bottom: 0, right: 0,
            zIndex: 90,
            background: AppColours.SHADOW
          }}><div style={{
            position: 'fixed',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)'
          }}><LoadingSpinner /></div></div>
        )}
        {this.state.popupVisible ? <AppPopup message={this.state.popupMessage} onClose={this.closePopup} /> : null}
        <UserProfileHeader {...this.state.classInfo} />
        <AppDivider />
        <AppInput placeholder="Osztály neve" text={this.state.classInfo.name} onTextChanged={(text) => {
          this.setState((state) => {
            state.classInfo.name = text || 'Osztály';
            return state;
          })
        }} maxLength={20} />
        <AppSwitch text="Zárt osztály" description="Meghívókód használatával is engedély kell a csatlakozáshoz."
        checked={this.state.classInfo.closed} onCheckedChanged={(checked) => {
          this.setState((state) => {
            state.classInfo.closed = checked;
            return state;
          })
        }} />
        <AppInput placeholder="Kép link" text={this.state.classInfo.photo} onTextChanged={(text) => {
          this.setState((state) => {
            state.classInfo.photo = text;
            return state;
          })
        }} />
      </SaveablePageLayout>
    )
  }
}

export default ClassCreatePage
