import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';

// import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screen/SigninScreen';
import SignupScreen from './src/screen/SignupScreen';

import { Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator } from './src/navigationRef';
import ResolveAuthScreen from './src/screen/ResolveAuthScreen';



const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  // mainFlow: createBottomTabNavigator({
  
  // }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App
            ref={(navigator) => {
              setNavigator(navigator);
            }}
          />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};
