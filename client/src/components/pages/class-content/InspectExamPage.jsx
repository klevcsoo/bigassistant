import React, { useEffect, useState } from 'react'
import FirebaseHandler from '../../../utils/FirebaseHandler'
import LocalizationHandler from '../../../utils/LocalizationHandler'
import { Helmet } from 'react-helmet'

// Components
import AppBackButton from '../../AppButton/AppBackButton'
import LoadingSpinner from '../../LoadingSpinner'
import AppTitle from '../../AppTitle'
import AppDivider from '../../AppDivider'
import AppUserButton from '../../AppButton/AppUserButton'
import AppColours from '../../../constants/AppColours'

const InspectExamPage = ({ history, match }) => {
  const [ creatorInfo, setCreatorInfo ] = useState(null)
  const [ examInfo, setExamInfo ] = useState(null)
  const [ examNotFound, setExamNotFound ] = useState(false)

  useEffect(() => {
    let examId = match.params.id
    FirebaseHandler.getClientInfo((result) => {
      let classId = result.classId
      FirebaseHandler.readData(`/classes/${classId}/exams/${examId}`, (snapshot) => {
        if (!snapshot.exists()) {
          setExamInfo({})
          setExamNotFound(true)
        } else {
          setExamInfo(snapshot.val())
        }
      })
    })
  } , [ match ])

  useEffect(() => {
    if (examInfo) {
      FirebaseHandler.callFunction('getUserInfo', {
        uid: examInfo.creator
      }).then(({ data }) => {
        setCreatorInfo(data)
      }).catch((err) => {
        console.log(err)
        setCreatorInfo({})
      })
    }
  }, [examInfo])

  return (
    <div style={{
      width: '100vw', height: '100vh',
      boxSizing: 'border-box',
      borderBottom: `5px solid ${AppColours.EXAM}`
    }}>
      <Helmet>
        <meta name="theme-color" content={AppColours.BACKGROUND} />
      </Helmet>
      <AppBackButton history={history} />
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        {!examInfo ? <LoadingSpinner /> : examNotFound ? (
          <div style={{ width: '100vw' }}>
            <p style={{
              margin: 10, padding: 0,
              textAlign: 'center',
              fontSize: 100
            }}><span role="img" aria-label="emoji">🤷‍♀️</span></p>
            <AppTitle text="Nem található ilyen dolgozat." />
          </div>
        ) : (
          <div style={{ width: '100vw' }}>
            <AppTitle text={examInfo.title} />
            <p style={primaryPropStyle}>
              Tantárgy: <span style={{
                fontWeight: 500
              }}>{examInfo.subject}</span>
            </p>
            <p style={primaryPropStyle}>
              Időpont: <span style={{
                fontWeight: 500
              }}>{LocalizationHandler.formatDate(examInfo.date)}</span>
            </p>
            <AppDivider />
            {!examInfo.notes ? null : (
              <React.Fragment>
                <p style={secondaryPropStyle}>{examInfo.notes}</p>
                <AppDivider />
              </React.Fragment>
            )}
            <p style={secondaryPropStyle}>
              Létrehozva: {LocalizationHandler.formatDate(examInfo.createdAt)}
            </p>
            {!creatorInfo ? <LoadingSpinner /> : (
              <AppUserButton {...creatorInfo} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const primaryPropStyle = {
  margin: 5,
  textAlign: 'center',
  fontSize: 22,
  fontWeight: 300
}

const secondaryPropStyle = {
  margin: 5,
  textAlign: 'center',
  fontSize: 18,
  fontWeight: 400
}

export default InspectExamPage
