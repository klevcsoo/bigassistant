import React, { useState } from 'react'
import FirebaseHandler from '../../../utils/FirebaseHandler'
import { routes } from '../../../Constants'
import { appColours } from '../../../Constants'

// Components
import AppTitle from '../../AppTitle'
import AppInput from '../../AppInput/AppInput'
import AppButton from '../../AppButton/AppButton'
import LoadingSpinner from '../../LoadingSpinner'
import AppBackButton from '../../AppButton/AppBackButton'
import UserProfileHeader from './../../layout/UserProfileHeader'

const ClassJoinPage = ({ history }) => {
  const [ inviteCode, setInviteCode ] = useState('')
  const [ classPreview, setClassPreview ] = useState(null)
  const [ joining, setJoining ] = useState(false)
  const [ gettingClass, setGettingsClass ] = useState(false)
  const [ codeInvalid, setCodeInvalid ] = useState(false)

  const getPreview = () => {
    setGettingsClass(true)
    FirebaseHandler.callFunction('getClassPreview', { inviteCode: inviteCode }).then(({ data }) => {
      setClassPreview(data)
      setGettingsClass(false)
    }).catch((err) => {
      console.log(err)
      setCodeInvalid(true)
      setGettingsClass(false)
    })
  }

  const joinClass = () => {
    setJoining(true)
    FirebaseHandler.callFunction('joinClass', { inviteCode: inviteCode }).then(() => {
      history.push(routes.HOME)
    }).catch((err) => {
      console.log(err)
      setCodeInvalid(true)
      setJoining(false)
    })
  }

  return (
    <React.Fragment>
      <AppBackButton history={history} />
      <div style={{
        width: '100vw',
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        {classPreview ? (<div><UserProfileHeader {...classPreview} /></div>) : (
          <div>
            <p style={{
              margin: 10, padding: 0,
              textAlign: 'center',
              fontSize: 100
            }}><span role="img" aria-label="hand">🤙</span></p>
            <AppTitle text="Csatlakozás egy osztályhoz" />
            <AppInput placeholder="Meghívókód" text={inviteCode}
            onTextChanged={(text) => { setInviteCode(text); setCodeInvalid(false) }}
            style={{
              border: `2px solid ${codeInvalid ? appColours.WARNING : 'transparent'}`
            }} />
            {!codeInvalid ? null : (
              <p style={{
                margin: 5,
                textAlign: 'center',
                color: appColours.WARNING,
                fontSize: 16
              }}>Érvénytelen kód!</p>
            )}
          </div>
        )}
        {joining || gettingClass ? <LoadingSpinner /> : (
          <AppButton type="highlight" text="Csatlakozás" onClick={() =>{
            if (classPreview) joinClass()
            else getPreview()
          }} />
        )}
      </div>
    </React.Fragment>
  )
}

export default ClassJoinPage
