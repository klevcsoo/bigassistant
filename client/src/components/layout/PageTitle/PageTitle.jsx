import React from 'react'
import './PageTitle.css'
import { Helmet } from 'react-helmet';

// Components
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import AppColours from '../../../constants/AppColours';

const PageTitle = ({ type, title, noBackButton, history }) => {
  let bgColour = type === 'homework' ? AppColours.HOMEWORK
               : type === 'exam' ? AppColours.EXAM
               : AppColours.BACKGROUND

  return (
    <React.Fragment>
        <Helmet>
          <meta name="theme-color" content={bgColour} />
          <title>{title}</title>
        </Helmet>
        <div className="page-title-container" style={{ background: bgColour }}>
          {!noBackButton ? (
            <button onClick={() => { if (history) history.goBack() }}>
              <ArrowBackRoundedIcon style={{ fill: AppColours.TEXT }} />
            </button>
          ) : null}
          <h1 className="noselect">{title || "BIGAssistant"}</h1>
        </div>
        <div style={{ height: '80px' }}></div>
      </React.Fragment>
  )
}

export default PageTitle
