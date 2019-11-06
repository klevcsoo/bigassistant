import React from 'react'
import Routes from '../../../constants/routes'
import { Spring } from 'react-spring/renderprops'
import { useHomeworkList } from '../../../utils/AppHooks'

// Components
import MainPageLayout from '../../layout/MainPageLayout'
import AppButton from '../../AppButton/AppButton'
import AppDivider from '../../AppDivider'
import AppCardClassContent from '../../AppCard/AppCardClassContent'
import LoadingSpinner from '../../LoadingSpinner'

const HomeworkPage = ({ history }) => {
  const homework = useHomeworkList()

  return (
    <MainPageLayout pageTitle="Házi feladat" pageActive="homework" history={history}>
      <AppButton text="Hozzáadás" onClick={() => {history.push(Routes.HOMEWORK_ADD)}} />
      <AppDivider />
      {homework ? (
        <div>
          {homework.length === 0 ? <LoadingSpinner /> : null}
          {homework.map((hw) => {
            if (hw) return (
              <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} key={hw.id}>
                {(props) => (
                  <div style={props}>
                    <AppCardClassContent type="homework" {...hw} onOpen={() => {
                      history.push(`${Routes.HOMEWORK}/${hw.id}`)
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
          }}>Nincsen házi feladat<span role="img" aria-label="emoji">🙏</span></p>
        </div>
      )}
    </MainPageLayout>
  )
}

export default HomeworkPage
