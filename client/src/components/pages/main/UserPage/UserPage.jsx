import React, { Component } from 'react'
import './UserPage.css'
import FirebaseHandler from '../../../../utils/FirebaseHandler'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from '../../../../constants/routes'

// Components
import LoadingSpinner from '../../../LoadingSpinner'
import UserProfileHeader from '../../../layout/UserProfileHeader'
import AppPopup from '../../../AppPopup/AppPopup'
import AppButton from '../../../AppButton/AppButton'
import AppDivider from '../../../AppDivider'
import AppCardButtonContainer from '../../../AppCard/AppCardButtonContainer'
import AppMenuButton from '../../../AppButton/AppMenuButton'
import AppCardUserClass from '../../../AppCard/AppCardUserClass'
import MainPageLayout from '../../../layout/MainPageLayout'

export class UserPage extends Component {
  state = {
    popupVisible: false,
    popupMessage: '',
    clientInfo: null
  }

  logout = () => {
    FirebaseHandler.logout();
    this.props.history.push(Routes.LOGIN);
  }

  componentDidMount() {
    FirebaseHandler.getClientInfo((result) => {
      this.setState({ clientInfo: result });
    });
  }

  render() {
    return (
      <MainPageLayout pageTitle="Profil" pageActive="user" history={this.props.history}>
        {this.state.popupVisible ? <AppPopup message={this.state.popupMessage} onClose={this.hidePopup} /> : null }
        
        {!this.state.clientInfo ? <LoadingSpinner/> : (
          <div>
            <UserProfileHeader photo={this.state.clientInfo.photo} name={this.state.clientInfo.name} />
            <AppButton type="warning" text="Kijelentkezés" onClick={this.logout} />
            <AppDivider/>
            <AppCardButtonContainer>
              <AppMenuButton text="Bejelentkezési adatok" onClick={() => {this.props.history.push(Routes.LOGIN_OPTIONS)}} />
              <AppMenuButton text="Értesítések" />
            </AppCardButtonContainer>
            <AppCardUserClass className={this.state.clientInfo.className} classRank={this.state.clientInfo.classRank} />
            <AppMenuButton text="Fiók törlése" onClick={() => {this.props.history.push(Routes.DELETE_ACCOUNT)}} />
            <Router>
              <div className="information-container">
                <AppDivider/>
                <h1 onClick={() => {this.props.history.push(Routes.ABOUT)}}>Információ</h1>
              </div>
            </Router>
          </div>
        )}
      </MainPageLayout>
    )
  }
}

export default UserPage
