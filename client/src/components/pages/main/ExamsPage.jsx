import React from 'react'
import FirebaseHandler from '../../../utils/FirebaseHandler'
import Routes from '../../../constants/routes'
import { Spring } from 'react-spring/renderprops'
import { useClassContent } from '../../../utils/AppHooks'

// Components
import MainPageLayout from '../../layout/MainPageLayout'
import AppPopup from '../../AppPopup/AppPopup'
import AppButton from '../../AppButton/AppButton'
import AppDivider from '../../AppDivider'
import LoadingSpinner from '../../LoadingSpinner'
import AppCardClassContent from '../../AppCard/AppCardClassContent'

const ExamsPage = ({ history }) => {
  const exams = useClassContent('exams')

  return (
    <MainPageLayout pageTitle="Dolgozatok" pageActive="exams" history={history}>
      <AppButton text="Hozzáadás" onClick={() => {history.push(Routes.EXAMS_ADD)}} />
      <AppDivider />
      <div>
        {exams.length === 0 ? <LoadingSpinner /> : null}
        {exams.map((exam) => {
          if (exam) return (
            <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} key={exam.id}>
              {(props) => (
                <div style={props}>
                  <AppCardClassContent type="exam" {...exam} onOpen={() => {
                    history.push(`${Routes.EXAMS}/${exam.id}`)
                  }} />
                </div>
              )}
            </Spring>
          ); else return null;
        })}
      </div>
    </MainPageLayout>
  )
}

export default ExamsPage
