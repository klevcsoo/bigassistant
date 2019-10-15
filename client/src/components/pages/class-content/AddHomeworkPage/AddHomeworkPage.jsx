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

  render() {
    return (
      <SaveablePageLayout onSave={this.saveHomework}>
        <AppSubtitle text="Előnézet:" />
        <AppCardClassContent type="homework" {...this.state.currentHomework} />
        <AppSubtitle text="Beállítások:" />
        <div>
          <AppInput placeholder="Házi feladat címe" text={this.state.currentHomework.title} onTextChanged={} />
        </div>
      </SaveablePageLayout>
    )
  }
}

export default AddHomeworkPage
