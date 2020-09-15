import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import Spacer from '../components/Spacer';
import { FontAwesome } from '@expo/vector-icons';

const HomeScreen = () => {

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text style={{ fontSize: 48 }}>HomeScreen</Text>
      
    </SafeAreaView>
  );
};

HomeScreen.navigationOptions = {
  title: 'Home',
  tabBarIcon: <FontAwesome name="home" size={24} color="black" />
};

const styles = StyleSheet.create({});

export default HomeScreen;
