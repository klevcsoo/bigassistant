import React, { Component } from 'react'
import './AppCard.css'

export class AppCard extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.title ? <h1 className="app-card-group-title">{this.props.title}</h1> : null}
        <div className="app-card"></div>
      </React.Fragment>
    )
  }
}

export default AppCard
