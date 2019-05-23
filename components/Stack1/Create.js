/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Image,ScrollView
} from 'react-native';
import {
    Container,
    Header,
    Content,
    Item,
    Input,
    Button
} from 'native-base';
// Import Navigation
import {NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';


//firebase
import firebase from '../Firebase'
var db=firebase.firestore()

type Props = {};
export default class Splash extends Component < Props > {
    constructor(props) {
        super(props)
        this.state = {

            Email:'',
            Username:'',
            Password:'',
            Cpassword:'',
            UserRegistered:false

        };
    }


    createAccount=()=>{
        if(this.state.Email === '' || this.state.Username === '' || this.state.Password === '' || this.state.Cpassword === ''){
            alert("Fields cannot be empty!")

            return 0;
        }

        else{
 //Ineert into users table

 var ref=db.collection('users')


 //check if user exists

 var usersRef=ref.where("Email","==",this.state.Email)

 usersRef.get().then(dataSnap=>{
     if(dataSnap.size >=1){
         alert("A user already exists with email "+this.state.Email)
     }

     else{

         ref.add({
             Username:this.state.Username,
             Email:this.state.Email,
             Password:this.state.Password,
             Role:'0',
             approved_status:'0',
             has_account:false
         }).then(()=>{

            this.setState({
                UserRegistered:true
            })
            
 
         }).catch(error=>{
             alert(error.message)
         })
     }
 })


        }

       


    }

    loadHomePage = async() => {

        setTimeout(() => {
            this
                .props
                .navigation
                .reset([NavigationActions.navigate({routeName: 'Home1'})], 0)
        }, 1000)

    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView keyboardVerticalOffset={10} behavior='height' enabled>

                    <View
                        style={{
                        width: '100%',
                        alignItems: 'center'
                    }}>
                        <Text
                            style={{
                            fontSize: 25,
                            color: 'purple',
                            letterSpacing: 3,
                            textTransform: 'uppercase'
                        }}>Sign up</Text>

                    </View>

                 {
                     this.state.UserRegistered?<View style={{padding:10,marginBottom:50,alignItems:'center'}}><Text style={{textAlign:'center'}}>User {this.state.Username} has been added to the system with email {this.state.Email}. Please wait for a maximum 24 hours for the admin to verify your account details</Text></View>
                     :<View>
                     <View style={styles.loginView}>

<Item
    style={{
    borderBottomColor: 'transparent',
    borderBottomColor: 'white',
    borderBottomWidth: 0
}}>

<Icon name='ios-contact' size={30} color='purple'></Icon>


    <Input value={this.state.Username} onChangeText={(Username)=>this.setState({Username})} placeholder='Username' keyboardType='default' style={styles.myInput}/>
</Item>

<Item
    style={{
    borderBottomColor: 'transparent',
    borderBottomColor: 'white',
    borderBottomWidth: 0
}}>

<Icon name='ios-mail' size={30} color='purple'></Icon>


    <Input value={this.state.Email} onChangeText={(Email)=>this.setState({Email})} placeholder='Email' keyboardType='email-address' style={styles.myInput}/>
</Item>

<Item
    style={{
    borderBottomColor: 'transparent',
    borderBottomColor: 'white',
    borderBottomWidth: 0
}}>
<Icon name='ios-lock' size={30} color='purple'></Icon>
    <Input
    value={this.state.Password}
       onChangeText={(Password)=>this.setState({Password})}
        placeholder='Password'
        secureTextEntry={true}
        style={styles.myInput}/>
</Item>

<Item
    style={{
    borderBottomColor: 'transparent',
    borderBottomColor: 'white',
    borderBottomWidth: 0
}}>
<Icon name='ios-lock' size={30} color='purple'></Icon>

    <Input
    value={this.state.Cpassword}
    onChangeText={(Cpassword)=>this.setState({Cpassword})}
        onSubmitEditing={this.createAccount}
        placeholder='Confirm Password'
        secureTextEntry={true}
        style={styles.myInput}/>
</Item>

<Text>Be notified that once you sign up on this application, it may take a
    maximum of 24 hours for the admin to verify you</Text>

<ImageBackground
    imageStyle={{
    borderRadius: 50
}}
    style={{
    padding: 10,
    borderRadius: 20,
    marginTop: 20
}}
    source={require('../../android/assets/images/bg.png')}>
    <TouchableOpacity
        onPress={this.createAccount}
        style={{
        width: '100%',
        alignItems: 'center',
        borderRadius: 10
    }}>
        <Text
            style={{
            color: '#fff',
            letterSpacing: 10,
            textTransform: 'uppercase',
            padding: 10
        }}>Submit</Text>

    </TouchableOpacity>
</ImageBackground>
</View>
                     </View>
                 }
        <TouchableOpacity
                onPress={()=>this.props.navigation.navigate('LoginScreen')}
                    style={{
                    alignItems: 'center',
                    width: '100%',
                   
                    bottom: 20,
                    textAlign: 'center'
                }}>
                    <Text style={{
                        color: 'black'
                    }}>Have account? Log in</Text>

                </TouchableOpacity>
                </KeyboardAvoidingView>
        
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',

        backgroundColor: '#F5FCFF',
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
    loginView: {
        padding: 40,
      
    },
    myInput: {
        height: 40,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginTop: 10,
        marginBottom: 20,
        padding: 10,
        marginLeft: 10,
        marginRight: 10
    }
});
