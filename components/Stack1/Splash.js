/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    StatusBar,YellowBox
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import FadeIn from '../anime/FadeIn'
//firebase
import firebase from '../Firebase'
var db=firebase.firestore()

// Import Navigation

type Props = {};
export default class Splash extends Component < Props > {

    constructor(props){
        
        
        super(props)
        YellowBox.ignoreWarnings(['Setting a timer']);
        YellowBox.ignoreWarnings(['Failed prop type']);
        YellowBox.ignoreWarnings(["Can't perform a React state update on an unmounted component"]);



        this.state={}
    }

    loadGetStarted=()=>{

        setTimeout(() => {
            this
                .props
                .navigation
                .reset([NavigationActions.navigate({routeName: 'GetStarted'})], 0)
        }, 1000)

    }

    checkUser=()=>{
        firebase.auth().onAuthStateChanged((user)=> {
            if (user) {
           this.loadHomePage()
            } else {
             this.loadGetStarted()
            }
          });
          
    }

 

    loadHomePage=()=> {

        setTimeout(() => {
            this
                .props
                .navigation
                .reset([NavigationActions.navigate({routeName: 'Home1'})], 0)
        }, 1000)

    }

    componentDidMount() {
        this.checkUser()
    }
    render() {
        return (

            <FadeIn>
                <StatusBar backgroundColor="purple" barStyle="light-content"/>

                <ImageBackground
                    style={{
                    height: '100%'
                }}
                    source={require('../../android/assets/images/bg.png')}></ImageBackground>
            </FadeIn>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
    }
});
