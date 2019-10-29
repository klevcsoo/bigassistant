import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import AppColours from '../constants/appColors'

export function LoadingSpinner() {
  return (
    <div style={{
      width: 'fit-content',
      display: 'block',
      margin: 'auto',
      color: AppColours.TEXT
    }}>
      <CircularProgress color="inherit" variant="indeterminate" />
    </div>
  )
}

export default LoadingSpinner
