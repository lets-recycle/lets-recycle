import React, { useState, useContext ,useEffect} from 'react';
import { View, StyleSheet, Text,ScrollView,Button } from 'react-native';
import { Input } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

const EditScreen = ({ navigation }) => {
  const { update, state } = useContext(AuthContext);
  const [name, setName] = useState(state.user.displayName || '');
  const [phone, setPhone] = useState(state.user.phoneNumber || '');
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [text,setText] = useState('Waiting..');
  
useEffect(() => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      setErrorMsg(
        'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      );
    } else {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
      
    }
    console.log('shof')
  },[]);
  useEffect(()=>{
    console.log('shof',errorMsg,location)
    if (errorMsg) {
      setText(errorMsg);
    } else if (location) {
      setText(JSON.stringify(location));
    }
  },[location,errorMsg])
  
  
  return (
    <ScrollView>
    <SafeAreaView forceInset={{ top: 'always' } } style={{flex:1}}>
      <Text style={styles.txt}>Edit Profile</Text>
      {/* <Text >name : {state.user.displayName || ''}</Text> */}
      <Spacer />
      <Input
        label="name"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Spacer />
      {/* <Text >phoneNumber : {state.user.phoneNumber || ''}</Text> */}
      <Spacer />
      <Input
        label="phoneNumber"
        value={phone}
        onChangeText={setPhone}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {/* here you shoud update the profile pic */}
      <Spacer />
      <Text style={styles.paragraph}>{text}</Text>
      <Spacer>
        <Button color='#008000' title="Save and Back" onPress={() => update({ displayName: name, phoneNumber: phone,location:text })} />
        <Spacer />
        <Button color='#db0a0a' title="Cancel" onPress={() =>
          navigation.navigate('Profile')} />
      </Spacer>
    </SafeAreaView>
    </ScrollView>
  );
};

EditScreen.navigationOptions = {
  title: 'Edit',
  tabBarIcon: <MaterialCommunityIcons name="account-edit" size={24} color="black" />
};

const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  txt:{
    color: 'green',
    fontSize: 48,
    marginTop:20 
  }
});

export default EditScreen;
