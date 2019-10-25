import React, { Component } from 'react'
import AppTitle from '../AppTitle'
import AppSubtitle from '../AppSubtitle'
import AppButton from '../AppButton/AppButton'
import Routes from '../../constants/routes';
import AppBackButton from '../AppButton/AppBackButton';

export class NotFoundPage extends Component {
  render() {
    return (
      <React.Fragment>
        <AppBackButton history={this.props.history} />
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          <p style={{
            margin: 10, padding: 0,
            textAlign: 'center',
            fontSize: 100
          }}><span role="img" aria-label="monkey">🙈</span></p>
          <AppTitle text="Oldal nem található!" />
          <AppSubtitle text="Az adott link nem vezet semmilyen oldalhoz." />
          <AppButton type="highlight" text="Vissza a kezdőlapra" onClick={() => {this.props.history.push(Routes.HOME)}} />
        </div>
      </React.Fragment>
    )
  }
}

export default NotFoundPage

