import React, { useState } from 'react'
import AppColours from '../../../constants/AppColours'
import FirebaseHandler from '../../../utils/FirebaseHandler'
import { defaultClassPhoto } from '../../../constants/AppInfo'

// Components
import SaveablePageLayout from '../../layout/SaveablePageLayout'
import UserProfileHeader from '../../layout/UserProfileHeader'
import AppDivider from '../../AppDivider'
import AppInput from '../../AppInput/AppInput'
import AppSwitch from '../../AppSwitch/AppSwitch'
import LoadingSpinner from '../../LoadingSpinner'

const ClassCreatePage = ({ history, displayPopup }) => {
  const [ classInfo, setClassInfo ] = useState({ name: 'Osztály', photo: defaultClassPhoto, closed: false })
  const [ addingClass, setAddingClass ] = useState(false)

  const createClass = () => {
    setAddingClass(true)
    FirebaseHandler.callFunction('joinClass', classInfo).then(() => {
      displayPopup('Osztály létrehozva!', () => {
        history.goBack()
      })
    }).catch((err) => {
      console.log(err);
      setAddingClass(false)
      displayPopup(`Sikertelen létrehozás! Hibaüzenet: ${err}`)
    })
  }

  return (
    <SaveablePageLayout pageTitle="Osztály létrehozása" buttonText="Létrehozás"
    history={history} onSave={createClass}>
      {!addingClass ? null : (
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
      <UserProfileHeader {...classInfo} />
      <AppDivider />
      <AppInput placeholder="Osztály neve" text={classInfo.name} onTextChanged={(text) => {
        setClassInfo((prevClassInfo) => { return { ...prevClassInfo, name: text } })
      }} maxLength={20} />
      <AppSwitch text="Zárt osztály" description="Meghívókód használatával is engedély kell a csatlakozáshoz."
      checked={classInfo.closed} onCheckedChanged={(checked) => {
        setClassInfo((prevClassInfo) => { return { ...prevClassInfo, closed: checked } })
      }} />
      <AppInput placeholder="Kép link" text={classInfo.photo} onTextChanged={(text) => {
        setClassInfo((prevClassInfo) => { return { ...prevClassInfo, photo: text } })
      }} />
    </SaveablePageLayout>
  )
}

export default ClassCreatePage
