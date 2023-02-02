import { USER } from '../actions';

const initialState = {

  email: '',

};

function userReducer(state = initialState, action) {
  switch (action.type) {
  case USER:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
}

export default userReducer;
