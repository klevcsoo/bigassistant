import React, { useState } from 'react'
import './AppSwitch.css'

const AppSwitch = ({ checked, text, description, onCheckedChanged }) => {
  const [ checkedState, setCheckedState ] = useState(checked)

  return (
    <div className="app-switch">
      <h2 style={{
        fontWeight: description ? 400 : 300
      }}>{text}</h2>
      <label className="app-switch-label">
        <input type="checkbox" onChange={(e) => {
          setCheckedState(e.target.checked)
          if (onCheckedChanged) onCheckedChanged(e.target.checked)
        }} className="app-switch-input" id="closed-class-switch" checked={checkedState} />
        <span className="app-switch-span noshadow"></span>
      </label>
      {description ? (<p>{description}</p>) : null}
    </div>
  )
}

export default AppSwitch
