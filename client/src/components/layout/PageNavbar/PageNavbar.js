import React, { Component } from 'react'
import './PageNavbar.css'
import Routes from '../../../constants/routes'

// Icons
import ClassIcon from '@material-ui/icons/PeopleRounded'
import HomeworkIcon from '@material-ui/icons/HomeWorkRounded'
import HomeIcon from '@material-ui/icons/HomeRounded'
import ExamsIcon from '@material-ui/icons/MenuBookRounded'
import UserIcon from '@material-ui/icons/PersonRounded'

export class PageNavbar extends Component {
  loadPage = (link) => {
    setTimeout(() => { this.props.history.push(link); }, 200);
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-navbar-container">
          <button className="icon" onClick={this.loadPage.bind(this, Routes.CLASS)}>
            <ClassIcon className={this.props.active === 'class' ? 'active' : ''} />
          </button>
          <button className="icon" onClick={this.loadPage.bind(this, Routes.HOMEWORK)}>
            <HomeworkIcon className={this.props.active === 'homework' ? 'active' : ''} />
          </button>
          <button className="icon" onClick={this.loadPage.bind(this, Routes.HOME)}>
            <HomeIcon className={this.props.active === 'home' ? 'active' : ''} />
          </button>
          <button className="icon" onClick={this.loadPage.bind(this, Routes.EXAMS)}>
            <ExamsIcon className={this.props.active === 'exams' ? 'active' : ''} />
          </button>
          <button className="icon" onClick={this.loadPage.bind(this, Routes.USER)}>
            <UserIcon className={this.props.active === 'user' ? 'active' : ''} />
          </button>
        </div>
      </React.Fragment>
    )
  }
}

export default PageNavbar
