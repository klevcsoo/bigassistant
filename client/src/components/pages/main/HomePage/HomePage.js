import React, { Component } from 'react'
import PageNavbar from '../../../layout/PageNavbar/PageNavbar'
import AppPopup from '../../../AppPopup/AppPopup'
import PageTitle from '../../../layout/PageTitle/PageTitle'
import LoadingSpinner from '../../../LoadingSpinner'
import AppSubtitle from '../../../AppSubtitle'
import MainPageLayout from '../../../layout/MainPageLayout'

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
      </MainPageLayout>
    )
  }
}

export default HomePage
