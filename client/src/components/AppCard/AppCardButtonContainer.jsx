import React, { Component } from 'react'
import './AppCard.css'

export class AppCardButtonContainer extends Component {
  render() {
    return (
      <div className="app-card app-card-button-container">
        {this.props.children}
      </div>
    )
  }
}

export default AppCardButtonContainer
