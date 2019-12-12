import React from 'react'
import './PageNavbar.css'
import { routes } from '../../../Constants'
import { appColours } from '../../../Constants'

// Icons
import ClassIcon from '@material-ui/icons/PeopleRounded'
import HomeworkIcon from '@material-ui/icons/HomeWorkRounded'
import HomeIcon from '@material-ui/icons/HomeRounded'
import ExamsIcon from '@material-ui/icons/MenuBookRounded'
import UserIcon from '@material-ui/icons/PersonRounded'

const PageNavbar = ({ history, active }) => {
  const loadPage = (link) => {
    if (link === history.location.pathname) return
    setTimeout(() => { history.replace(link) }, 200)
  }

  const activeColour = appColours.MAIN
  const activeBorder = `3px solid ${activeColour}`

  return (
    <div className="page-navbar-container">
      <div className="icon" onClick={loadPage.bind(this, routes.CLASS)}
      style={{ borderTop: active === 'class' ? activeBorder : 'none' }}>
        <ClassIcon style={{ fill: active === 'class' ? activeColour : appColours.TEXT }} />
        <p>Osztály</p>
      </div>
      <div className="icon" onClick={loadPage.bind(this, routes.HOMEWORK)}
      style={{ borderTop: active === 'homework' ? activeBorder : 'none' }}>
        <HomeworkIcon style={{ fill: active === 'homework' ? activeColour : appColours.TEXT }} />
        <p>Házi</p>
      </div>
      <div className="icon" onClick={loadPage.bind(this, routes.HOME)}
      style={{ borderTop: active === 'home' ? activeBorder : 'none' }}>
        <HomeIcon style={{ fill: active === 'home' ? activeColour : appColours.TEXT }} />
        <p>Attekintes</p>
      </div>
      <div className="icon" onClick={loadPage.bind(this, routes.EXAMS)}
      style={{ borderTop: active === 'exams' ? activeBorder : 'none' }}>
        <ExamsIcon style={{ fill: active === 'exams' ? activeColour : appColours.TEXT }} />
        <p>Dolgozatok</p>
      </div>
      <div className="icon" onClick={loadPage.bind(this, routes.USER)}
      style={{ borderTop: active === 'user' ? activeBorder : 'none' }}>
        <UserIcon style={{ fill: active === 'user' ? activeColour : appColours.TEXT }} />
        <p>Profil</p>
      </div>
    </div>
  )
}
export default PageNavbar
