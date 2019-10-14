import React, { Component } from 'react'
import './AppInput.css'

export class AppInput extends Component {
  state = {
    inputValue: this.props.text
  }

  handleTextChange = (event) => {
    this.setState({
      inputValue: event.target.value
    }, () => { if (this.props.onTextChanged) this.props.onTextChanged(this.state.inputValue); });
  }

  render() {
    return (
      <React.Fragment>
        <input type="text" className="app-input" value={this.state.inputValue}
        placeholder={this.props.placeholder} maxLength={this.props.maxLength}
        onChange={this.handleTextChange} />
      </React.Fragment>
    )
  }
}

export default AppInput
