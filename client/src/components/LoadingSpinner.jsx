import React, { useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import { appColours } from '../Constants'
import { Fade, Zoom } from '@material-ui/core'

export function LoadingSpinner() {
  const [ visible, setVisible ] = useState(false)

  setTimeout(() => setVisible(true), 500);

  return (
    <div style={{
      width: 'fit-content',
      height: 40,
      display: 'block',
      margin: 'auto',
      color: appColours.TEXT
    }}>
      {!visible ? null : (
        <Zoom in={visible}>
          <CircularProgress color="inherit" variant="indeterminate" />
        </Zoom>
      )}
    </div>
  )
}

export default LoadingSpinner
