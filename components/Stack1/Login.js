/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,Image
} from 'react-native';
import {
    Container,
    Header,
    Content,
    Item,
    Input,
    Button
} from 'native-base';
// Import Navigation
import {NavigationActions} from 'react-navigation';

import {Icon} from 'react-native-elements'

type Props = {};
export default class Splash extends Component < Props > {
    constructor(props) {
        super(props)
        this.state = {};
    }

    loadHomePage = async() => {

        setTimeout(() => {
            this
                .props
                .navigation
                .reset([NavigationActions.navigate({routeName: 'Home1'})], 0)
        }, 1000)

    }

    render() {
        return (

            <KeyboardAvoidingView
                style={styles.container}
                keyboardVerticalOffset={30}
                behavior='height'
                enabled>
                <View style={styles.container}>

                    <View
                        style={{
                        width: '100%',
                        alignItems: 'center'
                    }}>
                        <Text
                            style={{
                            fontSize: 25,
                            color: 'purple',
                            letterSpacing: 3,
                            textTransform: 'uppercase'
                        }}>Login</Text>

                    </View>
                  

                    <View style={styles.loginView}>

                    <Item style={{borderBottomColor:'transparent',borderBottomColor:'white',borderBottomWidth:0}}>

                    <Image style={{height:20,width:30,padding:5}} source={require('../../android/assets/images/envelope.png')}></Image>

         
            <Input
                        autoFocus={true}
                            placeholder='Email'
                            keyboardType='email-address'
                            style={styles.myInput}/>
          </Item>

          <Item style={{borderBottomColor:'transparent',borderBottomColor:'white',borderBottomWidth:0}}>
          <Image style={{height:30,width:25,padding:5}} source={require('../../android/assets/images/key.png')}></Image>
          <Input
                            placeholder='Password'
                            secureTextEntry={true}
                            style={styles.myInput}/>
          </Item>


                      

                        <ImageBackground
                            imageStyle={{
                            borderRadius: 50
                        }}
                            style={{
                            padding: 10,
                            borderRadius: 20,
                            marginTop: 20
                        }}
                            source={require('../../android/assets/images/bg.png')}>
                            <TouchableOpacity
                                onPress={this.loadHomePage}
                                style={{
                                width: '100%',
                                alignItems: 'center',
                                borderRadius: 10
                            }}>
                                <Text
                                    style={{
                                    color: '#fff',
                                    letterSpacing: 10,
                                    textTransform: 'uppercase',
                                    padding: 10
                                }}>Login</Text>

                            </TouchableOpacity>
                        </ImageBackground>
                    </View>

                    <TouchableOpacity
                        style={{
                        alignItems: 'center',
                        width: '100%',
                        position: 'absolute',
                        bottom: 20,
                        textAlign: 'center'
                    }}>
                        <Text
                            style={{
                            color: 'black'
                        }}>Sign up</Text>

                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',

        backgroundColor: '#F5FCFF',
        height: '100%'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    },
    loginView: {
        padding: 40
    },
    myInput: {
        height: 40,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginTop: 10,
        marginBottom: 20,
        padding: 10,
        marginLeft: 10,
        marginRight: 10
    }
});
