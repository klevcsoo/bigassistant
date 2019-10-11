import React, { Component } from 'react'
import Routes from '../../../../constants/routes'

// Components
import MainPageLayout from '../../../layout/MainPageLayout'
import AppPopup from '../../../AppPopup/AppPopup'
import AppButton from '../../../AppButton/AppButton'
import AppDivider from '../../../AppDivider'

export class HomeworkPage extends Component {
  state = {
    popupVisible: false,
    popupMessage: ''
  }

  render() {
    return (
      <MainPageLayout pageTitle="Házi feladat" pageActive="homework" history={this.props.history}>
        {this.state.popupVisible ? <AppPopup message={this.state.popupMessage} onClose={this.hidePopup} /> : null }
        <AppButton type="homework" text="Hozzáadás" onClick={() => {this.props.history.push(Routes.HOMEWORK_ADD)}} />
        <AppDivider />
        <div></div>
      </MainPageLayout>
    )
  }
}

export default HomeworkPage
