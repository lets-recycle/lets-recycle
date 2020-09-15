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
      <Spacer>
        <Button title="Sign Out" onPress={signout} />
      </Spacer>
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = {
  title: 'Home',
  tabBarIcon: <FontAwesome name="gear" size={20} />
};

const styles = StyleSheet.create({});

export default HomeScreen;
