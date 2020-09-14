import React, { useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
const LoaderScreen = ({ image }) => {
    const {imageState,setImage} = useState(image||'logo.ping')
    let path =`../../assets/${imageState}`;
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={ require('../../assets/logo.png') } />
        </View>
    );
   
};
 const styles = StyleSheet.create({
        container: {
            flex:1,
            backgroundColor: "#f2f2f2",
            alignItems: "center",
            justifyContent: "center"
          },
        image: {
            width: 250,
            height: 250,
        },
    });
export default LoaderScreen;