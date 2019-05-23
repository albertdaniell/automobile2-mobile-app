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
    Image,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    StatusBar,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator,
    YellowBox,
    FlatList,
    AppState,
    TouchableOpacity,
    Switch
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
    Col,
    Badge
} from 'native-base';
import firebase from '../Firebase'
var db = firebase.firestore()
import {NavigationEvents} from 'react-navigation';
// Import Navigation
import Icon from 'react-native-vector-icons/Ionicons';
import PopUp from './PopUp'

type Props = {};
export default class Users extends Component < Props > {

    constructor(props) {
        super(props)
        this.state = {
            active: false,
            isAdmin: '',
            userAdmin: false,
            users: [],
            pendingLoading: true,
            adminusers: [],
            allusers: [],
            allUsersLoading: true,
            adminsLoading: true,
            allUsersNo: '_',
            adminsNo: '_',
            pendingUsersNo: '_',
            message1: '',
            pendingUsersExist: true,
            adminsExist:true,
            allUsersExist:true,
            popmessage:'',
            showMessage:false,
            userIdToUpdate:'1818'
           
        };

        this.closePop=this.closePop.bind(this)
        this.setUserAdmin=this.setUserAdmin.bind(this)
    }

    closePop=()=>{
        
        this.setState({
            showMessage:false
        })
    }

    setUserAdmin=(userId)=>{
      
        var ref=db.collection('users').doc(this.state.userIdToUpdate)
        ref.update({
            Role:'1'
        }).then(()=>{
          // alert("nicee")
          this.closePop()

          setTimeout(()=>{
this.getUsers2()
          },3000)
        })
    }

    getUsers = () => {
        const users = [];
        ref = db
            .collection('users')
            .where("approved_status", "==", "0")
        ref
            .get()
            .then((dataSnapshot) => {

                if (dataSnapshot.size >= 1) {} else {
                    this.setState({pendingLoading: false, message1: 'There are no records',
                pendingUsersExist:false
                })
                }

                this.setState({pendingUsersNo: dataSnapshot.size})

                dataSnapshot.forEach((doc) => {

                    var {
                        Email,
                        Username,
                        Role,
                        Password,
                        btnType,
                        approved_status
                    } = doc.data()
                    if (approved_status == 0) {
                        approved_status = 'Approve'
                        btnType = 'info'
                    } else {

                        btnType = 'success'
                    }

                    users.push({
                        key: doc.id,
                        doc,
                        approved_status,
                        Email,
                        Username,
                        Password,
                        Role,
                        btnType
                    })

                    this.setState({users, pendingLoading: false})
                })
            })
    }

    getUsers2 = () => {
        const adminusers = [];
        ref = db
            .collection('users')
            .where("Role", "==", "1")
        ref
            .get()
            .then((dataSnapshot) => {

                if (dataSnapshot.size >= 1) {} else {
                    this.setState({adminsLoading: false,adminsExist:false})
                }

                dataSnapshot.forEach((doc) => {
                    this.setState({adminsNo: dataSnapshot.size})
                    var {
                        Email,
                        Username,
                        Role,
                        Password,
                        btnType,
                        approved_status
                    } = doc.data()
                    if (Role == 1) {
                        Role = 'Remove'
                    } else {}

                    adminusers.push({
                        key: doc.id,
                        doc,
                        approved_status,
                        Email,
                        Username,
                        Password,
                        Role,
                        btnType
                    })

                    this.setState({adminusers, adminsLoading: false})
                })
            })
    }

