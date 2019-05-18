/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,Image,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    StatusBar,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator,YellowBox, FlatList,AppState
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import FadeIn from '../anime/FadeIn'
import {
    Container,
    Header,
    Title,
    Content,
    Form,
    Item,
    Label,
    Footer,
    FooterTab,
    Button,
    Left,
    Right,
    Body,
    
Fab,
    Tabs,
    Tab,
    TabHeading,
    List,
    ListItem,
    Input,
    Grid, Separator,
Col,
} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from '../Firebase'
import Icon from 'react-native-vector-icons/Ionicons';

var db=firebase.firestore()
// Import Navigation

type Props = {};
export default class Account extends Component < Props > {

    constructor(props) {
        super(props)
        this.state = {
            active: false,
            isLoading:false
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

    loadGetStarted=()=>{

        setTimeout(() => {
            this
                .props
                .navigation
                .reset([NavigationActions.navigate({routeName: 'GetStarted'})], 0)
        }, 1000)

    }

    logOut=()=>{
        this.setState({
            isLoading:true
        })
        firebase.auth().signOut().then(()=> {
            this.loadGetStarted()
          }).catch(function(error) {

            this.setState({
                isLoading:false
            })
           alert(error.message)
          });
          
    }

    componentDidMount() {}
    render() {
        return (

            <FadeIn>
                <StatusBar backgroundColor="purple" barStyle="light-content"/>

                <View style={styles.container}>
              {
                  this.state.isLoading?  <View style={styles.loadingdiv}>
                   <View style={{backgroundColor:'#fff',padding:20,borderRadius:5}}>
                   <ActivityIndicator size="large" color="orange" />

                   </View>

                </View>:null
              }
                    <ScrollView>
                    <Text
                        style={{
                        fontSize: 30,
                        padding: 10,
                    }}>Account</Text>

                    <Separator style={{marginTop:5}} bordered>
            <Text>Email</Text>
          </Separator>
          <TouchableOpacity style={styles.myTouch}>
           <Text>albertagoya@mail.com</Text>
           </TouchableOpacity>

          <Separator style={{marginTop:15}} bordered>
            <Text>Account</Text>
          </Separator>
      
          <TouchableOpacity style={styles.myTouch}>
           <Text>Users</Text>
           </TouchableOpacity>
          <TouchableOpacity style={styles.myTouch}>
           <Text>About</Text>
           </TouchableOpacity>

          <TouchableOpacity style={styles.myTouch}>
           <Text>Contact Us</Text>
           </TouchableOpacity>

          
           <TouchableOpacity onPress={this.logOut} style={styles.myTouch}>
           <Text>Logout</Text>
           </TouchableOpacity>
        
                    </ScrollView>
                 
                    <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{}}
                        style={{
                        backgroundColor: 'orange'
                    }}
                        position="bottomRight"
                        onPress={()=>this.props.navigation.navigate('AddCompany')}>
                        <Icon name='ios-add' size={40} color="purple"></Icon>

                    </Fab>
                </View>
            </FadeIn>

        );
    }
}

const styles = StyleSheet.create({
    container: {
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
    myTouch:{
        marginTop:20,
        padding:10,
        width:'100%',
        borderBottomColor:'#ccc',
        borderBottomWidth:.5,
        marginLeft:10
        
    },
    loadingdiv:{
        backgroundColor:'rgba(0,0,0,.7)',
        height:'100%',
        zIndex:10,
        position:'absolute',
        width:'100%',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
       
        
    },
});
