import React from 'react'
import { useClientInfo } from '../../../utils/AppHooks'
import FirebaseHandler from '../../../utils/FirebaseHandler'
import { routes } from '../../../Constants'

// Components
import LoadingSpinner from '../../LoadingSpinner'
import UserProfileHeader from '../../layout/UserProfileHeader'
import AppButton from '../../AppButton/AppButton'
import AppDivider from '../../AppDivider'
import AppCardButtonContainer from '../../AppCard/AppCardButtonContainer'
import AppMenuButton from '../../AppButton/AppMenuButton'
import AppCardUserClass from '../../AppCard/AppCardUserClass'
import MainPageLayout from '../../layout/MainPageLayout'

const UserPage = ({ history, displayConfirm }) => {
  const clientInfo = useClientInfo()

  return (
    <MainPageLayout pageTitle="Profil" pageActive="user" history={history}>
      {!clientInfo ? <LoadingSpinner/> : (
        <div>
          <UserProfileHeader photo={clientInfo.photo} name={clientInfo.name} />
          <AppButton type="warning" text="Kijelentkezés" onClick={() => {
            displayConfirm('Biztos ki szeretnél jelentkezni?', () => {
              FirebaseHandler.logout()
              history.push(routes.LOGIN)
            })
          }} />
          <AppDivider/>
          <AppCardButtonContainer>
            <AppMenuButton text="Bejelentkezési adatok" onClick={() => {history.push(routes.LOGIN_OPTIONS)}} />
            <AppMenuButton text="Értesítések" />
          </AppCardButtonContainer>
          <AppCardUserClass className={clientInfo.className} classRank={clientInfo.classRank} />
          <AppMenuButton text="Fiók törlése" onClick={() => {history.push(routes.DELETE_ACCOUNT)}} />
          <AppDivider />
          <AppButton text="Az alkalmazásról" onClick={() => {history.push(routes.ABOUT)}} />
        </div>
      )}
    </MainPageLayout>
  )
}

export default UserPage
