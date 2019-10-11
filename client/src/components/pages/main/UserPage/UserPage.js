import React, { Component } from 'react'
import './UserPage.css'
import FirebaseHandler from '../../../../FirebaseHandler'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import Routes from '../../../../constants/routes'

// Components
import LoadingSpinner from '../../../LoadingSpinner'
import UserProfileHeader from '../../../layout/UserProfileHeader'
import AppPopup from '../../../AppPopup/AppPopup'
import AppButton from '../../../AppButton/AppButton'
import AppDivider from '../../../AppDivider'
import AppCardButtonContainer from '../../../AppCard/AppCardButtonContainer'
import PageTitle from '../../../layout/PageTitle/PageTitle'
import PageNavbar from '../../../layout/PageNavbar/PageNavbar'
import AppMenuButton from '../../../AppButton/AppMenuButton'
import AppCardUserClass from '../../../AppCard/AppCardUserClass'

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

  openAboutPage = () => {
    this.props.history.push(Routes.ABOUT);
  }

  componentDidMount() {
    FirebaseHandler.getClientInfo((result) => {
      this.setState({ clientInfo: result });
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.popupVisible ? <AppPopup message={this.state.popupMessage} onClose={this.hidePopup} /> : null }
        <PageTitle title="Profil" history={this.props.history} />
        <PageNavbar active="user" history={this.props.history} />
        
        {!this.state.clientInfo ? <LoadingSpinner/> : (
          <div>
            <UserProfileHeader photo={this.state.clientInfo.photo} name={this.state.clientInfo.name} />
            <AppButton type="warning" text="Kijelentkezés" onClick={this.logout} />
            <AppDivider/>
            <AppCardButtonContainer>
              <AppMenuButton text="Bejelentkezési adatok" />
              <AppMenuButton text="Értesítések" />
            </AppCardButtonContainer>
            <AppCardUserClass className={this.state.clientInfo.className} classRank={this.state.clientInfo.classRank} />
            <AppMenuButton text="Fiók törlése" />
            <Router>
              <div className="information-container">
                <AppDivider/>
                <Router><Link onClick={this.openAboutPage}><h1>Információ</h1></Link></Router>
              </div>
            </Router>
            <div style={{ height: '80px' }}></div>
          </div>
        )}
      </React.Fragment>
    )
  }
}

export default UserPage
