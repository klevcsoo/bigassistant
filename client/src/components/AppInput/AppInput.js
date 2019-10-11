import React, { Component } from 'react'
import './AppInput.css'

export class AppInput extends Component {
  state = {
    inputValue: this.props.text
  }

  onTextChanged = (event) => {
    this.setState({
      inputValue: event.target.value
    });
    this.props.onTextChanged(this.state.inputValue);
  }

  render() {
    return (
      <React.Fragment>
        <input type="text" className="app-input" value={this.state.inputValue}
        placeholder={this.props.placeholder} maxLength={this.props.maxLength}
        onChange={this.onTextChanged} />
      </React.Fragment>
    )
  }
}

export default AppInput
