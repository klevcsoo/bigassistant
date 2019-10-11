import React, { Component } from 'react'
import AppTitle from '../AppTitle'
import AppSubtitle from '../AppSubtitle'
import AppButton from '../AppButton/AppButton'
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

export class NotFoundPage extends Component {
  render() {
    return (
      <React.Fragment>
        <button style={{
          width: 50, height: 50,
          background: 'transparent',
          border: 'none'
        }} onClick={() => {this.props.history.goBack()}}><ArrowBackRoundedIcon /></button>
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          <p style={{
            margin: 30, padding: 0,
            textAlign: 'center',
            fontSize: 100
          }}><span role="img">🙈</span></p>
          <AppTitle text="Oldal nem található!" />
          <AppSubtitle text="Az adott link nem vezet semmilyen oldalhoz." />
          <AppButton type="highlight" text="Vissza a kezdőlapra" />
        </div>
      </React.Fragment>
    )
  }
}

export default NotFoundPage

