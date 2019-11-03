import * as actionTypes from './actionTypes';
//import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const authLogout = () => {
  // Below code works with Redux Thunk
  // localStorage.removeItem('token');
  // localStorage.removeItem('expirationDate');
  // localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  }
}

export const authLogoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = (expirationTime) => {
  // Below code works with Redux Thunk
  // return dispatch => {
  //   setTimeout(() => {
  //     dispatch(authLogout());
  //   }, expirationTime * 1000);
  // }
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime
  }
}

export const auth = (email, password, isSignup) => {
  // Below code works with Redux Thunk
  // return dispatch => {
  //   dispatch(authStart());
  //   const authData = {
  //     email,
  //     password,
  //     returnSecureToken: true
  //   }
  //   let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-DB4_5VXkSgLksbAKecX-hMH8bsVtAaU';
  //   if (!isSignup) {
  //     url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-DB4_5VXkSgLksbAKecX-hMH8bsVtAaU';
  //   }
  //   axios.post(url, authData)
  //        .then(response => {
  //          const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
  //          localStorage.setItem('token', response.data.idToken);
  //          localStorage.setItem('expirationDate', expirationDate);
  //          localStorage.setItem('userId', response.data.localId);
  //          dispatch(authSuccess(response.data.idToken, response.data.localId));
  //          dispatch(checkAuthTimeout(response.data.expiresIn));
  //        })
  //        .catch(error => {
  //          dispatch(authFail(error.response.data.error));
  //        })
  // }
  return {
    type: actionTypes.AUTH_USER,
    email,
    password,
    isSignup
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  }
}

export const authCheckState = () => {
  // Below code works with Redux Thunk
  // return dispatch => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     dispatch(authLogout());
  //   } else {
  //     const expirationDate = new Date(localStorage.getItem('expirationDate'));
  //     if (expirationDate <= new Date()) {
  //       dispatch(authLogout());
  //     } else {
  //       dispatch(authSuccess(token, localStorage.getItem('userId')));
  //       dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
  //     }
  //   }
  // }
  return {
    type: actionTypes.AUTH_CHECK_STATE
  }
}