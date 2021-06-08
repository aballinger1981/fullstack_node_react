import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSurveys } from '../../actions';

const SurveyList = () => {
  const dispatch = useDispatch();
  const surveys = useSelector((state) => state.surveys);
  useEffect(() => {
    dispatch(fetchSurveys());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {(surveys.returned && surveys.data.reverse().map((survey) => (
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
};

export default SurveyList;
