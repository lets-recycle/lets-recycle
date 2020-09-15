import React, { useContext, useState } from 'react';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import Spacer from '../components/Spacer';
import { FontAwesome } from '@expo/vector-icons';
import { Context as AuthContext } from '../context/AuthContext';


import { StyleSheet, Text, View, FlatList,Alert, Image, TouchableOpacity} from 'react-native';
import Card from '../components/Card'

// import { Root, Popup } from 'popup-ui';

const API = 'https://lets-recycle-67594.firebaseio.com'

const HomeScreen = () => {
  const { state } = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [type, setType] = useState('');

  const wasteTypes = [
    { img: require('../../assets/metal3.jpg'), id: 1, title: 'Metal' },
    { img: require('../../assets/plastic2.jpg'), id: 2, title: 'Plastic' },
    { img: require('../../assets/paper1.jpg'), id: 3, title: 'Paper' },
  ];
  const donate = [
    { img: require('../../assets/food.jpg'), id: 1, title: 'Food' },
    { img: require('../../assets/clothes1.jpg'), id: 2, title: 'Clothes' },
  ];
  const modalShow = () => {
    setModal(true);
  }

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Confirm",
      `Are you sure you want to recycle ${type} waste ?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Yes", onPress: () => {
            Popup.show({
              type: 'Success',
              title: 'Request sent', // احمد غير هاد العنوان مش عارفة شو احطو انا 
              button: true,
              textBody: 'One of our workers will contact you to get more information for your visit soon',
              buttontext: 'Ok',
              callback: () => Popup.hide()
            })
          }
        }
      ],
      { cancelable: false }
    );

  const order = (category) => {
    (async () => {
      await fetch(`${API}/orders.json`, {
        method: 'POST',
        mode: 'cors',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }),
        body: JSON.stringify({
          "userID": state.user.uid,
          "userName": state.user.displayName,
          "location": state.user.location,
          "phoneNumber": state.user.phoneNumber,
          "categories": category

        })
      });
    })();
  }


  return (
    <Root>
      <View style={styles.container}>
    <FlatList
          numColumns={2}
          data={wasteTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setType(item.title)
                createTwoButtonAlert();
              }}
            >
              <Card>
                <Image source={item.img} style={item.id == 3 ? styles.third : styles.types} />
              </Card>
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
        <Text style={styles.hr}> ─────────  Or donate  ─────────</Text>
        <FlatList
          numColumns={2}
          data={donate}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {
              setType(item.title)
              createTwoButtonAlert();
            }}>
              <Card>
                <Image source={item.img} style={styles.types} />
              </Card>
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Root>
  );


};


// return (
//   <SafeAreaView forceInset={{ top: 'always' }}>
//     <Text style={{ fontSize: 48 }}>HomeScreen</Text>
//     <Button title="plastic" onPress={e => order('plastic')} />
//     <Button title="food" onPress={e => order('food')} />
//   </SafeAreaView>
// );

HomeScreen.navigationOptions = {
  title: 'Home',
  tabBarIcon: <FontAwesome name="home" size={24} color="black" />
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  item: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 24,
    padding: 30,
    backgroundColor: 'pink',
    fontSize: 24,
  },
  types: {
    height: 140,
    width: 140
  },
  third: {
    height: 150,
    width: 320,
  },
  hr: {
    marginBottom: 50
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center'
  }
})

export default HomeScreen;
