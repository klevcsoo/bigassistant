import React from 'react'
import { appColours } from './../../Constants'

const AppDropDown = ({ onSelected, children }) => {
  return (
    <div style={{ width: 'fit-content', margin: '5px auto' }}>
      <select style={{
        width: 290,
        height: 40,
        padding: '0 15px',
        color: 'white',
        background: appColours.LIGHT,
        border: 'none',
        borderRadius: 10,
        fontFamily: '"Roboto", sans-serif',
        fontSize: 20,
        fontWeight: 300
      }} onChange={onSelected}>
        {children}
      </select>
    </div>
  )
}

export default AppDropDown
