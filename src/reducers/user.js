//reducers/user.js
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import * as userActions from '../actionTypes/user';

const initialState = {
    user: null,
    isLogged: false,
    data: null
  };

const user = (state = initialState, action) => {
    switch (action.type) {
        case userActions.LOGIN:
          return {
            ...state,
            user: action.payload,
            isLogged: true
          };
        case userActions.LOGOUT:
          return {
            ...state,
            user: null,
            isLogged: false
          };
        case userActions.SHOW_DATA:
          return {
            ...state,
            data: action.payload
          }
        default:
          return state;
      }
};


const userStore = createStore(user, applyMiddleware(thunk));

export default userStore;