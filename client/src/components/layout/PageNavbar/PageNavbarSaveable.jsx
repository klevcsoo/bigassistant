import React from 'react'
import './PageNavbar.css'
import { appColours } from '../../../Constants'

//Components
import AppButton from '../../AppButton/AppButton'

const PageNavbarSaveable = ({ type, text, onClick }) => {
  return (
    <div className="page-navbar-container" style={{
      background: appColours.BACKGROUND
    }}>
      <AppButton text={text} type={type || "highlight"} onClick={onClick}
      style={{ width: 'calc(100% - 10px)' }} />
    </div>
  )
}

export default PageNavbarSaveable
