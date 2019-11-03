import React from 'react'
import './AppButton.css'
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded'

const AppMenuButton = ({ facebook, onClick, text }) => {
  let classFacebook = facebook ? 'app-button-facebook' : ''

  return (
    <button className={`app-button ${classFacebook}`} onClick={() => {setTimeout(onClick, 200)}}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'auto min-content'
      }}>
        <h2 style={{ textAlign: 'left' }}>{text}</h2>
        <div style={{ padding: '6px 0' }}><ArrowForwardIosRoundedIcon /></div>
      </div>
    </button>
  )
}

export default AppMenuButton
