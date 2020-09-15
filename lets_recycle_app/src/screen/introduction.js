import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Button, Dimensions } from 'react-native';
import Swiper from "react-native-web-swiper";

export default function steps() {
    const { width, height } = Dimensions.get('window');
    const signInScreen = () => {
        console.log('....')
    }
    return (
        <View style={styles.container}>
            <Swiper>
                <View style={{ width, height }}>
                    <Image source={require('../assets/Recycling.jpg')} style={styles.imageStyle} />
                    <View style={styles.wrapper}>
                        <Text style={styles.header}>Step one</Text>
                        <Text style={styles.paragraph}>
                            Group all your recyclable waste into groups according to their type
                        </Text>
                    </View>
                </View>
                <View style={{ width, height }}>
                    <Image
                        source={require('../assets/rubbish.jpg')}
                        style={styles.img2}
                    />
                    <View style={styles.wrapper}>
                        <Text style={styles.header}>Step two</Text>
                        <Text style={styles.paragraph}>
                            Choose the type that you want to recycle from the list in the application
                        </Text>
                    </View>
                </View>
                <View style={{ width, height }}>
                    <Image
                        source={require('../assets/phone.png')}
                        style={styles.imageStyle}
                    />
                    <View style={styles.wrapper}>
                        <Text style={styles.header}>Step Three</Text>
                        <Text style={styles.paragraph}>
                            Wait for a call from one of our workers to visit you and collect the waste from you </Text>
                    </View>
                </View>
                <View style={{ width, height }}>
                    <Image
                        source={require('../assets/coins.jpg')}
                        style={styles.imageStyle}
                    />
                    <View style={styles.wrapper}>
                        <Text style={styles.header}>Step four</Text>
                        <Text style={styles.paragraph}>Thus, your points will increase for which you will be rewarded for your recycle</Text>
                    </View>
                    <Button title='Get Started' style={styles.button} color="#008000" onPress={signInScreen} />
                </View>
            </Swiper>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageStyle: {
        height: 280,
        width: 410,
        marginTop: 50,
        marginBottom: 50
    },
    img2: {
        height: 200,
        width: 400,
        marginTop: 30,
        marginBottom: 50
    },
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30,
        color: 'green'
    },
    paragraph: {
        fontSize: 20,
        textAlign: 'center',
        color: '#006400'
    },
    paginationWrapper: {
        position: 'absolute',
        bottom: 200,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    paginationDots: {
        height: 10,
        width: 10,
        borderRadius: 10 / 2,
        backgroundColor: '#0898A0',
        marginLeft: 10,
    },
});