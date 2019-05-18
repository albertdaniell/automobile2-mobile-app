/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation'
//Import components
import Splash from './components/Stack1/Splash'
import GetStarted from './components/GetStarted'
import Login from './components/Stack1/Login'
import HomeScreen1 from './components/Tabs/Home1'
import HomeScreen from './components/Tabs/Home'
import AddCompany from './components/Stack2/AddCompany'
import ViewCompany from './components/Stack2/ViewCompany'
import Account from './components/Tabs/Account'
import AutomationDetails from './components/Stack2/AutomationDetails'
import Create from './components/Stack1/Create'
import IconWithBadge from './components/IconWithBadge'


const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            header: null
        }
    },
    Account:{
        screen:Account,
        navigationOptions: {
            header: null
        }
    }

},  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
          // Sometimes we want to add badges to some icons. 
          // You can check the implementation below.
          IconComponent = HomeIconWithBadge; 
        } else if (routeName === 'Account') {
          iconName = `ios-contact`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'purple',
      inactiveTintColor: '#ccc',
    },
  });
  const HomeIconWithBadge = (props) => {
    // You should pass down the badgeCount in some other ways like react context api, redux, mobx or event emitters.
    return <IconWithBadge {...props} badgeCount={3} />;  
  }
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
    CreateScreen: {
        screen: Create,
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
    },
    ViewCompany:{
        screen:ViewCompany,
        navigationOptions:{
          title:'View company'
        }
      },
      AutomationDetails:{
          screen:AutomationDetails,
          navigationOptions:{
            title:'Add Automation Details'
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
