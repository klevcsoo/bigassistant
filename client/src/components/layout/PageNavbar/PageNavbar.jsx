import React from 'react'
import './PageNavbar.css'
import Routes from '../../../constants/routes'
import AppColours from '../../../constants/AppColours'

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

  const activeColour = AppColours.MAIN_MONO
  const activeBorder = `3px solid ${activeColour}`

  return (
    <div className="page-navbar-container">
      <button className="icon" onClick={loadPage.bind(this, Routes.CLASS)}
      style={{ borderTop: active === 'class' ? activeBorder : 'none' }}>
        <ClassIcon style={{ fill: active === 'class' ? activeColour : AppColours.TEXT }} />
      </button>
      <button className="icon" onClick={loadPage.bind(this, Routes.HOMEWORK)}
      style={{ borderTop: active === 'homework' ? activeBorder : 'none' }}>
        <HomeworkIcon style={{ fill: active === 'homework' ? activeColour : AppColours.TEXT }} />
      </button>
      <button className="icon" onClick={loadPage.bind(this, Routes.HOME)}
      style={{ borderTop: active === 'home' ? activeBorder : 'none' }}>
        <HomeIcon style={{ fill: active === 'home' ? activeColour : AppColours.TEXT }} />
      </button>
      <button className="icon" onClick={loadPage.bind(this, Routes.EXAMS)}
      style={{ borderTop: active === 'exams' ? activeBorder : 'none' }}>
        <ExamsIcon style={{ fill: active === 'exams' ? activeColour : AppColours.TEXT }} />
      </button>
      <button className="icon" onClick={loadPage.bind(this, Routes.USER)}
      style={{ borderTop: active === 'user' ? activeBorder : 'none' }}>
        <UserIcon style={{ fill: active === 'user' ? activeColour : AppColours.TEXT }} />
      </button>
    </div>
  )
}
export default PageNavbar
