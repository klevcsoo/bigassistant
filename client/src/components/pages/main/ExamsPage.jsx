import React from 'react'
import { routes } from '../../../Constants'
import { Spring } from 'react-spring/renderprops'
import { useExamsList } from '../../../utils/AppHooks'

// Components
import MainPageLayout from '../../layout/MainPageLayout'
import AppButton from '../../AppButton/AppButton'
import AppDivider from '../../AppDivider'
import LoadingSpinner from '../../LoadingSpinner'
import AppCardClassContent from '../../AppCard/AppCardClassContent'

const ExamsPage = ({ history }) => {
  const exams = useExamsList()

  return (
    <MainPageLayout pageTitle="Dolgozatok" pageActive="exams" history={history}>
      <AppButton text="Hozzáadás" onClick={() => {history.push(routes.EXAMS_ADD)}} />
      <AppDivider />
      {exams ? (
        <div>
          {exams.length === 0 ? <LoadingSpinner /> : null}
          {exams.map((exam) => {
            if (exam) return (
              <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} key={exam.id}>
                {(props) => (
                  <div style={props}>
                    <AppCardClassContent type="exam" {...exam} onOpen={() => {
                      history.push(`${routes.EXAMS}/${exam.id}`)
                    }} />
                  </div>
                )}
              </Spring>
            ); else return null;
          })}
        </div>
      ) : (
        <div>
          <p style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 300
          }}>Nincsenek dolgozatok<span role="img" aria-label="emoji">🙏</span></p>
        </div>
      )}
    </MainPageLayout>
  )
}

export default ExamsPage
