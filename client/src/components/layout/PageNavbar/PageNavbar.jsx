import React from 'react'
import './PageNavbar.css'
import Routes from '../../../constants/routes'
import AppColours from '../../../constants/appColors'

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

  return (
    <div className="page-navbar-container" style={{
      backgroundColor: AppColours.getDarkModeEnabled() ? AppColours.LIGHT : AppColours.BACKGROUND
    }}>
      <button className="icon" onClick={loadPage.bind(this, Routes.CLASS)}>
        <ClassIcon style={{ fill: active === 'class' ? AppColours.MAIN : AppColours.TEXT }} />
      </button>
      <button className="icon" onClick={loadPage.bind(this, Routes.HOMEWORK)}>
        <HomeworkIcon style={{ fill: active === 'homework' ? AppColours.MAIN : AppColours.TEXT }} />
      </button>
      <button className="icon" onClick={loadPage.bind(this, Routes.HOME)}>
        <HomeIcon style={{ fill: active === 'home' ? AppColours.MAIN : AppColours.TEXT }} />
      </button>
      <button className="icon" onClick={loadPage.bind(this, Routes.EXAMS)}>
        <ExamsIcon style={{ fill: active === 'exams' ? AppColours.MAIN : AppColours.TEXT }} />
      </button>
      <button className="icon" onClick={loadPage.bind(this, Routes.USER)}>
        <UserIcon style={{ fill: active === 'user' ? AppColours.MAIN : AppColours.TEXT }} />
      </button>
    </div>
  )
}

export default PageNavbar
