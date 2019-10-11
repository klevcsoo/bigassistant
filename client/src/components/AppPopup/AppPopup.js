import React, { Component } from 'react'
import './AppPopup.css'
import AppButton from '../AppButton/AppButton'

export class AppPopup extends Component {
  render() {
    return (
      <div className="app-popup">
        <div>
          <p>{this.props.message}</p>
          <AppButton type="highlight" text="OK" onClick={this.props.onClose} />
        </div>
      </div>
    )
  }
}

export default AppPopup
