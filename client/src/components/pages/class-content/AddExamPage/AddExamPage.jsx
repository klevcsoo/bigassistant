import React, { Component } from 'react'
import FirebaseHandler from '../../../../utils/FirebaseHandler';
import AppColours from '../../../../constants/appColors';
import 'date-fns'; import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';

// Components
import SaveablePageLayout from '../../../layout/SaveablePageLayout';
import AppSubtitle from '../../../AppSubtitle';
import AppCardClassContent from '../../../AppCard/AppCardClassContent';
import AppInput from '../../../AppInput/AppInput';
import LoadingSpinner from '../../../LoadingSpinner';
import AppPopup from '../../../AppPopup/AppPopup';
import AppClassSubjectsDropDown from '../../../AppDropDown/AppClassSubjectsDropDown';

export class AddExamPage extends Component {
  state = {
    currentExam: {
      title: '',
      date: new Date().getTime(),
      subject: null
    },
    addingExam: false,
    addedExam: false,
    popupVisible: false,
    popupMessage: ''
  }

  saveExam = () => {
    this.setState({ addingExam: true });
    FirebaseHandler.callFunction('addContentToClass', {
      typeOf: 'exams',
      content: this.state.currentExam
    }).then(() => {
      this.setState({ addedExam: true }, () => {
        this.displayPopup('Dolgozat hozzáadva!');
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
    if (this.state.addedExam) this.props.history.goBack();
    else {
      this.setState({
        popupVisible: false,
        popupMessage: '',
        addingExam: false
      });
    }
  }

  setTitle = (text) => {
    this.setState((state) => {
      state.currentExam.title = text;
      return state;
    });
  }
  setDate = (date) => {
    this.setState((state) => {
      state.currentExam.date = new Date(date).getTime();
      return state;
    });
  }
  setSubject = (subject) => {
    this.setState((state) => {
      state.currentExam.subject = subject;
      return state;
    });
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.addingExam ? null : (
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
        <SaveablePageLayout onSave={this.saveExam} pageTitle="Dolgozat" pageType="exam"
        history={this.props.history} buttonText="Hozzáadás">
          {this.state.popupVisible ? <AppPopup message={this.state.popupMessage} onClose={this.closePopup} /> : null}
          <AppSubtitle text="Előnézet:" />
          <AppCardClassContent type="exam" {...this.state.currentExam} />
          <AppSubtitle text="Beállítások:" />
          <div>
            <AppInput placeholder="Dolgozat címe" text={this.state.currentExam.title}
            onTextChanged={(text) => {this.setTitle(text)}} />
            <div style={{
              width: 'fit-content',
              margin: '5px auto',
              color: AppColours.HOMEWORK
            }}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker margin="normal" label="Dolgozat dátuma" format="yyyy. MMMM dd."
                value={this.state.currentExam.date} onChange={this.setDate} inputVariant="outlined"
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

export default AddExamPage
