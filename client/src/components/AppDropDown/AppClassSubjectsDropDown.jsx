import React, { Component } from 'react'
import AppDropDown from './AppDropDown'
import FirebaseHandler from '../../utils/FirebaseHandler'
import LoadingSpinner from '../LoadingSpinner'

export class AppClassSubjectsDropDown extends Component {
  state = {
    subjects: []
  }

  subjectChoosen = (e) => {
    if (this.props.onSubjectChoosen) this.props.onSubjectChoosen(e.target.value);
  }

  componentDidMount() {
    FirebaseHandler.getClientInfo((result) => {
      let classId = result.classId;
      FirebaseHandler.readData(`/classes/${classId}/metadata/subjects`, (snapshot) => {
        snapshot.forEach((subjectSnapshot) => {
          this.setState((state) => {
            state.subjects.push(subjectSnapshot.val());
            return state;
          });
        });
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.subjects.length === 0 ? <LoadingSpinner /> : (
          <AppDropDown onSelected={this.subjectChoosen}>
            <option value="">--Tantárgy--</option>
            {this.state.subjects.map((subject) => (
              <option value={subject} key={String(subject).toLowerCase()}>{subject}</option>
            ))}
          </AppDropDown>
        )}
      </React.Fragment>
    )
  }
}

export default AppClassSubjectsDropDown
