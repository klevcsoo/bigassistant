import React, { useState, useEffect, useRef } from 'react'
import FirebaseHandler from '../../../utils/FirebaseHandler'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import { useClientInfo } from '../../../utils/AppHooks'

// Components
import LoadingSpinner from '../../LoadingSpinner'
import UnauthorizedPage from '../UnauthorizedPage'
import UserProfileHeader from '../../layout/UserProfileHeader'
import AppDivider from '../../AppDivider'
import AppInput from '../../AppInput/AppInput'
import AppColours from '../../../constants/AppColours'
import SaveablePageLayout from '../../layout/SaveablePageLayout'
import AppButton from '../../AppButton/AppButton'
import Routes from '../../../constants/routes'

const ClassSettings = ({ history, displayPopup }) => {
  const clientInfo = useClientInfo()
  const [ classInfo, setClassInfo ] = useState(null)
  const [ currentSubject, setCurrentSubject ] = useState('')
  const [ classSaving, setClassSaving ] = useState(false)

  const currentSubjectInput = useRef(null)

  const addSubject = () => {
    if (currentSubject.length === 0 || currentSubject === ' ') return
    setClassInfo((prevClassInfo) => { return {
      ...prevClassInfo,
      subjects: [ ...prevClassInfo.subjects, currentSubject ]
    }})
    currentSubjectInput.current.focus();
  }
  const removeSubject = (subject) => {
    let subjects = classInfo.subjects;
    subjects.splice(subjects.indexOf(subject), 1)
    setClassInfo((prevClassInfo) => { return {
      ...prevClassInfo,
      subjects: subjects
    }})
  }

  const deleteClass = () => {
    setClassSaving(true)
    FirebaseHandler.callFunction('leaveClass').then(() => {
      history.push(Routes.HOME)
    }).catch((err) => {
      console.log(err)
      setClassSaving(false)
      displayPopup(`Sikertelen törlés! Hibaüzenet: ${err}`)
    })
  }

  const updateClassSettings = () => {
    setClassSaving(true)
    FirebaseHandler.callFunction('updateClass', classInfo).then(() => {
      displayPopup('Osztálybeállítások elmentve!', () => {
        history.goBack()
      })
    }).catch((err) => {
      console.log(err)
      displayPopup(`Sikertelen mentés! Hibaüzenet: ${err}`, () => {
        setClassSaving(false)
      })
    })
  }

  useEffect(() => {
    FirebaseHandler.getClassInfo((classResult) => {
      setClassInfo(classResult)
    })
  }, [])

  return (
    <SaveablePageLayout pageTitle="Osztály beállítások" onSave={updateClassSettings} history={history}>
      {!classSaving ? null : (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, bottom: 0, right: 0,
          zIndex: 90,
          background: AppColours.SHADOW
        }}><div style={{
          position: 'fixed',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)'
        }}><LoadingSpinner /></div></div>
      )}
      {!classInfo || !clientInfo ? <LoadingSpinner /> : (
        <React.Fragment>
          {clientInfo.classRank !== 'admin' ? <UnauthorizedPage /> : (
            <div>
              <UserProfileHeader name={classInfo.name} photo={classInfo.photo} />
              <AppDivider />
              <AppInput placeholder="Osztály neve" text={classInfo.name}
              onTextChanged={(text) => {
                setClassInfo((prevClassInfo) => { return { ...prevClassInfo, name: text } })
              }} />
              <AppInput placeholder="Kép link" text={classInfo.photo}
              onTextChanged={(text) => {
                setClassInfo((prevClassInfo) => { return { ...prevClassInfo, photo: text } })
              }} />
              <AppDivider />
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'auto 42px',
                width: 290,
                margin: '5px auto'
              }}>
                <AppInput placeholder="Tantárgy hozzáadása" text={currentSubject}
                  onTextChanged={(text) => { setCurrentSubject(text) }}
                  style={{
                    margin: 0,
                    minWidth: 0,
                    width: 'calc(100% - 42px)'
                  }} reference={currentSubjectInput} />
                <button style={{
                  width: 42,
                  height: 42,
                  background: AppColours.LIGHT,
                  border: 'none',
                  borderRadius: '100%'
                }} onClick={addSubject}><AddRoundedIcon /></button>
              </div>
              <div>
                {classInfo.subjects.map((subject) => (
                  <div key={Math.random()} style={{
                    width: 290,
                    margin: '5px auto',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr'
                  }}>
                    <h1 style={{
                      margin: 5, textAlign: 'left', fontSize: 18, fontWeight: 300
                    }}>{subject}</h1>
                    <h1 style={{
                      margin: 5, textAlign: 'right', fontSize: 18, fontWeight: 300, color: AppColours.WARNING
                    }} onClick={removeSubject.bind(this, subject)}>Eltávolítás</h1>
                  </div>
                ))}
              </div>
              <AppDivider />
              <AppButton type="warning" text="Osztály törlése" onClick={deleteClass} />
            </div>
          )}
        </React.Fragment>
      )}
    </SaveablePageLayout>
  )
}

export default ClassSettings
