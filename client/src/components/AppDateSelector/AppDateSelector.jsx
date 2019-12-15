import React, { useState } from 'react'
import './AppDateSelector.css'
import 'date-fns'; import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'

const AppDateSelector = ({ label, defaultDate, onDateChanged }) => {
  const [ date, setDate ] = useState(defaultDate)
  const handleDateChange = (d) => {
    setDate(d)
    if (onDateChanged) onDateChanged(d)
  }

  return (
    <div className="app-date-selector">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker margin="normal" label={label} format="yyyy. MMMM dd."
        value={date} onChange={(date) => {
          handleDateChange(date)
        }} inputVariant="outlined"
        style={{ width: 290 }} />
      </MuiPickersUtilsProvider>
    </div>
  )
}

export default AppDateSelector
