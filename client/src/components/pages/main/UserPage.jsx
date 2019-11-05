import React from 'react'
import { useClientInfo } from '../../../utils/AppHooks'
import FirebaseHandler from '../../../utils/FirebaseHandler'
import Routes from '../../../constants/routes'
import AppColours from '../../../constants/AppColours'

// Components
import LoadingSpinner from '../../LoadingSpinner'
import UserProfileHeader from '../../layout/UserProfileHeader'
import AppPopup from '../../AppPopup/AppPopup'
import AppButton from '../../AppButton/AppButton'
import AppDivider from '../../AppDivider'
import AppCardButtonContainer from '../../AppCard/AppCardButtonContainer'
import AppMenuButton from '../../AppButton/AppMenuButton'
import AppCardUserClass from '../../AppCard/AppCardUserClass'
import MainPageLayout from '../../layout/MainPageLayout'
import AppSwitch from '../../AppSwitch/AppSwitch'

const UserPage = ({ history }) => {
  const clientInfo = useClientInfo()

  return (
    <MainPageLayout pageTitle="Profil" pageActive="user" history={history}>
      {!clientInfo ? <LoadingSpinner/> : (
        <div>
          <UserProfileHeader photo={clientInfo.photo} name={clientInfo.name} />
          <AppButton type="warning" text="Kijelentkezés" onClick={() => {
            FirebaseHandler.logout()
            history.push(Routes.LOGIN)
          }} />
          <AppDivider/>
          <AppSwitch text="Sötét mód" onCheckedChanged={(checked) => {AppColours.setDarkModeEnabled(checked)}}
          checked={AppColours.getDarkModeEnabled()} />
          <AppDivider/>
          <AppCardButtonContainer>
            <AppMenuButton text="Bejelentkezési adatok" onClick={() => {history.push(Routes.LOGIN_OPTIONS)}} />
            <AppMenuButton text="Értesítések" />
          </AppCardButtonContainer>
          <AppCardUserClass className={clientInfo.className} classRank={clientInfo.classRank} />
          <AppMenuButton text="Fiók törlése" onClick={() => {history.push(Routes.DELETE_ACCOUNT)}} />
          <div>
            <AppDivider/>
            <h1 style={{
              margin: 20,
              textAlign: 'center',
              fontFamily: '"Rubik", sans-serif',
              fontSize: 25,
              fontWeight: 400,
            }} onClick={() => {history.push(Routes.ABOUT)}}>Információ</h1>
          </div>
        </div>
      )}
    </MainPageLayout>
  )
}

export default UserPage
