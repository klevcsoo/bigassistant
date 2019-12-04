import React from 'react'
import AppTitle from '../AppTitle'
import AppSubtitle from '../AppSubtitle'
import AppButton from '../AppButton/AppButton'
import { routes } from '../../Constants';
import AppBackButton from '../AppButton/AppBackButton';

const NotFoundPage = ({ history }) => {
  return (
    <React.Fragment>
      <AppBackButton history={history} />
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
        <AppButton type="highlight" text="Vissza a kezdőlapra" onClick={() => {history.push(routes.HOME)}} />
      </div>
    </React.Fragment>
  )
}

export default NotFoundPage
