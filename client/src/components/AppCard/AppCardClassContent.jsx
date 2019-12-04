import React from 'react'
import './AppCard.css'
import LocalizationHandler from './../../utils/LocalizationHandler'
import { appColours } from '../../Constants'

const AppCardClassContent = ({ type, onOpen, title, subject, date }) => {
  return (
    <div className={`app-card app-card-class-content`}
    onClick={() => {setTimeout(() => { if (onOpen) onOpen(); }, 200)}}>
      <div className="accent" style={{
        background: type === 'exam' ? appColours.EXAM : type === 'homework' ? appColours.HOMEWORK : appColours.MAIN
      }}></div>
      <div className="content">
        <h1 id="content-title">{title}</h1>
        <p>Tantárgy: <span id="content-subject">{subject}</span></p>
        <p>Időpont: <span id="content-date">{LocalizationHandler.formatDate(date)}</span></p>
      </div>
    </div>
  )
}

export default AppCardClassContent
