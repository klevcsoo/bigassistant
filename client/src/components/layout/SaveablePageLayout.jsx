import React, { useEffect } from 'react'
import FirebaseHandler from '../../utils/FirebaseHandler'
import { routes } from '../../Constants'

// Components
import PageTitle from './PageTitle/PageTitle'
import PageNavbarSaveable from './PageNavbar/PageNavbarSaveable'

const SaveablePageLayout = ({ pageTitle, pageType, buttonText, onSave, history, children }) => {
  useEffect(() => {
    FirebaseHandler.getApp().auth().onAuthStateChanged((user) => {
      if (!user) history.push(routes.LOGIN)
    })
  }, [ history ])

  return (
    <React.Fragment>
      <PageTitle title={pageTitle} type={pageType} history={history} />
      <PageNavbarSaveable type={pageType} text={buttonText || 'Mentés'} onClick={onSave} />
      {children}
      <div style={{ height: 80 }}></div>
    </React.Fragment>
  )
}

export default SaveablePageLayout
