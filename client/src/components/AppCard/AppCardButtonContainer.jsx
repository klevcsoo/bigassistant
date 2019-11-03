import React from 'react'
import './AppCard.css'

const AppCardButtonContainer = ({ children }) => {
  return (
    <div className="app-card app-card-button-container">
      {children}
    </div>
  )
}

export default AppCardButtonContainer
