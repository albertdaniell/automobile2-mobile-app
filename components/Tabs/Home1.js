/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ImageBackground,StatusBar} from 'react-native';
import { NavigationActions } from 'react-navigation';
import FadeIn from '../anime/FadeIn'
import { Container, Header, Content, Item, Input,Fab, Button, } from 'native-base';

// Import Navigation

type Props = {};
export default class Home1 extends Component < Props > {


    loadGetStarted=async()=>{
        
        setTimeout(()=>{
            this.props.navigation.reset([NavigationActions.navigate({ routeName: 'GetStarted' })], 0)
        },4000)


    }

    componentDidMount(){
       
    }
    render() {
        return (
            
<FadeIn>
<StatusBar backgroundColor="purple" barStyle="light-content" />
 
<View>
    <Text>home1</Text>

    <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="share" />
            <Button style={{ backgroundColor: '#34A34F' }}>
            <Icon type="FontAwesome" name="home" />
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }}>
            <Icon type="FontAwesome" name="home" />
            </Button>
            <Button disabled style={{ backgroundColor: '#DD5144' }}>
            <Icon type="FontAwesome" name="home" />
            </Button>
          </Fab>
</View>
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
