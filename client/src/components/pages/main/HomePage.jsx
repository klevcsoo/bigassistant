import React from 'react'
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

const HomePage = ({ history }) => {
  return (
    <MainPageLayout pageTitle="Áttekintés" pageActive="home" history={history}>
      <AppTitle text="BIGAssistant" />
      <AppSubtitle text={`Beta.${version}`} />
      <AppButton text="Mi is ez az alkalmazás?" type="highlight" onClick={() => {history.push(Routes.ABOUT)}} />
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
        fontSize: 16,
        fontWeight: 400,
        color: AppColours.WARNING_DARK
      }}>
        The functions below are experimental, and are under testing. They may not work
        as you would expect them to. Use them at your own risk!
      </p>
      <AppButton text="Join class" onClick={() => {history.push(Routes.CLASS_JOIN)}} />
      <AppButton text="Create class" onClick={() => {history.push(Routes.CLASS_CREATE)}} />
      {/* ----------DEBUG---------- */}
    </MainPageLayout>
  )
}

export default HomePage
