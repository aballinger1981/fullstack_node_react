import { FETCH_SURVEYS } from '../actions/types';

const initialState = {
  returned: false,
  data: [],
};

const surveysReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SURVEYS:
      return { returned: true, data: action.payload };
    default:
      return state;
  }
};

export default surveysReducer;
