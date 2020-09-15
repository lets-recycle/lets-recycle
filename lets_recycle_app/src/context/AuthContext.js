import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import { navigate } from '../navigationRef';
import firebase from 'firebase';
const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'signin':
      return { errorMessage: '', user: action.payload };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    case 'signout':
      return { user: null, errorMessage: '' };
    default:
      return state;
  }
};

const tryLocalSignin = dispatch => async () => {
  // const token = await AsyncStorage.getItem('token');
  user = await firebase.auth().currentUser
  if (user) {
    dispatch({ type: 'signin', payload: user });
  } else {
    navigate('Signup');
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' });
};

const signup = dispatch => async ({ email, password }) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
      console.log(error[0])
      console.log("fail");
      dispatch({
        type: 'add_error',
        payload: error[0]
      });
    });
    console.log("token", firebase.auth().currentUser);
    dispatch({ type: 'signin', payload: firebase.auth().currentUser });
    navigate('Home');
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
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(async function () {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        await firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
          console.log("fail");
          dispatch({
            type: 'add_error',
            payload: 'Something went wrong with sign in'
          });
        });
        console.log("done");
        console.log("token", firebase.auth().currentUser)
        dispatch({ type: 'signin', payload: firebase.auth().currentUser });

      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });
    navigate('Home');
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign in'
    });
  }
};

const signout = dispatch => async () => {
  // await AsyncStorage.removeItem('token');
  dispatch({ type: 'signout' });
  navigate('loginFlow');
};

const update = dispatch => async (obj) => {
  // await AsyncStorage.removeItem('token');
  console.log("obj---------->",obj)
  var user = firebase.auth().currentUser;
  await user.updateProfile({...user,...obj}).then(function () {
    // Update successful.
  //   dispatch({ type: 'signin' });
   navigate('Profile');
  }).catch(function (error) {
    // An error happened.
  });
  
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin,update },
  { user: null, errorMessage: '' }
);
