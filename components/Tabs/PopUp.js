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
    StatusBar,TouchableOpacity
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import Anime2 from '../anime/anime2'
import {
    Container,
    Header,
    Content,
    Item,
    Input,
    Fab,
    Button,
    Icon,
    DatePicker,Badge
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
// Import Navigation

type Props = {};
export default class PopUp extends Component < Props > {

    constructor(props) {
        super(props)
        this.state = {
            active: false,
            userIdToUpdate:this.props.userIdToUpdate
        };
    }
    loadGetStarted = async() => {

        setTimeout(() => {
            this
                .props
                .navigation
                .reset([NavigationActions.navigate({routeName: 'GetStarted'})], 0)
        }, 4000)

    }

    componentDidMount() {}
    render() {
        return (

    

                <View style={styles.popcontainer}>
                <Anime2 style={styles.pop}>
                <Text
                        style={{
                        fontSize: 20,
                        padding: 10,
                        fontWeight:'bold',
                    }}>Alert</Text>
                    <Text style={{padding:10}}>
                        {this.props.popmessage}
                    </Text>
                    

                    <Grid style={{marginTop:30}}>
          <Col style={{alignItems:'center'}}>
          <TouchableOpacity onPress={()=>this.props.setUserAdmin(this.state.userIdToUpdate)}>
              <Text style={{color:'#00CE9F'}}>Make Admin</Text>
              </TouchableOpacity></Col>
          <Col style={{alignItems:'center'}}>
          <TouchableOpacity onPress={this.props.closePop}>
              <Text style={{color:'red'}}>Cancel</Text>
              </TouchableOpacity>
          </Col>
        </Grid>
                </Anime2>
                  
                </View>
         

        );
    }
}

const styles = StyleSheet.create({
    popcontainer: {
        backgroundColor:'rgba(0,0,0,.7)',
        height:'100%',
        zIndex:10,
        position:'absolute',
        width:'100%',
        
    },
    pop:{
backgroundColor:'#fff',
width:'100%',
borderRadius:4,
padding:10,
height:'35%',
position:'absolute',
bottom:0
    }
 
});
