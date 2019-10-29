import React, { Component } from 'react'
import FirebaseHandler from '../../../utils/FirebaseHandler'
import Routes from '../../../constants/routes'
import { Helmet } from 'react-helmet';
import AppColours from '../../../constants/appColors';

// Components
import AppPopup from '../../AppPopup/AppPopup';
import LoadingSpinner from '../../LoadingSpinner';
import UserProfileHeader from '../../layout/UserProfileHeader';
import AppDivider from '../../AppDivider';
import AppCardUserClass from '../../AppCard/AppCardUserClass';
import AppMenuButton from '../../AppButton/AppMenuButton';
import AppBackButton from '../../AppButton/AppBackButton';

export class UserProfilePage extends Component {
  state = {
    popupVisible: false,
    popupMessage: '',
    userInfo: null
  }

  urlParams = this.props.match.params;

  showPopup = (message) => {
    this.setState({ popupVisible: true, popupMessage: message });
  }
  hidePopup = () => {
    this.setState({ popupVisible: false, popupMessage: '' });
  }

  openFacebookProfile = () => {
    let id = this.state.userInfo.facebookId
    // TODO: Fix
    window.location.href = `https://www.facebook.com/app_scoped_user_id/${id}`;
  }

  componentDidMount() {
    let uid = this.urlParams.uid;
    FirebaseHandler.callFunction('getUserInfo', { uid: uid }).then((result) => {
      this.setState({ userInfo: result.data });
    }).catch(() => {
      this.props.history.push(Routes.USER);
    });
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <meta name="theme-color" content={AppColours.BACKGROUND} />
        </Helmet>
        {this.state.popupVisible ? <AppPopup message={this.state.popupMessage} onClose={this.hidePopup} /> : null }
        <AppBackButton history={this.props.history} />
        <div style={{ height: 20 }}></div>
        {!this.state.userInfo ? <LoadingSpinner/> : (
          <div>
            <UserProfileHeader photo={this.state.userInfo.photo} name={this.state.userInfo.name} />
            <AppDivider/>
            {!this.state.userInfo.className ? null : (
              <React.Fragment>
                <AppCardUserClass className={this.state.userInfo.className} classRank={this.state.userInfo.classRank} />
              </React.Fragment>
            )}
            {!this.state.userInfo.facebookId ? null : (
              <AppMenuButton facebook text="Facebook profil" onClick={this.openFacebookProfile} />
            )}
            <AppDivider/>
            <p style={{
              textAlign: 'center',
              fontSize: '16px',
              fontWeight: 300
            }}>Csatlakozott: {this.state.userInfo.joinedAt}</p>
          </div>
        )}
      </React.Fragment>
    )
  }
}

export default UserProfilePage
