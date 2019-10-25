import React, { Component } from 'react'
import FirebaseHandler from '../../../utils/FirebaseHandler'
import Routes from '../../../constants/routes'
import { Spring } from 'react-spring/renderprops'

// Components
import MainPageLayout from '../../layout/MainPageLayout'
import AppPopup from '../../AppPopup/AppPopup'
import AppButton from '../../AppButton/AppButton'
import AppDivider from '../../AppDivider'
import LoadingSpinner from '../../LoadingSpinner'
import AppCardClassContent from '../../AppCard/AppCardClassContent'

export class ExamsPage extends Component {
  state = {
    popupVisible: false,
    popupMessage: '',
    exams: [],
    classId: null
  }

  componentDidMount() {
    FirebaseHandler.getClientInfo((result) => {
      let classId = result.classId;
      FirebaseHandler.readDataContinuously(`/classes/${classId}/exams`, (snapshot) => {
        this.setState({ exams: [ null ], classId: classId });
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

  componentWillUnmount() {
    if (this.state.classId) {
      FirebaseHandler.removeDataListener(`/classes/${this.state.classId}/exams`);
    } else console.log('No listener attached.');
  }

  render() {
    return (
      <MainPageLayout pageTitle="Dolgozatok" pageActive="exams" history={this.props.history}>
        {this.state.popupVisible ? <AppPopup message={this.state.popupMessage} onClose={this.hidePopup} /> : null}
        <AppButton text="Hozzáadás" onClick={() => {this.props.history.push(Routes.EXAMS_ADD)}} />
        <AppDivider />
        <div>
          {this.state.exams.length === 0 ? <LoadingSpinner /> : null}
          {this.state.exams.map((exam) => {
            if (exam) return (
              <Spring from={{ opacity: 0 }} to={{ opacity: 1 }} key={exam.id}>
                {(props) => (
                  <div style={props}>
                    <AppCardClassContent type="exam" {...exam} onOpen={() => {
                      this.props.history.push(`${Routes.EXAMS}/${exam.id}`)
                    }} />
                  </div>
                )}
              </Spring>
            ); else return null;
          })}
        </div>
      </MainPageLayout>
    )
  }
}

export default ExamsPage
