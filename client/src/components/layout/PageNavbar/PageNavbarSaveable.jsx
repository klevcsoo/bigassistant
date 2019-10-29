import React, { Component } from 'react'
import './PageNavbar.css'
import AppColours from '../../../constants/appColors'

//Components
import AppButton from '../../AppButton/AppButton'

export class PageNavbarSaveable extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="page-navbar-container" style={{
          backgroundColor: AppColours.getDarkModeEnabled() ? AppColours.LIGHT : AppColours.BACKGROUND
        }}>
          <AppButton text={this.props.text} type={this.props.type || "highlight"} onClick={this.props.onClick}
            style={{ width: 'calc(100% - 10px)' }} />
        </div>
      </React.Fragment>
    )
  }
}

export default PageNavbarSaveable
