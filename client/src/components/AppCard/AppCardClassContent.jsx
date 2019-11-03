import React from 'react'
import './AppCard.css'
import LocalizationHandler from './../../utils/LocalizationHandler'

const AppCardClassContent = ({ type, onOpen, title, subject, date }) => {
  return (
    <div>
      <div className={`app-card app-card-class-content app-card-${type}`}
      onClick={() => {setTimeout(() => { if (onOpen) onOpen(); }, 200)}}>
        <h1 id="content-title">{title}</h1>
        <p>Tantárgy: <span id="content-subject">{subject}</span></p>
        <p>Időpont: <span id="content-date">{LocalizationHandler.formatDate(date)}</span></p>
      </div>
    </div>
  )
}

export default AppCardClassContent
