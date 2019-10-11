import React, { Component } from 'react'
import PageNavbar from '../../../layout/PageNavbar/PageNavbar'
import AppPopup from '../../../AppPopup/AppPopup'
import PageTitle from '../../../layout/PageTitle/PageTitle'
import LoadingSpinner from '../../../LoadingSpinner'
import AppSubtitle from '../../../AppSubtitle'

export class HomePage extends Component {
  state = {
    popupVisible: false,
    popupMessage: ''
  }

  render() {
    return (
      <div>
        {this.state.popupVisible ? <AppPopup message={this.state.popupMessage} onClose={this.hidePopup} /> : null }
        <PageTitle title="Áttekintés" history={this.props.history} noBackButton />
        <PageNavbar active="home" history={this.props.history} />
        <LoadingSpinner />
        <AppSubtitle text="Nem tolt semmit csak forog" />

        <div style={{ height: '80px' }}></div>
      </div>
    )
  }
}

export default HomePage
