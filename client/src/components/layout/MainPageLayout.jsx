import React, { useEffect } from 'react'
import FirebaseHandler from '../../utils/FirebaseHandler'
import { routes } from '../../Constants'

// Components
import PageTitle from './PageTitle/PageTitle';
import PageNavbar from './PageNavbar/PageNavbar';

const MainPageLayout = ({ pageTitle, pageActive, history, children }) => {
  useEffect(() => {
    FirebaseHandler.getApp().auth().onAuthStateChanged((user) => {
      if (!user) history.push(routes.LOGIN)
    })
  }, [ history ])

  return (
    <React.Fragment>
      <PageTitle title={pageTitle} history={history} noBackButton />
      <PageNavbar active={pageActive} history={history} />
      {children}
      <div style={{ height: 80 }}></div>
    </React.Fragment>
  )
}

export default MainPageLayout
