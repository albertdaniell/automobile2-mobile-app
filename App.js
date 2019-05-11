/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation'
//Import components

import Splash from './components/Stack1/Splash'
import GetStarted from './components/GetStarted'
import Login from './components/Stack1/Login'

import HomeScreen1 from './components/Tabs/Home1'
import HomeScreen from './components/Tabs/Home'


import AddCompany from './components/Stack2/AddCompany'



const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            header: null
        }
    }

});

const AppNavigator1 = createStackNavigator({
    Splash: {
        screen: Splash,
        navigationOptions: {
            header: null
        }
    },
    GetStarted: {
        screen: GetStarted,
        navigationOptions: {
            header: null
        }
    },
    LoginScreen: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    Home1: {
        screen: TabNavigator,
        navigationOptions: {
            header: null
        }
    },
    AddCompany:{
      screen:AddCompany,
      navigationOptions:{
        title:'Add Motor Company'
      }
    }

})

 const AppNavigator2 = createStackNavigator({

  AddCompany:{
    screen:AddCompany,
    navigationOptions:{
      title:'Add Motor Company'
    }
  }
 })


 const AppContainer2=createAppContainer(AppNavigator2)

const TabContainer = createAppContainer(TabNavigator)

const AppContainer = createAppContainer(AppNavigator1)

type Props = {};
export default class App extends Component < Props > {
    render() {
        return (<AppContainer/>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
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
