//actions/user.js
import * as userActions from '../actionTypes/user';

const login = (username) => {
    return async dispatch => {
        try {
            dispatch({
                type: userActions.LOGIN,
                payload: username
            });
        }catch(error){
            console.log("Error login actions/user.js: ", error);
        }
    };
};

const logout = (username) => {
    return async dispatch => {
        dispatch({
            type : userActions.LOGOUT,
            payload : username
        });
    };
};

const show_data = (data) => {
    //console.log("actions/user.js show_data: ", data);
    return async dispatch => {
        dispatch({
            type: userActions.SHOW_DATA,
            payload: data
        });
    }
};

export {login, logout, show_data};