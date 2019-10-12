import React, { Component } from 'react'
import './AppCard.css'

export class AppCardClassContent extends Component {
  render() {
    return (
      <div className={`app-card app-card-class-content app-card-${this.props.type}`}>
        <h1 id="content-title">{this.props.title}</h1>
        <p>Tantárgy: <span id="content-subject">{this.props.subject}</span></p>
        <p>Időpont: <span id="content-date">{this.props.date}</span></p>
      </div>
    )
  }
}

export default AppCardClassContent
