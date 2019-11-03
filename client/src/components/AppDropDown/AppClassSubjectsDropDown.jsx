import React, { useState, useEffect } from 'react'
import AppDropDown from './AppDropDown'
import FirebaseHandler from './../../utils/FirebaseHandler'
import LoadingSpinner from './../LoadingSpinner'

const AppClassSubjectsDropDown = ({ onSubjectChoosen }) => {
  const [ subjects, setSubjects ] = useState([]);

  useEffect(() => {
    FirebaseHandler.getClientInfo((result) => {
      let classId = result.classId;
      FirebaseHandler.readData(`/classes/${classId}/metadata/subjects`, (snapshot) => {
        snapshot.forEach((subjectSnapshot) => {
          setSubjects((currentSubjects) => [...currentSubjects, subjectSnapshot.val()])
        })
      })
    })
  }, [])

  return (
    <React.Fragment>
      {subjects.length === 0 ? <LoadingSpinner /> : (
        <AppDropDown onSelected={(e) => { if (onSubjectChoosen) onSubjectChoosen(e.target.value) }}>
          <option value="">--Tantárgy--</option>
          {subjects.map((currentSubject) => (
            <option value={currentSubject} key={String(currentSubject).toLowerCase()}>{currentSubject}</option>
          ))}
        </AppDropDown>
      )}
    </React.Fragment>
  )
}

export default AppClassSubjectsDropDown
