import React, { useState, useEffect } from 'react'
import FirebaseHandler from '../../../utils/FirebaseHandler'
import { appColours } from '../../../Constants'
// Components
import AppTitle from '../../AppTitle'
import AppSubtitle from '../../AppSubtitle'
import LoadingSpinner from '../../LoadingSpinner'
import AppBackButton from '../../AppButton/AppBackButton'

const LoginOptionsPage = ({ history }) => {
  const [ loggedInWith, setLoggedInWith ] = useState(null)

  useEffect(() => {
    FirebaseHandler.getApp().auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedInWith(user.providerData[0].providerId)
      }
    })
  }, [])

  return (
    <React.Fragment>
      <div style={{
        position: 'fixed',
        top: 0, left: 0,
        bottom: 0, right: 0,
        overflow: 'hidden'
      }}>
        <AppBackButton history={history} />
        <div style={{
          width: '80vh',
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          <AppSubtitle text="Bejelentkezve a következővel:" />
          {!loggedInWith ? <LoadingSpinner /> :
            loggedInWith === 'facebook.com' ? (
              <div>
                <a href="https://www.facebook.com" style={{ color: appColours.FACEBOOK }}><AppTitle text="Facebook" /></a>
              </div>
            ) : (
              <div>
                <a href="https://www.google.com" style={{ color: appColours.TEXT }}><AppTitle text="Google" /></a>
              </div>
            )
          }
        </div>
      </div>
    </React.Fragment>
  )
}

export default LoginOptionsPage
