import React, { Component } from 'react'
import './AppSwitch.css'

export class AppSwitch extends Component {
  state = {
    checked: this.props.checked
  }

  onCheckedChanged = (event) => {
    this.setState({
      checked: event.target.checked
    });
    this.props.onCheckedChanged(this.state.checked);
  }

  render() {
    return (
      <div className="app-switch" style={{ marginTop: '10px' }}>
        <h2>{this.props.text}</h2>
        <label className="app-switch-label">
          <input type="checkbox" onChange={this.onCheckedChanged} className="app-switch-input" id="closed-class-switch" checked={this.state.checked} />
          <span className="app-switch-span noshadow"></span>
        </label>
        <p>{this.props.description}</p>
      </div>
    )
  }
}

export default AppSwitch
