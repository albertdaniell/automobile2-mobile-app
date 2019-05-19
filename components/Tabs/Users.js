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
    ActivityIndicator,YellowBox, FlatList,AppState,TouchableOpacity,Switch
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
    Grid,
Col
} from 'native-base';
import firebase from '../Firebase'
var db = firebase.firestore()
import { NavigationEvents } from 'react-navigation';
// Import Navigation

type Props = {};
export default class Users extends Component < Props > {

    constructor(props) {
        super(props)
        this.state = {
            active: false,
            isAdmin:'',
            userAdmin:false,
            users:[],
            isLoading:true
        };
    }

    getUsers=()=>{
        const users=[];
ref=db.collection('users')
ref.get().then((dataSnapshot)=>{

    dataSnapshot.forEach((doc)=>{
     
        var {Email,Username,Role,Password,btnType}=doc.data()
        if(Role ==1){
            Role='Remove admin'
            btnType='info'
        }
        else{
            Role='Make admin'
            btnType='success'
        }

        users.push({
            key:doc.id,
            doc,
            Email,
            Username,
            Password,
            Role,
            btnType
        })



        this.setState({users,isLoading:false})
    })
})
    }
   

    componentDidMount() {
        this.getUsers()
    }
    render() {
        return (

            <FadeIn>
                <StatusBar backgroundColor="purple" barStyle="light-content"/>

                <View style={styles.container}>
                   
                    <View>

                    <FlatList
                    onRefresh={this.pull}
                    refreshing={this.state.isLoading}
                    data={this.state.users}
                    
                    renderItem={({item}) =>  <ListItem key={item.key} avatar>


                    <Left>
                    <Image style={{height:20,width:20,marginTop:10}} source={require('../../android/assets/images/user.png')}></Image>

                    </Left>
                    <Body>
                        <TouchableOpacity 
                       
                   
                        >
                            <Text
                                style={{
                                marginBottom: 5,
                                padding: 2
                            }}>{item.Username} </Text>
                            <Text note style={{fontSize:12,color:'#ccc'}}>{item.Email}</Text>
                        </TouchableOpacity>

                       
                    </Body>
                    <Right>
                     
                    <Button info><Text> {item.Role} </Text></Button>
                    </Right>
</ListItem>}/>
                    </View>
                </View>
            </FadeIn>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding:5
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
