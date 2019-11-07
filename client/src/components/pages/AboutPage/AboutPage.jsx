import React from 'react'
import './AboutPage.css'
import AppColours from '../../../constants/AppColours'
import { version } from '../../../constants/AppInfo'

// Components
import PageTitle from '../../layout/PageTitle/PageTitle'
import ParallaxHeaderImage from '../../layout/ParallaxHeaderImage'
import AppMenuButton from '../../AppButton/AppMenuButton'
import AppDivider from '../../AppDivider'
import AboutSocialMediaButtons from './AboutSocialMediaButtons'

const AboutPage = ({ history }) => {
  return (
    <div>
      <React.Fragment>
        <PageTitle title="Információ" history={history} />
        <div>
          <ParallaxHeaderImage src="https://graph.facebook.com/172915553841122/picture?height=500" header />
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
            <AppMenuButton text="Facebookja amugy" facebook />
          </div>
          <AppDivider/>
          <AboutSocialMediaButtons/>
          <AppDivider/>
          <AppMenuButton text="Szuper titkos konzol" />
          <AppDivider/>
          <p style={{
            color: AppColours.appColorDark,
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: 300
          }}>BIGAssistant {version}</p>
        </div>
      </React.Fragment>
    </div>
  )
}

export default AboutPage
