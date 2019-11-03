import React, { useState } from 'react'
import './AppInput.css'

const AppInput = ({ text, placeholder, style, maxLength, onTextChanged }) => {
  const [ value, setValue ] = useState(text)

  return (
    <input type="text" className="app-input" value={value}
    placeholder={placeholder} maxLength={maxLength}
    onChange={(e) => {
      setValue(e.target.value)
      if (onTextChanged) onTextChanged(e.target.value)
    }} style={style} />
  )
}

export default AppInput
