import React, { Component } from 'react'

// Components
import PageTitle from './PageTitle/PageTitle';
import PageNavbarSaveable from './PageNavbar/PageNavbarSaveable';

export class SaveablePageLayout extends Component {
  render() {
    return (
      <React.Fragment>
        <PageTitle title="Házi feladat" type="homework" />
        <PageNavbarSaveable type="homework" text="Hozzáadás" onClick={this.props.onSave} />
        {this.props.children}
        <div style={{ height: 80 }}></div>
      </React.Fragment>
    )
  }
}

export default SaveablePageLayout
