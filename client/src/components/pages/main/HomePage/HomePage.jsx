import React, { Component } from 'react'
import AppPopup from '../../../AppPopup/AppPopup'
import LoadingSpinner from '../../../LoadingSpinner'
import AppSubtitle from '../../../AppSubtitle'
import MainPageLayout from '../../../layout/MainPageLayout'
import AppDivider from '../../../AppDivider'
import AppButton from '../../../AppButton/AppButton'
import Routes from '../../../../constants/routes'

export class HomePage extends Component {
  state = {
    popupVisible: false,
    popupMessage: ''
  }

  render() {
    return (
      <MainPageLayout pageTitle="Áttekintés" pageActive="home" history={this.props.history}>
        {this.state.popupVisible ? <AppPopup message={this.state.popupMessage} onClose={this.hidePopup} /> : null }
        <LoadingSpinner />
        <AppSubtitle text="Nem tolt semmit csak forog" />
        <AppDivider />
        {/* ----------DEBUG---------- */}
        <AppButton text="Join class" onClick={() => {this.props.history.push(Routes.CLASS_JOIN)}} />
        <AppButton text="Create class" onClick={() => {this.props.history.push(Routes.CLASS_CREATE)}} />
        {/* ----------DEBUG---------- */}
      </MainPageLayout>
    )
  }
}

export default HomePage
