import React, { Component } from 'react'
import './PageNavbar.css'

//Components
import AppButton from '../../AppButton/AppButton'

export class PageNavbarSaveable extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="page-navbar-container">
          <AppButton text={this.props.text} type={this.props.type} onClick={this.props.onClick}
            style={{ width: 'calc(100% - 10px)' }} />
        </div>
      </React.Fragment>
    )
  }
}

export default PageNavbarSaveable
