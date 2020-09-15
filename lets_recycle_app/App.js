import React , {useEffect} from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import AccountScreen from './src/screen/AccountScreen';
import SigninScreen from './src/screen/SigninScreen';
import SignupScreen from './src/screen/SignupScreen';
import intro from './src/screen/introduction'
import { Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator } from './src/navigationRef';
import ResolveAuthScreen from './src/screen/ResolveAuthScreen';
import HomeScreen from './src/screen/HomeScreen';
import Edit from './src/screen/Edit';
var firebase = require('firebase');

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmFQZa4eTTWM06hLX8eHkGvLPSxfuH2TQ",
  authDomain: "letsrecycle-4a538.firebaseapp.com",
  databaseURL: "https://letsrecycle-4a538.firebaseio.com",
  projectId: "letsrecycle-4a538",
  storageBucket: "letsrecycle-4a538.appspot.com",
  messagingSenderId: "603660001635",
  appId: "1:603660001635:web:fd2efb57b09693025ff356",
  measurementId: "G-ML2MLFZLFZ"
};


 


const switchNavigator = createSwitchNavigator({
  intro,
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  mainFlow: createBottomTabNavigator({
  Home:HomeScreen,
  Profile:AccountScreen,
  }),
  Edit,
});

const App = createAppContainer(switchNavigator);

export default () => {
  useEffect(() => {
    // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
  }, []);
  return (
    
        <AuthProvider>
          <App
            ref={(navigator) => {
              setNavigator(navigator);
            }}
          />
        </AuthProvider>
    
  );
};
