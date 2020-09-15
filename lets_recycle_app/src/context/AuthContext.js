import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import { navigate } from '../navigationRef';
import firebase from 'firebase';

const API = 'https://lets-recycle-67594.firebaseio.com'

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
    case 'addToUser':
      return { user: { ...state.user, ...action.payload }, errorMessage: '' };
    default:
      return state;
  }
};

const tryLocalSignin = dispatch => async () => {
  // const token = await AsyncStorage.getItem('token');
  user = await firebase.auth().currentUser
  if (user) {
    dispatch({ type: 'signin', payload: user });
    (async () => {
      let results = await fetch(`${API}/users.json?orderBy="id"&equalTo="${user.uid}"`, {
        method: 'GET',
        mode: 'cors',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
      });
      let res = await results.json();
      dispatch({ type: 'addToUser', payload: res[Object.keys(res)[0]] });

    })();
  } else {
    navigate('Signup');
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' });
};

const signup = dispatch => async ({ email, password }) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {

      let user = firebase.auth().currentUser;
      dispatch({ type: 'signin', payload: firebase.auth().currentUser });
      (async () => {
        await fetch(`${API}/users.json`, {
          method: 'POST',
          mode: 'cors',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }),
          body: JSON.stringify({
            "id": user.uid,
            "location": " no location",
            "balance": '0',
            "phoneNumber": 'no number',
          })
        });
      })();

      navigate('Home');

    }).catch(function (error) {
      console.log(error[0])
      console.log("fail");
      dispatch({
        type: 'add_error',
        payload: error[0]
      });
    });
    // console.log("token", firebase.auth().currentUser);

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
        // console.log("done");
        // console.log("token", firebase.auth().currentUser)
        let user = firebase.auth().currentUser;
        dispatch({ type: 'signin', payload: firebase.auth().currentUser });
        (async () => {
          let results = await fetch(`${API}/users.json?orderBy="id"&equalTo="${user.uid}"`, {
            method: 'GET',
            mode: 'cors',
            headers: new Headers({
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }),
          });
          let res = await results.json();
          dispatch({ type: 'addToUser', payload: res[Object.keys(res)[0]] });

        })();
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
  // console.log("obj---------->", obj)
  var user = firebase.auth().currentUser;

  await user.updateProfile({ ...user, ...obj }).then(function () {
    // Update successful.
    (async () => {
      let results = await fetch(`${API}/users.json?orderBy="id"&equalTo="${user.uid}"`, {
        method: 'GET',
        mode: 'cors',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
      });
      let res = await results.json();
      // console.log({ ...res[Object.keys(res)[0]], ...obj }, 'pppppppppppppppppp');
      await fetch(`${API}/users/${Object.keys(res)[0]}.json`, {
        method: 'PUT',
        mode: 'cors',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
        body: JSON.stringify({ ...res[Object.keys(res)[0]], ...obj })
      });
      dispatch({ type: 'addToUser', payload: { ...res[Object.keys(res)[0]], ...obj } });
    })();

    navigate('Profile');
  }).catch(function (error) {
    // An error happened.
    console.log('eeeeeeeeeee', error);
  });

};







export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin, update },
  { user: null, errorMessage: '' }
);
