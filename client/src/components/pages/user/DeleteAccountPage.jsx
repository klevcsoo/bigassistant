import React, { Component } from 'react'
import AppColours from '../../../constants/appColors'
import FirebaseHandler from '../../../utils/FirebaseHandler';
import { Helmet } from 'react-helmet';

// Components
import AppTitle from '../../AppTitle'
import AppButton from '../../AppButton/AppButton'
import AppPopup from '../../AppPopup/AppPopup';
import AppBackButton from '../../AppButton/AppBackButton';

export class DeleteAccountPage extends Component {
  state = {
    popupVisible: false,
    popupMessage: ''
  }

  displayPopup = (message) => {
    this.setState({
      popupMessage: message,
      popupVisible: true
    });
  }

  deleteAccount = () => {
    FirebaseHandler.getApp().auth().onAuthStateChanged((user) => {
      if (user) {
        let provider = user.providerId === 'facebook.com' ? FirebaseHandler.getNewFacebookProvider() :
          user.providerId === 'google.com' ? FirebaseHandler.getNewGoogleProvider() : null;
        user.reauthenticateWithPopup(provider).then(() => {
          user.delete();
        }).catch((err) => {
          this.displayPopup(`Hiba történt! Hibakód: ${err.code}`);
        });
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <meta name="theme-color" content={AppColours.BACKGROUND} />
        </Helmet>
        {!this.state.popupVisible ? null : <AppPopup message={this.state.popupMessage} />}
        <AppBackButton history={this.props.history} />
        <div style={{
          display: 'block',
          margin: 'auto',
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)'
        }}>
          <span style={{ color: AppColours.WARNING }}><AppTitle text="Biztos törölni akarod a fiókod?" /></span>
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
          <AppButton text="Fiók törlése" type="warning" onClick={this.deleteAccount} />
        </div>
      </React.Fragment>
    )
  }
}

export default DeleteAccountPage
