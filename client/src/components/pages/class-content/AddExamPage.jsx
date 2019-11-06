import React, { useState } from 'react'
import FirebaseHandler from '../../../utils/FirebaseHandler'
import AppColours from '../../../constants/AppColours'
import 'date-fns'; import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'

// Components
import SaveablePageLayout from '../../layout/SaveablePageLayout'
import AppSubtitle from '../../AppSubtitle'
import AppCardClassContent from '../../AppCard/AppCardClassContent'
import AppInput from '../../AppInput/AppInput'
import LoadingSpinner from '../../LoadingSpinner'
import AppPopup from '../../AppPopup/AppPopup'
import AppClassSubjectsDropDown from '../../AppDropDown/AppClassSubjectsDropDown'
import AppDivider from '../../AppDivider'

const AddExamPage = ({ history }) => {
  const [ currentExam, setCurrentExam ] = useState({
    title: '',
    date: new Date().getTime(),
    subject: null,
    notes: ''
  })
  const [ popup, setPopup ] = useState({ visible: false, message: '' })
  const [ addingExam, setAddingExam ] = useState(false)
  const [ addedExam, setAddedExam ] = useState(false)

  const displayPopup = (message) => {
    setPopup({ visible: true, message: message })
  }
  const closePopup = () => {
    if (addedExam) history.goBack()
    else {
      setPopup({ visible: false, message: '' })
      setAddingExam(false)
    }
  }

  const saveExam = () => {
    setAddingExam(true)
    FirebaseHandler.callFunction('addContentToClass', {
      typeOf: 'exams',
      content: currentExam
    }).then(() => {
      setAddedExam(true)
      displayPopup('Dolgozat hozzáadva!')
    }).catch((err) => {
      console.log(err)
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
          background: AppColours.SHADOW
        }}><div style={{
          position: 'fixed',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)'
        }}><LoadingSpinner /></div></div>
      )}
      <SaveablePageLayout onSave={saveExam} pageTitle="Dolgozat" pageType="exam"
      history={history} buttonText="Hozzáadás">
        {popup.visible ? <AppPopup message={popup.message} onClose={closePopup} /> : null}
        <AppSubtitle text="Előnézet:" />
        <AppCardClassContent type="exam" {...currentExam} />
        <AppSubtitle text="Beállítások:" />
        <div>
          <AppInput placeholder="Dolgozat címe" text={currentExam.title}
          onTextChanged={(text) => {
            setCurrentExam((prevExam) => { return { ...prevExam, title: text } })
          }} />
          <AppClassSubjectsDropDown onSubjectChoosen={(subject) => {
            setCurrentExam((prevExam) => { return { ...prevExam, subject: subject } })
          }} />
          <div style={{
            width: 'fit-content',
            margin: '5px auto',
            filter: `invert(${AppColours.getDarkModeEnabled() ? '1' : '0'})`
          }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker margin="normal" label="Dolgozat dátuma" format="yyyy. MMMM dd."
              value={currentExam.date} onChange={(date) => {
                setCurrentExam((prevExam) => { return { ...prevExam, date: new Date(date).getTime() } })
              }} inputVariant="outlined"
              style={{ width: 290 }} />
            </MuiPickersUtilsProvider>
          </div>
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
