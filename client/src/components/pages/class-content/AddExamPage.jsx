import React, { useState } from 'react'
import FirebaseHandler from '../../../utils/FirebaseHandler'
import { appColours } from '../../../Constants'

// Components
import SaveablePageLayout from '../../layout/SaveablePageLayout'
import AppSubtitle from '../../AppSubtitle'
import AppCardClassContent from '../../AppCard/AppCardClassContent'
import AppInput from '../../AppInput/AppInput'
import LoadingSpinner from '../../LoadingSpinner'
import AppClassSubjectsDropDown from '../../AppDropDown/AppClassSubjectsDropDown'
import AppDivider from '../../AppDivider'
import AppDateSelector from '../../AppDateSelector/AppDateSelector';

const AddExamPage = ({ history, displayPopup }) => {
  const [ currentExam, setCurrentExam ] = useState({
    title: '',
    date: new Date().getTime(),
    subject: null,
    notes: ''
  })
  const [ addingExam, setAddingExam ] = useState(false)

  const saveExam = () => {
    setAddingExam(true)
    FirebaseHandler.callFunction('addContentToClass', {
      typeOf: 'exams',
      content: currentExam
    }).then(() => {
      setAddingExam(false)
      displayPopup('Dolgozat hozzáadva!', () => {
        history.goBack()
      })
    }).catch((err) => {
      console.log(err)
      setAddingExam(false)
      displayPopup(`Sikertelen hozzáadás! Hibaüzenet: ${err}`)
    })
  }

  return (
    <React.Fragment>
      {!addingExam ? null : (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, bottom: 0, right: 0,
          zIndex: 90,
          background: appColours.SHADOW
        }}><div style={{
          position: 'fixed',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)'
        }}><LoadingSpinner /></div></div>
      )}
      <SaveablePageLayout onSave={saveExam} pageTitle="Dolgozat" pageType="exam"
      history={history} buttonText="Hozzáadás">
        <AppSubtitle text="Előnézet:" />
        <AppCardClassContent type="exam" {...currentExam} />
        <AppSubtitle text="Beállítások:" />
        <div>
          <AppInput placeholder="Dolgozat címe" text={currentExam.title}
          onTextChanged={(text) => {
            setCurrentExam((prevExam) => { return { ...prevExam, title: text } })
          }} maxLength={30} />
          <AppClassSubjectsDropDown onSubjectChoosen={(subject) => {
            setCurrentExam((prevExam) => { return { ...prevExam, subject: subject } })
          }} />
          <AppDateSelector label="Dolgozat dátuma" defaultDate={currentExam.date} onDateChanged={(date) => {
            setCurrentExam((prevExam) => { return { ...prevExam, date: new Date(date).getTime() } })
          }} />
          <AppDivider />
          <AppInput placeholder="Megjegyzés (nem szükséges)" text={currentExam.notes}
          onTextChanged={(text) => {
            setCurrentExam((prevExam) => { return { ...prevExam, notes: text } })
          }} />
        </div>
      </SaveablePageLayout>
    </React.Fragment>
  )
}

export default AddExamPage
