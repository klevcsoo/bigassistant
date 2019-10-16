import React, { Component } from 'react'

// Components
import SaveablePageLayout from '../../../layout/SaveablePageLayout';
import AppSubtitle from '../../../AppSubtitle';
import AppCardClassContent from '../../../AppCard/AppCardClassContent';
import AppInput from '../../../AppInput/AppInput';

export class AddHomeworkPage extends Component {
  state = {
    currentHomework: {
      title: null,
      date: null,
      subject: null
    }
  }

  saveHomework = () =>  {

  }

  setTitle = (text) => {
    this.setState((state) => {
      state.currentHomework.title = text;
      return state;
    });
  }
  setDate = (date) => {
    this.setState((state) => {
      state.currentHomework.date = date;
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
      <SaveablePageLayout onSave={this.saveHomework}>
        <AppSubtitle text="Előnézet:" />
        <AppCardClassContent type="homework" {...this.state.currentHomework} />
        <AppSubtitle text="Beállítások:" />
        <div>
          <AppInput placeholder="Házi feladat címe" text={this.state.currentHomework.title}
          onTextChanged={(text) => {this.setTitle(text)}} />
          {/* TODO: Date picker */}
        </div>
      </SaveablePageLayout>
    )
  }
}

export default AddHomeworkPage
