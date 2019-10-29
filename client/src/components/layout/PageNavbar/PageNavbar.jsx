import React, { Component } from 'react'
import './PageNavbar.css'
import Routes from '../../../constants/routes'
import AppColours from '../../../constants/appColors'

// Icons
import ClassIcon from '@material-ui/icons/PeopleRounded'
import HomeworkIcon from '@material-ui/icons/HomeWorkRounded'
import HomeIcon from '@material-ui/icons/HomeRounded'
import ExamsIcon from '@material-ui/icons/MenuBookRounded'
import UserIcon from '@material-ui/icons/PersonRounded'

export class PageNavbar extends Component {
  loadPage = (link) => {
    if (this.props.history.location.pathname === link) return;
    setTimeout(() => { this.props.history.push(link); }, 200);
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-navbar-container" style={{
          backgroundColor: AppColours.getDarkModeEnabled() ? AppColours.LIGHT : AppColours.BACKGROUND
        }}>
          <button className="icon" onClick={this.loadPage.bind(this, Routes.CLASS)}>
            <ClassIcon style={{ fill: this.props.active === 'class' ? AppColours.MAIN : AppColours.TEXT }} />
          </button>
          <button className="icon" onClick={this.loadPage.bind(this, Routes.HOMEWORK)}>
            <HomeworkIcon style={{ fill: this.props.active === 'homework' ? AppColours.MAIN : AppColours.TEXT }} />
          </button>
          <button className="icon" onClick={this.loadPage.bind(this, Routes.HOME)}>
            <HomeIcon style={{ fill: this.props.active === 'home' ? AppColours.MAIN : AppColours.TEXT }} />
          </button>
          <button className="icon" onClick={this.loadPage.bind(this, Routes.EXAMS)}>
            <ExamsIcon style={{ fill: this.props.active === 'exams' ? AppColours.MAIN : AppColours.TEXT }} />
          </button>
          <button className="icon" onClick={this.loadPage.bind(this, Routes.USER)}>
            <UserIcon style={{ fill: this.props.active === 'user' ? AppColours.MAIN : AppColours.TEXT }} />
          </button>
        </div>
      </React.Fragment>
    )
  }
}

export default PageNavbar
