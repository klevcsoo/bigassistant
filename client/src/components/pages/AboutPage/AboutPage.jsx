import React, { Component } from 'react'
import './AboutPage.css'
import AppColours from '../../../constants/appColors'
import { version } from '../../../constants/appInfo'

// Components
import AppPopup from '../../AppPopup/AppPopup'
import PageTitle from '../../layout/PageTitle/PageTitle'
import ParallaxHeaderImage from '../../layout/ParallaxHeaderImage'
import AppMenuButton from '../../AppButton/AppMenuButton'
import AppDivider from '../../AppDivider'
import AboutSocialMediaButtons from './AboutSocialMediaButtons'

export class AboutPage extends Component {
  state = {
    popupVisible: false,
    popupMessage: ''
  }

  openConsole = () => {
    this.props.history.push('/admin-console');
  }

  render() {
    return (
      <React.Fragment>
        {this.state.popupVisible ? <AppPopup message={this.state.popupMessage} onClose={this.hidePopup} /> : null }
        <PageTitle title="Információ" history={this.props.history} />
        <div>
          <ParallaxHeaderImage src="https://graph.facebook.com/172915553841122/picture?height=500" />
          <div style={{ height: '80vw' }}></div>
          <div>
            <h1 style={{
              margin: '10px auto',
              fontFamily: '"Rubik", sans-serif',
              fontWeight: 500,
              fontSize: '42px',
              textAlign: 'center'
            }}>Lajsz Keve</h1>
            <h2 style={{
              margin: 0, padding: 0,
              textAlign: 'center',
              fontSize: '20px', fontWeight: 300
            }}>Ez az ember csinálta vagymi</h2>
          </div>
          <div style={{ margin: '20px' }}>
            <AppMenuButton text="Facebookja amugy" facebook onClick={this.openFacebook} />
          </div>
          <AppDivider/>
          <AboutSocialMediaButtons/>
          <AppDivider/>
          <AppMenuButton text="Szuper titkos konzol" onClick={this.openConsole} />
          <AppDivider/>
          <p style={{
            color: AppColours.appColorDark,
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: 300
          }}>BIGAssistant {version}</p>
        </div>
      </React.Fragment>
    )
  }
}

export default AboutPage
