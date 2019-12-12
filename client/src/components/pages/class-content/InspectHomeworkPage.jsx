import React, { useEffect, useState } from 'react'
import FirebaseHandler from '../../../utils/FirebaseHandler'
import LocalizationHandler from '../../../utils/LocalizationHandler'

// Components
import AppBackButton from '../../AppButton/AppBackButton'
import LoadingSpinner from '../../LoadingSpinner'
import AppTitle from '../../AppTitle'
import AppDivider from '../../AppDivider'
import AppUserButton from '../../AppButton/AppUserButton'
import { appColours } from '../../../Constants'
import AppButton from '../../AppButton/AppButton'

const InspectHomeworkPage = ({ history, match }) => {
  const [ creatorInfo, setCreatorInfo ] = useState(null)
  const [ homeworkInfo, setHomeworkInfo ] = useState(null)
  const [ homeworkNotFound, setHomeworkNotFound ] = useState(false)
  const [ deleteLoading, setDeleteLoading ] = useState(false)
  const homeworkId = match.params.id

  const deleteHomework = () => {
    setDeleteLoading(true)
    FirebaseHandler.callFunction('removeContentFromClass', { type: 'homework', id: homeworkId }).then(() => {
      history.goBack()
    }).catch((err) => {
      console.log(err)
      setDeleteLoading(false)
    })
  }

  useEffect(() => {
    FirebaseHandler.getClassId((classId) => {
      FirebaseHandler.readData(`/classes/${classId}/homework/${homeworkId}`, (snapshot) => {
        if (!snapshot.exists()) {
          setHomeworkInfo({})
          setHomeworkNotFound(true)
        } else {
          setHomeworkInfo(snapshot.val())
        }
      })
    })
  } , [ homeworkId ])

  useEffect(() => {
    if (homeworkInfo) {
      FirebaseHandler.callFunction('getUserInfo', {
        uid: homeworkInfo.creator
      }).then(({ data }) => {
        setCreatorInfo(data)
      }).catch((err) => {
        console.log(err)
        setCreatorInfo({})
      })
    }
  }, [ homeworkInfo ])

  return (
    <div style={{
      width: '100vw', height: '100vh',
      boxSizing: 'border-box',
      borderBottom: `5px solid ${appColours.HOMEWORK}`
    }}>
      <AppBackButton history={history} />
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        {!homeworkInfo ? <LoadingSpinner /> : homeworkNotFound ? (
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
            <AppTitle text={homeworkInfo.title} />
            <p style={primaryPropStyle}>
              Tantárgy: <span style={{
                fontWeight: 500
              }}>{homeworkInfo.subject}</span>
            </p>
            <p style={primaryPropStyle}>
              Időpont: <span style={{
                fontWeight: 500
              }}>{LocalizationHandler.formatDate(homeworkInfo.date)}</span>
            </p>
            <AppDivider />
            {!homeworkInfo.notes ? null : (
              <React.Fragment>
                <p style={{
                  ...secondaryPropStyle,
                  margin: 20,
                  wordBreak: 'break-word'
                }}>{homeworkInfo.notes}</p>
                <AppDivider />
              </React.Fragment>
            )}
            <p style={secondaryPropStyle}>
              Létrehozva: {LocalizationHandler.formatDate(homeworkInfo.createdAt)}
            </p>
            {!creatorInfo ? <LoadingSpinner /> : (
              <AppUserButton {...creatorInfo} uid={homeworkInfo.creator} />
            )}
            <AppDivider />
            {deleteLoading ? <LoadingSpinner /> : (
              <AppButton type="warning" text="Házi feladat törlése" onClick={deleteHomework} />
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

export default InspectHomeworkPage
