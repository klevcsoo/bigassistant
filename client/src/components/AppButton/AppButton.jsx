import React, { Component } from 'react'
import './AppButton.css'

export class AppButton extends Component {
  render() {
    let type = this.props.type ? `app-button-${this.props.type}` : ''
    let facebook = this.props.facebook ? 'app-button-facebook' : ''

    return (
      <React.Fragment>
        <button className={`app-button ${type} ${facebook}`} onClick={() => {setTimeout(this.props.onClick, 200)}} style={this.props.style}><h2>{this.props.text}</h2></button>
      </React.Fragment>
    )
  }
}

export default AppButton
