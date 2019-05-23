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



        this.state={
            Email:'',
            Role:'',
            Username:'',
            lati:'',
            longi:''
        }
    }

    loadGetStarted=()=>{

        setTimeout(() => {
            this
                .props
                .navigation
                .reset([NavigationActions.navigate({routeName: 'GetStarted'})], 0)
        }, 1500)

    }

    checkUser=()=>{
        firebase.auth().onAuthStateChanged((user)=> {
            if (user) {
//update state

this.setState({
    Email:user.email
})
                //get user datails


        var ref=db.collection('users')
        var userRef=ref.where("Email","==",user.email)
        userRef.get().then(dataSnap=>{
            dataSnap.forEach((doc)=>{
                this.setState({
                    Username:doc.data().Username,
                    Role:doc.data().Role
                })
               // alert(this.state.Role)
            })
        })
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
        }, 200)

    }

    componentDidMount() {
        this.checkUser()
        this.getGeo()
       
        
    }

    geoSuucess=(position)=>{
        this.setState({longi: position.coords.longitude, lati: position.coords.latitude, error: null});
//alert(this.state.longi)
    }

    geoFailure=(error)=>{
        alert(error.message + ". Please enable location")
    }

    getGeo=()=>{
        navigator
        .geolocation
        .getCurrentPosition(this.geoSuucess,this.geoFailure)

      
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
