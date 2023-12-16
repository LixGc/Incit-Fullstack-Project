import { USER_DASHBOARD_FETCH_SUCCESS, USER_PROFILE_FETCH_SUCCESS } from "../actions/actionTypes";

const initialState = {
  user: [],
  users: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_PROFILE_FETCH_SUCCESS:
      return { ...state, user: action.payload };
    case USER_DASHBOARD_FETCH_SUCCESS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
}

export default userReducer;
