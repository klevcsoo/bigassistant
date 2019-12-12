import React from 'react'
import { appColours } from '../../../Constants'
import FirebaseHandler from '../../../utils/FirebaseHandler'

// Components
import AppTitle from '../../AppTitle'
import AppButton from '../../AppButton/AppButton'
import AppBackButton from '../../AppButton/AppBackButton'

const DeleteAccountPage = ({ history, displayConfirm }) => {
  const deleteAccount = () => {
    FirebaseHandler.getApp().auth().onAuthStateChanged((user) => {
      if (user) {
        let provider = user.providerId === 'facebook.com' ? FirebaseHandler.getNewFacebookProvider() :
          user.providerId === 'google.com' ? FirebaseHandler.getNewGoogleProvider() : null
        user.reauthenticateWithPopup(provider).then(() => {
          user.delete()
        }).catch((err) => {
          console.log(err)
        })
      }
    })
  }

  return (
    <React.Fragment>
      <AppBackButton history={history} />
      <div style={{
        display: 'block',
        margin: 'auto',
        position: 'absolute',
        top: '50%',
        left: 0,
        transform: 'translateY(-50%)'
      }}>
        <span style={{ color: appColours.WARNING }}><AppTitle text="Biztos törölni akarod a fiókod?" /></span>
        <p style={{
          margin: 10,
          textAlign: 'center',
          fontSize: 16,
          fontWeight: 300
        }}>
          A fiókod törlésével szétcsatlakoztatod a jelenlegi bejelentkező rendszeredet 
          (Facebook, vagy Google) a BIGAssistant-től. Később újra csatlakoztathatod, 
          viszont a csatlakozásod dátuma az új időpont lesz.
          <br/><br/>
          Emellett, hogyha egy osztály admin-ja vagy, fiókod törlésével az osztályodat 
          is törlöd. Mindenki az osztályban ki lesz rúgva, illetve az összes beállítás, 
          dolgozat és házi feladat törölve lesz.
          <br/><br/>
          Ha ezeket elfogadod, nyomj az alábbi gombra a fiókod törléséhez.
        </p>
        <AppButton text="Fiók törlése" type="warning" onClick={() => {
          displayConfirm('Biztos szeretnéd törölni a fiókodat?', () => {
            deleteAccount()
          })
        }} />
      </div>
    </React.Fragment>
  )
}

export default DeleteAccountPage
