import React, { useRef } from 'react'
import './PageTitle.css'
import { Helmet } from 'react-helmet';

// Components
import { appColours } from '../../../Constants';
import AppBackButton from '../../AppButton/AppBackButton';

const PageTitle = ({ type, title, noBackButton, history }) => {
  const backgroundRef = useRef(null)

  let bgColour = type === 'homework' ? appColours.HOMEWORK
  : type === 'exam' ? appColours.EXAM
  : appColours.BACKGROUND

  return (
    <React.Fragment>
        <Helmet>
          <meta name="theme-color" content={appColours.makeStatusbarColour(bgColour)} />
          <title>{title}</title>
        </Helmet>
        <div className="page-title-container" style={{ background: bgColour }} ref={backgroundRef}>
          {!noBackButton ? (
            <AppBackButton history={history} />
          ) : null}
          <h1 className="noselect">{title || "BIGAssistant"}</h1>
        </div>
        <div style={{ height: '80px' }}></div>
      </React.Fragment>
  )
}

export default PageTitle
