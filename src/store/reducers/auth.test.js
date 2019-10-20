import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
  };

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should return a loading status while starting the login process', () => {
    expect(reducer(initialState, {
      type: actionTypes.AUTH_START
    })).toEqual({
      ...initialState,
      error: false,
      loading: true
    })
  });

  it('should store the token upon login', () => {
    expect(reducer(initialState, {
      type: actionTypes.AUTH_SUCCESS,
      idToken: 'some-token',
      userId: 'some-user-id'
    })).toEqual({
      token: 'some-token',
      userId: 'some-user-id',
      error: null,
      loading: false,
      authRedirectPath: '/'
    });
  });

  it('should store the token upon login', () => {
    expect(reducer(initialState, {
      type: actionTypes.AUTH_SUCCESS,
      idToken: 'some-token',
      userId: 'some-user-id'
    })).toEqual({
      token: 'some-token',
      userId: 'some-user-id',
      error: null,
      loading: false,
      authRedirectPath: '/'
    });
  });

  it('should clear the token upon logout', () => {
    expect(reducer({
      ...initialState,
      token: 'some-token',
      userId: 'some-user-id'
    }, {
      type: actionTypes.AUTH_LOGOUT
    })).toEqual(initialState);
  });

  it('should report error upon login failure', () => {
    const error = 'Invalid Username / Password';
    expect(reducer(initialState, {
      type: actionTypes.AUTH_FAIL,
      error
    })).toEqual({
      ...initialState,
      error
    });
  });

  it('should be able to redirect to the path last accessed before trying to log in, upon successful login', () => {
    const path = '/checkout';
    expect(reducer(initialState, {
      type: actionTypes.SET_AUTH_REDIRECT_PATH,
      path
    })).toEqual({
      ...initialState,
      authRedirectPath: path
    })
  });
});