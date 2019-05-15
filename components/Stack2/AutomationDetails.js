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
    StatusBar,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator,YellowBox,Image
} from 'react-native';

import {NavigationActions} from 'react-navigation';
import FadeIn from '../anime/FadeIn'
import {
    Container,
    Header,
    Content,
    Item,
    Input,
    Fab,
    Button,
    Icon,
    DatePicker,Grid,Col,Badge
} from 'native-base';
var todayDate = new Date()
    .toString()
    .substr(4, 12);
// Import Navigation


//firebase
import firebase from '../Firebase'
var db=firebase.firestore()


type Props = {};
export default class Home extends Component < Props > {

    constructor(props) {

        super(props)
        YellowBox.ignoreWarnings(['Setting a timer']);
        YellowBox.ignoreWarnings(['Failed prop type']);
        this.state = {
            active: false,
            chosenDate: "",
            isLoading:false,
            vehicles:[],
            vehicleInput:'',
            companyName:'',
         

            
        };
    }

   
    componentDidMount() {

   
   
    }






    render() {
        return (

            <FadeIn style={{height:'100%'}}>
                <StatusBar backgroundColor="purple" barStyle="light-content"/>
       
                <ScrollView>

                    
                    <View style={styles.container}>
                        
                    <KeyboardAvoidingView behavior='padding' enabled>
                    <Text style={styles.instructions}>Fill in the following data entry form</Text>

                            <View style={styles.yesDiv}>

                                <Text style={styles.label}>Does the company have automation application sofware for motor vehicle assembly line?</Text>
                                <TextInput value={this.state.companyName} onChangeText={(companyName)=>this.setState({companyName})}  style={styles.myInput} placeholder='Enter name of company'></TextInput>

             
                       <Text style={styles.label}>Which one?</Text>
                                <TextInput value={this.state.companyName} onChangeText={(companyName)=>this.setState({companyName})}  style={styles.myInput} placeholder='Enter name of company'></TextInput>
                                <Text style={styles.label}>For how long has the company been using the software?</Text>
                                <TextInput value={this.state.companyName} onChangeText={(companyName)=>this.setState({companyName})}  style={styles.myInput} placeholder='Enter name of company'></TextInput>

                  
                             

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
                                onPress={this.submitFn1}
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
                                        }}>Next</Text>

                                    </TouchableOpacity>
                                </ImageBackground>


                               
                            </View>
                        </KeyboardAvoidingView>
                
                   

                    </View>

                    
                </ScrollView>
            
            </FadeIn>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 20,
        marginTop: 0
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

    companyName: {},
    myInput: {
        height: 40,
        marginTop: 10,
        marginBottom: 10,
        height: 50,
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#fff'
    },
    label: {
        padding: 10,
        fontFamily: 'italic',
        fontWeight: 'bold'
    },
    instructions: {
        padding: 10,
        fontSize:20,
        
    
        
        
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
    form2:{
    },
    yesDiv:{
backgroundColor:'#e0e0e0',
padding:10
    }
});
