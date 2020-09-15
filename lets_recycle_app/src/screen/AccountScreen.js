import React, { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AccountScreen = ({ navigation }) => {
  const { signout, state } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text style={{ fontSize: 48 }}>Profile</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Edit')
        }
      >
        <MaterialCommunityIcons name="account-edit" size={24} color="black" />
      </TouchableOpacity>
      <Text >name : {state.user.displayName || ''}</Text>
      <Text >phoneNumber : {state.user.phoneNumber || ''}</Text>
      <Text >balance : {state.user.balance || ''}</Text>
      <Spacer>
        <Button title="Sign Out" onPress={signout} />
      </Spacer>
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = {
  title: 'Account',
  tabBarIcon: <MaterialIcons name="account-circle" size={24} color="black" />
};

const styles = StyleSheet.create({});

export default AccountScreen;
