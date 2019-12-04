import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import { appColours } from '../Constants'

export function LoadingSpinner() {
  return (
    <div style={{
      width: 'fit-content',
      height: 40,
      display: 'block',
      margin: 'auto',
      color: appColours.TEXT
    }}>
      <CircularProgress color="inherit" variant="indeterminate" />
    </div>
  )
}

export default LoadingSpinner
