import React, { Component } from 'react'

export class UserProfileHeader extends Component {
  render() {
    return (
      <React.Fragment>
        <div style={{
          width: '100vw', height: '30vh',
          margin: '20px 0 0 0', padding: '0 0 10px 0',
          overflow: 'hidden'
        }}>
          <img src={this.props.photo} alt="Profilkép" style={{
            width: '30vh', height: '30vh',
            display: 'block',
            margin: 'auto', padding: 0,
            objectFit: 'cover',
            borderRadius: '15vh'
          }} />
        </div>

        <h1 style={{
          margin: '10px auto',
          fontFamily: '"Rubik", sans-serif',
          fontWeight: 500,
          fontSize: '42px',
          textAlign: 'center'
        }}>{this.props.name}</h1>
      </React.Fragment>
    )
  }
}

export default UserProfileHeader
