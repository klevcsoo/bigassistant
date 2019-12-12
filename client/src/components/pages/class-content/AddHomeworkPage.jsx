import React, { useState } from 'react'
import FirebaseHandler from '../../../utils/FirebaseHandler'
import { appColours } from '../../../Constants'
import 'date-fns'; import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'

// Components
import SaveablePageLayout from '../../layout/SaveablePageLayout'
import AppSubtitle from '../../AppSubtitle'
import AppCardClassContent from '../../AppCard/AppCardClassContent'
import AppInput from '../../AppInput/AppInput'
import LoadingSpinner from '../../LoadingSpinner'
import AppClassSubjectsDropDown from '../../AppDropDown/AppClassSubjectsDropDown'
import AppDivider from '../../AppDivider';

const AddHomeworkPage = ({ history, displayPopup }) => {
  const [ currentHomework, setCurrentHomework ] = useState({
    title: '',
    date: new Date().getTime(),
    subject: null,
    notes: ''
  })
  const [ addingHomework, setAddingHomework ] = useState(false)

  const saveHomework = () => {
    setAddingHomework(true)
    FirebaseHandler.callFunction('addContentToClass', {
      typeOf: 'homework',
      content: currentHomework
    }).then(() => {
      setAddingHomework(false)
      displayPopup('Házi feladat hozzáadva!', () => {
        history.goBack()
      })
    }).catch((err) => {
      console.log(err)
      setAddingHomework(false)
      displayPopup(`Sikertelen hozzáadás! Hibaüzenet: ${err}`)
    })
  }

  return (
    <React.Fragment>
      {!addingHomework ? null : (
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
      <SaveablePageLayout onSave={saveHomework} pageTitle="Házi feladat" pageType="homework"
      history={history} buttonText="Hozzáadás">
        <AppSubtitle text="Előnézet:" />
        <AppCardClassContent type="homework" {...currentHomework} />
        <AppSubtitle text="Beállítások:" />
        <div>
          <AppInput placeholder="Házi feladat címe" text={currentHomework.title}
          onTextChanged={(text) => {
            setCurrentHomework((prevHomework) => { return { ...prevHomework, title: text } })
          }} maxLength={30} />
          <AppClassSubjectsDropDown onSubjectChoosen={(subject) => {
            setCurrentHomework((prevHomework) => { return { ...prevHomework, subject: subject } })
          }} />
          <div style={{
            width: 'fit-content',
            margin: '5px auto',
          }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker margin="normal" label="Házi feladat dátuma" format="yyyy. MMMM dd."
              value={currentHomework.date} onChange={(date) => {
                setCurrentHomework((prevHomework) => { return { ...prevHomework, date: new Date(date).getTime() } })
              }} inputVariant="outlined"
              style={{ width: 290 }} />
            </MuiPickersUtilsProvider>
          </div>
          <AppDivider />
          <AppInput placeholder="Megjegyzés (nem szükséges)" text={currentHomework.notes}
          onTextChanged={(text) => {
            setCurrentHomework((prevHomework) => { return { ...prevHomework, notes: text } })
          }} />
        </div>
      </SaveablePageLayout>
    </React.Fragment>
  )
}

export default AddHomeworkPage
