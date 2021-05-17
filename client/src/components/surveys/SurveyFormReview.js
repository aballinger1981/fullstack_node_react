import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions';

const SurveyFormReview = ({
  onCancel, formValues, submitSurvey, history,
}) => (
  <div>
    <h5>Please confirm your entries</h5>
    <div>
      {(formFields.map(({ name, label }) => (
        <div key={name}>
          <label>{label}</label>
          <div>
            {formValues[name]}
          </div>
        </div>
      )))}
    </div>
    <button
      className="yellow darken-3 btn-flat white-text"
      onClick={onCancel}
    >
      Back
    </button>
    <button
      className="green btn-flat right white-text"
      onClick={() => submitSurvey(formValues, history)}
    >
      Send Survey
      <i className="material-icons right">email</i>
    </button>
  </div>
);

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values,
  };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
