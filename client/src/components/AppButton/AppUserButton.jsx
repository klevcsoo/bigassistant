import React, { Component } from 'react'
import './AppButton.css'

export class AppUserButton extends Component {
  render() {
    return (
      <button type="button" className="app-button app-button-classmate" onClick={() => {setTimeout(this.props.onClick, 200)}}>
        <div>
          <img src={this.props.photo} alt="Profilkép"/>
          <h2>{this.props.name}</h2>
        </div>
      </button>
    )
  }
}

export default AppUserButton
