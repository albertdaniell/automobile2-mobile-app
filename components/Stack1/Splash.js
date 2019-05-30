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
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import FadeIn from '../anime/FadeIn'
//firebase
import firebase from '../Firebase'
import {PermissionsAndroid} from 'react-native';

var db=firebase.firestore()

// Import Navigation

type Props = {};
export default class Splash extends Component < Props > {

    autoEnableLocation=()=>{
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
        .then(data => {
      
          if(data === 'already-enabled'){
            this.getGeo()  
      //alert("Location has already been enabled")
          }
      
          else if(data === 'enabled'){
            this.getGeo()
     // alert("Thank you for enabling location")
          }
      
          else{
              alert(0)
      
          }
          // The user has accepted to enable the location services
          // data can be :
          //  - "already-enabled" if the location services has been already enabled
          //  - "enabled" if user has clicked on OK button in the popup
        }).catch(err => {
          // The user has not accepted to enable the location services or something went wrong during the process
          // "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
          // codes : 
          //  - ERR00 : The user has clicked on Cancel button in the popup
          //  - ERR01 : If the Settings change are unavailable
          //  - ERR02 : If the popup has failed to open
        });
    }

    // _requestLocationPermission = async ()=>  {
    //     try {
    //       const granted = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //         {
    //           title: 'Autmobile Permission',
    //           message:
    //             'This Application need to access your location ' +
    //             'for accuracy.',
    //           buttonNeutral: 'Ask Me Later',
    //           buttonNegative: 'Cancel',
    //           buttonPositive: 'OK',
    //         },
    //       );
    //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //         console.log('You can use the Location Api');
    //       } else {
    //         console.log('Location permission denied');
    //       }
    //     } catch (err) {
    //       console.warn(err);
    //     }
    //   }

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
        //this. _requestLocationPermission()
        this.getGeo()
        this.autoEnableLocation()
    

        setTimeout(()=>{
            this.checkUser()
        },3000)
       
        
    }

    geoSuucess=(position)=>{
        this.setState({longi: position.coords.longitude, lati: position.coords.latitude, error: null});
alert(this.state.longi)
    }

    geoFailure=(error)=>{
        //alert(error.message + ". Please enable location")
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
