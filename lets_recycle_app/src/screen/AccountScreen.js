import React, { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity,Image, Button } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AccountScreen = ({ navigation }) => {
  const { signout, state } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text style={{ fontSize: 48, marginTop:20, color:'green' }}>Profile</Text>
      <Image
        source={require('../../assets/profile-pic.jpg')}
        style={{ width: 250, height: 250, borderRadius: 250 / 2, alignSelf:'center' }}
      />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Edit')
        }
        style={styles.center}
      >
        <MaterialCommunityIcons name="account-edit" size={50} color="black" />
      </TouchableOpacity>
      <Text style={styles.center, styles.name } > {state.user.displayName || 'User Name'}</Text>
      <Text style={styles.center} >{state.user.phoneNumber || '0000000000'}</Text>
      <View style={styles.box}>
      <Text  style={styles.center }>{state.user.balance || 0}</Text>
      <Text  style={styles.center} >balance</Text>
      </View>
      <Spacer>
        <Button color='#db0a0a' title="Sign Out" onPress={signout} />
      </Spacer>
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = {
  title: 'Account',
  tabBarIcon: <MaterialIcons name="account-circle" size={24} color="black" />
};

const styles = StyleSheet.create({
  center:{
    textAlign:'center',
    alignSelf:'center'
  },
  name:{
    fontSize:40,
    textAlign:'center',
    fontWeight:'bold',
    marginTop:20
  },
  box:{
    marginTop:25,
    borderColor:'#DFD8C8',
    borderLeftWidth:2,
    borderRightWidth:2,
    textAlign:'center',
    alignSelf:'center',
    padding:10,
    marginBottom:30
  }
});

export default AccountScreen;
