import React, { useState, useEffect } from 'react'
import './LoginPage.css'
import FirebaseHandler from '../../../../utils/FirebaseHandler'
import { routes } from '../../../../Constants'

// Components
import AppTitle from '../../../AppTitle'
import AppButton from '../../../AppButton/AppButton'
import LoadingSpinner from '../../../LoadingSpinner'
import { appColours } from '../../../../Constants'
import { Helmet } from 'react-helmet';
import AppUserButton from '../../../AppButton/AppUserButton'

const LoginPage = ({ history }) => {
  const [ loading, setLoading ] = useState(true)
  const [ clientInfo, setClientInfo ] = useState(null)

  const createBackground = () => {
    const nOfStars = 20
    const maxAnimDuration = 10 // seconds

    let stars = []
    for (let i = 0; i < nOfStars; i++) {
      stars.push((
        <div className="p" style={{
          animationDuration: `${Math.floor(Math.random() * maxAnimDuration)}s`,
          top: `${Math.floor(Math.random() * 100)}%`
        }} key={Math.random().toString()}></div>
      ))
    }

    return stars
  }

  useEffect(() => {
    FirebaseHandler.getApp().auth().onAuthStateChanged((user) => {
      setLoading(false)
      if (user) setClientInfo({
        name: user.displayName,
        photo: `${user.photoURL}?height=500`
      })
    })
  }, [])

  return (
    <React.Fragment>
      <Helmet>
        <meta name="theme-color" content={appColours.makeStatusbarColour()} />
      </Helmet>
      <div className="login-main-container" style={{ backgroundColor: appColours.BACKGROUND }}>
        <div>{createBackground()}</div>
        <div className="login-methods-container">
            <AppTitle text="BIGAssistant" />
            {loading ? <LoadingSpinner static /> : clientInfo ? (
              <AppUserButton {...clientInfo} onClick={() => { history.replace(routes.HOME) }} />
            ) : (
              <><AppButton text="Bejelentkezés Facebook-al"
              onClick={() => { FirebaseHandler.loginWithFacebook() }} facebook />
              <AppButton text="Bejelentkezés Google-el"
              onClick={() => { FirebaseHandler.loginWithGoogle() }} /></>
            )}
        </div>
    </div>
    </React.Fragment>
  )
}

export default LoginPage
