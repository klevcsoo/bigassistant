import React, { Component } from 'react'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import 'date-fns'; import DateFnsUtils from '@date-io/date-fns'
import AppColours from '../../../../constants/appColors';

// Components
import SaveablePageLayout from '../../../layout/SaveablePageLayout';
import AppSubtitle from '../../../AppSubtitle';
import AppCardClassContent from '../../../AppCard/AppCardClassContent';
import AppInput from '../../../AppInput/AppInput';
import AppDropDown from '../../../AppDropDown/AppDropDown';
import AppClassSubjectsDropDown from '../../../AppDropDown/AppClassSubjectsDropDown';
import FirebaseHandler from '../../../../utils/FirebaseHandler';
import LoadingSpinner from '../../../LoadingSpinner';
import AppPopup from '../../../AppPopup/AppPopup';

export class AddHomeworkPage extends Component {
  state = {
    currentHomework: {
      title: '',
      date: new Date().getTime(),
      subject: null
    },
    addingHomework: false,
    addedHomework: false,
    popupVisible: false,
    popupMessage: ''
  }

  saveHomework = () =>  {
    this.setState({ addingHomework: true });
    FirebaseHandler.callFunction('addContentToClass', {
      typeOf: 'homework',
      content: this.state.currentHomework
    }).then(() => {
      this.setState({ addedHomework: true }, () => {
        this.displayPopup('Házi feladat hozzáadva!');
      });
    }).catch((err) => {
      console.log(err);
      this.displayPopup(`Sikertelen hozzáadás! Hibaüzenet: ${err}`);
    });
  }

  displayPopup = (message) => {
    this.setState({
      popupMessage: message,
      popupVisible: true
    })
  }
  closePopup = () => {
    if (this.state.addedHomework) this.props.history.goBack();
    else {
      this.setState({
        popupVisible: false,
        popupMessage: '',
        addingHomework: false
      });
    }
  }

  setTitle = (text) => {
    this.setState((state) => {
      state.currentHomework.title = text;
      return state;
    });
  }
  setDate = (date) => {
    this.setState((state) => {
      state.currentHomework.date = new Date(date).getTime();
      return state;
    });
  }
  setSubject = (subject) => {
    this.setState((state) => {
      state.currentHomework.subject = subject;
      return state;
    });
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.addingHomework ? null : (
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
        <SaveablePageLayout onSave={this.saveHomework} pageTitle="Házi feladat" pageType="homework"
        history={this.props.history} buttonText="Hozzáadás">
          {this.state.popupVisible ? <AppPopup message={this.state.popupMessage} onClose={this.closePopup} /> : null}
          <AppSubtitle text="Előnézet:" />
          <AppCardClassContent type="homework" {...this.state.currentHomework} />
          <AppSubtitle text="Beállítások:" />
          <div>
            <AppInput placeholder="Házi feladat címe" text={this.state.currentHomework.title}
            onTextChanged={(text) => {this.setTitle(text)}} />
            <div style={{
              width: 'fit-content',
              margin: '5px auto',
              color: AppColours.HOMEWORK
            }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker margin="normal" label="Házi feladat dátuma" format="yyyy. MMMM dd."
              value={this.state.currentHomework.date} onChange={this.setDate} inputVariant="outlined"
              style={{ width: 290 }} />
            </MuiPickersUtilsProvider>
            </div>
            <AppClassSubjectsDropDown onSubjectChoosen={(subject) => {this.setSubject(subject)}} />
          </div>
        </SaveablePageLayout>
      </React.Fragment>
    )
  }
}

export default AddHomeworkPage
