import React from 'react'
import { routes } from '../../../Constants'
import { useUserInfo } from '../../../utils/AppHooks'

// Components
import LoadingSpinner from '../../LoadingSpinner'
import UserProfileHeader from '../../layout/UserProfileHeader'
import AppDivider from '../../AppDivider'
import AppCardUserClass from '../../AppCard/AppCardUserClass'
import AppMenuButton from '../../AppButton/AppMenuButton'
import AppBackButton from '../../AppButton/AppBackButton'

const UserProfilePage = ({ history, match }) => {
  const userInfo = useUserInfo(match.params.uid, () => {
    history.replace(routes.USER)
  })

  return (
    <React.Fragment>
      <AppBackButton history={history} />
      <div style={{ height: 20 }}></div>
      {!userInfo ? <LoadingSpinner/> : (
        <div>
          <UserProfileHeader photo={userInfo.photo} name={userInfo.name} />
          <AppDivider/>
          {!userInfo.className ? null : (
            <React.Fragment>
              <AppCardUserClass className={userInfo.className} classRank={userInfo.classRank} />
            </React.Fragment>
          )}
          {!userInfo.facebookId ? null : (
            <AppMenuButton facebook text="Facebook profil" onClick={() => {
              window.location.href = `https://www.facebook.com/app_scoped_user_id/${userInfo.face}`
            }} />
          )}
          <AppDivider/>
          <p style={{
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: 300
          }}>Csatlakozott: {userInfo.joinedAt}</p>
        </div>
      )}
    </React.Fragment>
  )
}

export default UserProfilePage
