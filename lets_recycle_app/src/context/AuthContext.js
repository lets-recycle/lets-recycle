import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import { navigate } from '../navigationRef';
import firebase from 'firebase';
const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'signin':
      return { errorMessage: '', token: action.payload };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    case 'signout':
      return { token: null, errorMessage: '' };
    default:
      return state;
  }
};

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: 'signin', payload: token });
  } else {
    navigate('Signup');
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' });
};

const signup = dispatch => async ({ email, password }) => {
  try {
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        console.log(error[0])
        console.log("fail");
           dispatch({
            type: 'add_error',
            payload: error[0]
          });
      });
  } catch (err) {
    console.log(err)
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign up'
    });
  }
};

const signin = dispatch => async ({ email, password }) => {
  try {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      console.log("fail");
      dispatch({
         type: 'add_error',
         payload: 'Something went wrong with sign in'
       });
   });
   console.log("done");
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign in'
    });
  }
};

const signout = dispatch => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: 'signout' });
  navigate('loginFlow');
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: '' }
);
