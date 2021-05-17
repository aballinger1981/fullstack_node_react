import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  render() {
    return (
      <div>
        {(console.log(this.props.surveys))}
        {(this.props.surveys.map((survey) => (
          // eslint-disable-next-line no-underscore-dangle
          <div className="card darken-1 blue-grey" key={survey._id}>
            <div className="card-content white-text">
              <span className="card-title">{survey.title}</span>
              <p>
                {survey.body}
              </p>
              <p className="right">
                Sent On: {new Date(survey.dateSent).toLocaleDateString()}
              </p>
            </div>
            <div className="card-action">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>Yes: {survey.yes}</a>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>No: {survey.no}</a>
            </div>
          </div>
        )))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { surveys: state.surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
