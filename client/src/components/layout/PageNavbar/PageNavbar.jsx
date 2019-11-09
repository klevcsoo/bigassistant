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
    setTimeout(() => { history.push(link) }, 200)
  }

  const activeColour = AppColours.LIGHT

  return (
    <div className="page-navbar-container">
      <button className="icon" onClick={loadPage.bind(this, Routes.CLASS)}>
        <ClassIcon style={{ fill: active === 'class' ? activeColour : AppColours.TEXT }} />
      </button>
      <button className="icon" onClick={loadPage.bind(this, Routes.HOMEWORK)}>
        <HomeworkIcon style={{ fill: active === 'homework' ? activeColour : AppColours.TEXT }} />
      </button>
      <button className="icon" onClick={loadPage.bind(this, Routes.HOME)}>
        <HomeIcon style={{ fill: active === 'home' ? activeColour : AppColours.TEXT }} />
      </button>
      <button className="icon" onClick={loadPage.bind(this, Routes.EXAMS)}>
        <ExamsIcon style={{ fill: active === 'exams' ? activeColour : AppColours.TEXT }} />
      </button>
      <button className="icon" onClick={loadPage.bind(this, Routes.USER)}>
        <UserIcon style={{ fill: active === 'user' ? activeColour : AppColours.TEXT }} />
      </button>
    </div>
  )
}
export default PageNavbar
