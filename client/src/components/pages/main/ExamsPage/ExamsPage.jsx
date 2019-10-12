import React, { Component } from 'react'
import MainPageLayout from '../../../layout/MainPageLayout'
import AppPopup from '../../../AppPopup/AppPopup'
import AppButton from '../../../AppButton/AppButton'
import Routes from '../../../../constants/routes'
import AppDivider from '../../../AppDivider'
import LoadingSpinner from '../../../LoadingSpinner'
import AppCardClassContent from '../../../AppCard/AppCardClassContent'
import FirebaseHandler from '../../../../FirebaseHandler'

export class ExamsPage extends Component {
  state = {
    popupVisible: false,
    popupMessage: '',
    exams: []
  }

  componentDidMount() {
    FirebaseHandler.getClientInfo((result) => {
      let classId = result.classId;
      FirebaseHandler.readDataContinuously(`/classes/${classId}/exams`, (snapshot) => {
        snapshot.forEach((examSnapshot) => {
          let exam = examSnapshot.val();
          exam.id = examSnapshot.key;
          this.setState((state) => {
            let updatedState = state;
            updatedState.exams.push(exam);
            return updatedState;
          });
        });
      });
    });
  }

  render() {
    return (
      <MainPageLayout pageTitle="Dolgozatok" pageActive="homework" history={this.props.history}>
        {this.state.popupVisible ? <AppPopup message={this.state.popupMessage} onClose={this.hidePopup} /> : null}
        <AppButton text="Hozzáadás" onClick={() => {this.props.history.push(Routes.HOMEWORK_ADD)}} />
        <AppDivider />
        <div>
          {this.state.exams.length === 0 ? <LoadingSpinner /> : null}
          {this.state.exams.map((exam) => (
            <AppCardClassContent type="exam" {...exam} />
          ))}
        </div>
      </MainPageLayout>
    )
  }
}

export default ExamsPage
