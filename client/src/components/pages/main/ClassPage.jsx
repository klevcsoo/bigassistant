import React, { useState, useEffect } from 'react'
import FirebaseHandler from '../../../utils/FirebaseHandler'
import { routes } from '../../../Constants'
import { Spring } from 'react-spring/renderprops'
import { useClientInfo, useClassmates } from '../../../utils/AppHooks'

// Components
import LoadingSpinner from '../../LoadingSpinner'
import AppDivider from '../../AppDivider'
import AppButton from '../../AppButton/AppButton'
import AppUserButton from '../../AppButton/AppUserButton'
import MainPageLayout from '../../layout/MainPageLayout'
import AppSubtitle from '../../AppSubtitle'
import ParallaxHeaderImage from '../../layout/ParallaxHeaderImage'

const ClassPage = ({ history }) => {
  const clientInfo = useClientInfo()
  const classmates = useClassmates()
  const [ classInfo, setClassInfo ] = useState(null)
  const [ leavingClass, setLeavingClass ] = useState(false)

  const leaveClass = () => {
    setLeavingClass(true)
    FirebaseHandler.callFunction('leaveClass', {}).then(() => {
      history.push(routes.HOME)
    })
  }

  useEffect(() => {
    FirebaseHandler.getClassId((classId) => {
      FirebaseHandler.readData(`/classes/${classId}/metadata`, (snapshot) => {
        if (!snapshot.exists()) return
        setClassInfo({
          inviteCode: snapshot.child('inviteCode').val(),
          classPhoto: snapshot.child('pictureUrl').val()
        })
      })
    })
  }, [])

  return (
    <MainPageLayout pageTitle="Osztály" pageActive="class" history={history}>
      {!clientInfo ? <LoadingSpinner /> : !classInfo ? (
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
          <ParallaxHeaderImage src={classInfo.classPhoto} header />

          <div>
            <h3 style={{
              margin: 0, padding: 0,
              textAlign: 'center',
              fontWeight: 300, fontSize: '20px'
            }}>Meghívó kód: <span style={{ fontWeight: 400 }}>{classInfo.inviteCode}</span></h3>
          </div>
          <AppDivider/>
          <AppButton type="highlight" text="Órarend" />
          {clientInfo.classRank === 'admin' ? (
            <AppButton text="Osztály beállítások" onClick={() => {history.push(routes.CLASS_SETTINGS)}} />
          ) : leavingClass ? <LoadingSpinner /> : (
            <AppButton type="warning" text="Kilépés az osztályból" onClick={leaveClass} />
          )}
          <AppDivider />
          <AppSubtitle text="Osztály tagjai:" />
          {!classmates || classmates.length === 0 ? <LoadingSpinner/> : (
            <div>
              {classmates.map((classmate) => (
                <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} key={classmate.uid}>
                  {(props) => (
                    <div style={props}>
                      <AppUserButton {...classmate} onClick={() => {
                        history.push(`${routes.USER}/${classmate.uid}`)
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
