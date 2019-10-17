import React, { Component } from 'react'

// Components
import PageTitle from './PageTitle/PageTitle';
import PageNavbarSaveable from './PageNavbar/PageNavbarSaveable';

export class SaveablePageLayout extends Component {
  render() {
    return (
      <React.Fragment>
        <PageTitle title={this.props.pageTitle} type={this.props.pageType} history={this.props.history} />
        <PageNavbarSaveable type={this.props.type} text={this.props.buttonText || 'Mentés'} onClick={this.props.onSave} />
        {this.props.children}
        <div style={{ height: 80 }}></div>
      </React.Fragment>
    )
  }
}

export default SaveablePageLayout
