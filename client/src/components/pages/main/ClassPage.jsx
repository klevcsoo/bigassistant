import React, { useState, useEffect } from 'react'
import FirebaseHandler from '../../../utils/FirebaseHandler'
import Routes from '../../../constants/routes'
import { Spring } from 'react-spring/renderprops'
import { useClientInfo, useClassmates } from '../../../utils/AppHooks'

// Components
import LoadingSpinner from '../../LoadingSpinner'
import AppPopup from '../../AppPopup/AppPopup'
import AppDivider from '../../AppDivider'
import AppButton from '../../AppButton/AppButton'
import AppUserButton from '../../AppButton/AppUserButton'
import MainPageLayout from '../../layout/MainPageLayout'
import AppSubtitle from '../../AppSubtitle'

const ClassPage = ({ history }) => {
  const clientInfo = useClientInfo()
  const classmates = useClassmates()
  const [ inviteCode, setInviteCode ] = useState(null)
  const [ leavingClass, setLeavingClass ] = useState(false)

  const leaveClass = () => {
    setLeavingClass(true)
    FirebaseHandler.callFunction('leaveClass', {}).then(() => {
      history.push(Routes.HOME)
    })
  }

  useEffect(() => {
    if (clientInfo) {
      FirebaseHandler.readData(`/classes/${clientInfo.classId}/metadata/inviteCode`, (snapshot) => {
        setInviteCode(snapshot.val())
      })
    }
  }, [clientInfo])

  return (
    <MainPageLayout pageTitle="Osztály" pageActive="class" history={history}>
      {!clientInfo ? <LoadingSpinner /> : !clientInfo.classId ? (
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          <p style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 300
          }}>Nem vagy tagja egy osztálynak sem<span role="img" aria-label="emoji">🤨</span></p>
        </div>
      ) : (
        <div>
          <div>
            <h3 style={{
              margin: 0, padding: 0,
              textAlign: 'center',
              fontWeight: 300, fontSize: '20px'
            }}>Meghívó kód: <span style={{ fontWeight: 400 }}>{inviteCode}</span></h3>
          </div>
          <AppDivider/>
          <AppButton type="highlight" text="Órarend" />
          {clientInfo.classRank === 'admin' ? (
            <AppButton text="Osztály beállítások" onClick={() => {history.push(Routes.CLASS_SETTINGS)}} />
          ) : leavingClass ? <LoadingSpinner /> : (
            <AppButton type="warning" text="Kilépés az osztályból" onClick={leaveClass} />
          )}
          <AppDivider />
          <AppSubtitle text="Osztály tagjai:" />
          {classmates.length === 0 ? <LoadingSpinner/> : (
            <div>
              {classmates.map((classmate) => (
                <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} key={classmate.uid}>
                  {(props) => (
                    <div style={props}>
                      <AppUserButton {...classmate} onClick={() => {
                        history.push(`${Routes.USER}/${classmate.uid}`)
                      }} />
                    </div>
                  )}
                </Spring>
              ))}
            </div>
          )}
        </div>
      )}
    </MainPageLayout>
  )
}

export default ClassPage
