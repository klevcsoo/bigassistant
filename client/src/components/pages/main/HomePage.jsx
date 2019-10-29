import React, { Component } from 'react'
import Routes from '../../../constants/routes'
import { version } from '../../../constants/appInfo'
import AppColours from '../../../constants/appColors'
import { Zoom } from '@material-ui/core'

// Components
import MainPageLayout from '../../layout/MainPageLayout'
import AppDivider from '../../AppDivider'
import AppButton from '../../AppButton/AppButton'
import AppCard from '../../AppCard/AppCard'
import AppTitle from '../../AppTitle'
import AppSubtitle from '../../AppSubtitle'
import AppSwitch from '../../AppSwitch/AppSwitch'

export class HomePage extends Component {
  state = {
    infoOpen: false
  }

  render() {
    return (
      <MainPageLayout pageTitle="Áttekintés" pageActive="home" history={this.props.history}>
        {!this.state.infoOpen ? null : (
          <Zoom in={this.state.infoOpen}>
            <div style={{
              width: 'auto', height: 'auto',
              position: 'fixed',
              top: 0, left: 0,
              bottom: 0, right: 0,
              background: '#ffffffdd'
            }} onClick={() => {this.setState({infoOpen: false})}}>
              <div style={{
                position: 'fixed',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                maxHeight: '80vh',
                borderRadius: 20,
                overflow: 'scroll'
              }}>
                <AppCard>
                  <p style={{
                    margin: 5,
                    fontSize: 18,
                    fontWeight: 300
                  }}>
                    Hát ez még nincs<span role="img" aria-label="emoji">🤷‍♀️</span>
                  </p>
                </AppCard>
              </div>
            </div>
          </Zoom>
        )}
        <AppTitle text="BIGAssistant" />
        <AppSubtitle text={`Beta.${version}`} />
        <AppButton text="Mi is ez az alkalmazás?" type="highlight" onClick={() => {this.setState({infoOpen: true})}} />
        <AppCard>
          <p style={{
            margin: 5,
            fontSize: 18,
            fontWeight: 300
          }}>
            A jelenlegi verzió egy még nem végleges, kiadás elött álló béta verzió.
            Az alkalmazás nagy mértékben tartamaz hibákat, hiányosságokat, de az alap funkciók
            helyén vannak, így biztosítva az alkalmazás alap szintü mükodését.
            <br/><br/>
            Minden visszajelzés hasznos, szóval ha szeretnél hibát jelenteni, akkor kb. mindenhol
            @klevcsoo néven találsz meg.
            <br/><br/>
            Rengeteg funkció érkezik még az alkalmazásba, ezek közé tartozik:
            <li>osztályképek jelentösége,</li>
            <li>osztályból kilépés, adminként az osztály törlése,</li>
            <li>telefonos értesítések,</li>
            <li>oldalak gyorsabb betöltése,</li>
            <li>és az én személyes kedvencem: a sötét mód.</li>
            <br/>
            Ha úgy gondolod, hogy szeretnél csatlakozni a projekthez fejlesztöként, értesz a Google
            Firebase-hez, React-hoz, az alap dolgokhoz mint pl. Git, illetve szeretsz csapatban dolgozni,
            akkor keress bátran, ugyan úgy, @klevcsoo.🤙
          </p>
        </AppCard>
        <AppDivider />
        {/* ----------DEBUG---------- */}
        <p style={{
          margin: 10,
          textAlign: 'center',
          fontSize: 18,
          fontWeight: 400,
          color: AppColours.WARNING_DARK
        }}>
          Az alábbi két gomb használata nem biztos, hogy a várt eredmény hozza,
          ha már tagja vagy egy osztálynak!
        </p>
        <AppButton text="Join class" onClick={() => {this.props.history.push(Routes.CLASS_JOIN)}} />
        <AppButton text="Create class" onClick={() => {this.props.history.push(Routes.CLASS_CREATE)}} />
        <AppSwitch text="Dark mode" onCheckedChanged={(checked) => {AppColours.setDarkModeEnabled(checked)}}
        checked={AppColours.getDarkModeEnabled()} description="Toggles dark mode" />
        {/* ----------DEBUG---------- */}
      </MainPageLayout>
    )
  }
}

export default HomePage
