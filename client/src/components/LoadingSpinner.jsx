import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import AppColours from '../constants/AppColours'

export function LoadingSpinner() {
  return (
    <div style={{
      width: 'fit-content',
      height: 40,
      display: 'block',
      margin: 'auto',
      color: AppColours.TEXT
    }}>
      <CircularProgress color="inherit" variant="indeterminate" />
    </div>
  )
}

export default LoadingSpinner
