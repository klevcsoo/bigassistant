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

const AddHomeworkPage = ({ history }) => {
  const [ currentHomework, setCurrentHomework ] = useState({ title: '', date: new Date().getTime(), subject: null })
  const [ popup, setPopup ] = useState({ visible: false, message: '' })
  const [ addingHomework, setAddingHomework ] = useState(false)
  const [ addedHomework, setAddedHomework ] = useState(false)

  const displayPopup = (message) => {
    setPopup({ visible: true, message: message })
  }
  const closePopup = () => {
    if (addedHomework) history.goBack()
    else {
      setPopup({ visible: false, message: '' })
      setAddingHomework(false)
    }
  }

  const saveHomework = () => {
    setAddingHomework(true)
    FirebaseHandler.callFunction('addContentToClass', {
      typeOf: 'homework',
      content: currentHomework
    }).then(() => {
      setAddedHomework(true)
      displayPopup('Házi feladat hozzáadva!')
    }).catch((err) => {
      console.log(err)
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
          background: AppColours.SHADOW
        }}><div style={{
          position: 'fixed',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)'
        }}><LoadingSpinner /></div></div>
      )}
      <SaveablePageLayout onSave={saveHomework} pageTitle="Dolgozat" pageType="homework"
      history={history} buttonText="Hozzáadás">
        {popup.visible ? <AppPopup message={popup.message} onClose={closePopup} /> : null}
        <AppSubtitle text="Előnézet:" />
        <AppCardClassContent type="homework" {...currentHomework} />
        <AppSubtitle text="Beállítások:" />
        <div>
          <AppInput placeholder="Dolgozat címe" text={currentHomework.title}
          onTextChanged={(text) => {
            setCurrentHomework((prevHomework) => { return { ...prevHomework, title: text } })
          }} />
          <div style={{
            width: 'fit-content',
            margin: '5px auto',
            filter: `invert(${AppColours.getDarkModeEnabled() ? '1' : '0'})`
          }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker margin="normal" label="Házi feladat dátuma" format="yyyy. MMMM dd."
              value={currentHomework.date} onChange={(date) => {
                setCurrentHomework((prevHomework) => { return { ...prevHomework, date: new Date(date).getTime() } })
              }} inputVariant="outlined"
              style={{ width: 290 }} />
            </MuiPickersUtilsProvider>
          </div>
          <AppClassSubjectsDropDown onSubjectChoosen={(subject) => {
            setCurrentHomework((prevHomework) => { return { ...prevHomework, subject: subject } })
          }} />
        </div>
      </SaveablePageLayout>
    </React.Fragment>
  )
}

export default AddHomeworkPage
