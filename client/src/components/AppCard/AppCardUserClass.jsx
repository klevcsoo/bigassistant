import React, { Component } from 'react'
import './AppCard.css'

export class AppCardUserClass extends Component {
  render() {
    return (
      <div className="app-card">
        {this.props.className ? (
          <p style={{
            margin: '5px 0',
            textAlign: 'center',
            fontWeight: 300,
            fontSize: '20px'
          }}>
            Osztály: <span style={{ fontWeight: 500 }}>{this.props.className}</span>
            <br/>
            Rang: <span style={{ fontWeight: 500 }}>{this.props.classRank}</span>
          </p>
        ) : (
          <p style={{
            margin: '5px 0',
            textAlign: 'center',
            fontWeight: 300,
            fontSize: '20px'
          }}>
            Nem vagy tagja egy osztálynak sem.
          </p>
        )}
      </div>
    )
  }
}

export default AppCardUserClass