    getUsers3 = () => {
        const allusers = [];
        ref = db
            .collection('users')
            .where("approved_status", "==", "1")
        ref
            .get()
            .then((dataSnapshot) => {

                if (dataSnapshot.size >= 1) {} else {
                    this.setState({allUsersLoading: false,allUsersExist:false})
                }

                dataSnapshot.forEach((doc) => {
                    this.setState({allUsersNo: dataSnapshot.size})
                    var {
                        Email,
                        Username,
                        Role,
                        Password,
                        btnType,
                        approved_status
                    } = doc.data()
                    if (approved_status == 0) {
                        approved_status = 'Approve'
                        btnType = 'info'
                    } else {

                        btnType = 'success'
                    }

                    allusers.push({
                        key: doc.id,
                        doc,
                        approved_status,
                        Email,
                        Username,
                        Password,
                        Role,
                        btnType
                    })

                    this.setState({allusers, allUsersLoading: false})
                })
            })
    }
    action = (value,value2) => {
        var Email,
            Pass;
        var ref = db
            .collection('users')
            .doc(value)

        ref
            .get()
            .then(dataSnapshot => {
                if (dataSnapshot.exists) {
                    Email = dataSnapshot
                        .data()
                        .Email
                    Pass = dataSnapshot
                        .data()
                        .Password

                    //updateScript

                    ref
                        .update({approved_status: '1'})
                        .then(() => {


                            this.setState({showMessage:true,popmessage:value2+' has been added to the system. You have the option of making this user an admin or not.',userIdToUpdate:value})

                            // alert("Success")
                          
                                this.getUsers()
                                this.getUsers2()
                                this.getUsers3()
                          

                        })
                        .catch(error => {
                            alert(error.message)
                        })

                } else {
                    return 0;
                }

            })

        //

        // firebase.auth().createUserWithEmailAndPassword(Email,Pass)
        // .then(()=>{            // alert("Success")         }) /

    }
    componentDidMount() {
        
        setTimeout(() => {
            this.getUsers()
            this.getUsers2()
            this.getUsers3()
        }, 200)
    }
    render() {
        return (

            <FadeIn>
                <StatusBar backgroundColor="purple" barStyle="light-content"/>
             {
                 this.state.showMessage?   <PopUp setUserAdmin={this.setUserAdmin} userIdToUpdate={this.state.userIdToUpdate} closePop={this.closePop} popmessage={this.state.popmessage}></PopUp> :
                 null
             }    
                <View style={styles.container}>
            
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Item>
                            <Text
                                style={{
                                fontSize: 20,
                                padding: 10,
                                fontWeight: 'bold',
                                color: '#ffa0b5'
                            }}>Pending Invites</Text>
                            <Badge
                                style={{
                                marginTop: 10,
                                alignItems: 'center',
                                borderRadius: 0
                            }}
                                danger>
                                <Text
                                    style={{
                                    color: '#fff'
                                }}>{this.state.pendingUsersNo}</Text>
                            </Badge>

                        </Item>

                        <View>

                            <ScrollView
                                style={{
                                padding: 10,
                                backgroundColor: '#ffe0b2',
                                borderRadius: 10,
                                marginBottom: 20
                            }}>
                                
                                {this.state.pendingLoading
                                    ? <ActivityIndicator size="large" color="#0000ff"/>
                                    : this.state.pendingUsersExist?
                                    <FlatList
                                        onRefresh={this.pull}
                                        refreshing={this.state.isLoading}
                                        data={this.state.users}
                                        renderItem={({item}) => <ListItem key={item.key} avatar>
                                        <Left>
                                            <Icon name='ios-contact' size={30} color='black'></Icon>
                                        </Left>
                                        <Body>
                                            <TouchableOpacity >
                                                <Text
                                                    style={{
                                                    marginBottom: 5,
                                                    padding: 2
                                                }}>{item.Username}
                                                </Text>
                                                <Text
                                                    note
                                                    style={{
                                                    fontSize: 12,
                                                    color: '#b7b7b7'
                                                }}>{item.Email}</Text>
                                            </TouchableOpacity>
                                        </Body>
                                        <Right>
                                            <TouchableOpacity
                                                onPress={() => this.action(item.key,item.Username)}
                                                style={{
                                                padding: 5,
                                                borderColor: '#ccc',
                                                borderWidth: 1,
                                                borderRadius: 4,
                                                alignItems: 'center'
                                            }}>
                                                <Text
                                                    style={{
                                                    color: '#9dea70',
                                                    fontWeight: 'bold'
                                                }}>{item.approved_status}</Text>
                                            </TouchableOpacity>
                                        </Right>
                                    </ListItem>}/>
                                    :<Text
                                    style={{
                                    padding: 10
                                }}>{this.state.message1}</Text>
}

                            </ScrollView>
                            <Item>
                                <Text
                                    style={{
                                    fontSize: 20,
                                    padding: 10,
                                    fontWeight: 'bold',
                                    color: '#ffa0b5'
                                }}>Admins</Text>
                                <Badge
                                    style={{
                                    marginTop: 10,
                                    alignItems: 'center',
                                    borderRadius: 0
                                }}
                                    danger>
                                    <Text
                                        style={{
                                        color: '#fff'
                                    }}>{this.state.adminsNo}</Text>
                                </Badge>

                            </Item>
                            <View
                                style={{
                                padding: 10,
                                backgroundColor: '#26a69a',
                                borderRadius: 10,
                                marginBottom: 20
                            }}>

                                {this.state.adminsLoading
                                    ? <ActivityIndicator size="large" color="#fff"/>
                                    : <FlatList
                                        onRefresh={this.pull}
                                        refreshing={this.state.isLoading}
                                        data={this.state.adminusers}
                                        renderItem={({item}) => <ListItem key={item.key} avatar>
                                        <Left>
                                            <Icon name='ios-contact' size={30} color='#fff'></Icon>
                                        </Left>
                                        <Body>
                                            <TouchableOpacity >
                                                <Text
                                                    style={{
                                                    marginBottom: 5,
                                                    padding: 2,
                                                    color: '#fff'
                                                }}>{item.Username}
                                                </Text>
                                                <Text
                                                    note
                                                    style={{
                                                    fontSize: 12,
                                                    color: '#b7b7b7'
                                                }}>{item.Email}</Text>
                                            </TouchableOpacity>
                                        </Body>
                                        <Right>
                                            <TouchableOpacity
                                                style={{
                                                padding: 5,
                                                borderColor: '#ccc',
                                                borderWidth: 1,
                                                borderRadius: 4,
                                                alignItems: 'center'
                                            }}>
                                                <Text
                                                    style={{
                                                    color: 'white',
                                                    fontWeight: 'bold'
                                                }}>{item.Role}</Text>
                                            </TouchableOpacity>
                                        </Right>
                                    </ListItem>}/>
}

                            </View>
                            <Item>
                                <Text
                                    style={{
                                    fontSize: 20,
                                    padding: 10,
                                    fontWeight: 'bold',
                                    color: '#ffa0b5'
                                }}>All users</Text>
                                <Badge
                                    style={{
                                    marginTop: 10,
                                    alignItems: 'center',
                                    borderRadius: 0
                                }}
                                    danger>
                                    <Text
                                        style={{
                                        color: '#fff'
                                    }}>{this.state.allUsersNo}</Text>
                                </Badge>

                            </Item>
                            <ScrollView
                                style={{
                                padding: 10,
                                backgroundColor: '#f5f5f5',
                                borderRadius: 10,
                                marginBottom: 20
                            }}>

                                {this.state.allUsersLoading
                                    ? <ActivityIndicator size="large" color="#0000ff"/>
                                    : <FlatList
                                        onRefresh={this.pull}
                                        refreshing={this.state.isLoading}
                                        data={this.state.allusers}
                                        renderItem={({item}) => <ListItem key={item.key} avatar>
                                        <Left>
                                            <Icon name='ios-contact' size={30} color='black'></Icon>
                                        </Left>
                                        <Body>
                                            <TouchableOpacity >
                                                <Text
                                                    style={{
                                                    marginBottom: 5,
                                                    padding: 2
                                                }}>{item.Username}
                                                </Text>
                                                <Text
                                                    note
                                                    style={{
                                                    fontSize: 12,
                                                    color: '#b7b7b7'
                                                }}>{item.Email}</Text>
                                            </TouchableOpacity>
                                        </Body>
                                        <Right>
                                            <TouchableOpacity
                                                style={{
                                                padding: 5,
                                                borderColor: '#ccc',
                                                borderWidth: 1,
                                                borderRadius: 4,
                                                alignItems: 'center'
                                            }}>
                                                <Text
                                                    style={{
                                                    color: '#9dea70',
                                                    fontWeight: 'bold'
                                                }}>{item.approved_status}</Text>
                                            </TouchableOpacity>
                                        </Right>
                                    </ListItem>}/>
}

                            </ScrollView>
                        </View>
                    </ScrollView>
                </View>
            </FadeIn>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 10,
      
      
        
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
    
});
