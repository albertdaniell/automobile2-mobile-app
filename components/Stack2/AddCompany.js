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
    ActivityIndicator
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
    DatePicker
} from 'native-base';
var todayDate = new Date()
    .toString()
    .substr(4, 12);
// Import Navigation

type Props = {};
export default class Home extends Component < Props > {

    constructor(props) {

        super(props)
        this.state = {
            active: false,
            chosenDate: "",
            isLoading:false

        };
    }

    setDate(newDate) {
        this.setState({chosenDate: newDate});
        alert(this.state.chosenDate)
    }

    componentDidMount() {

        this.setState({chosenDate: todayDate})
   
    }
    render() {
        return (

            <FadeIn style={{height:'100%'}}>
                <StatusBar backgroundColor="purple" barStyle="light-content"/>
               {
                   this.state.isLoading?
                   <View style={styles.loadingdiv}>
                   <View style={{backgroundColor:'#fff',padding:20,borderRadius:5}}>
                   <ActivityIndicator size="large" color="orange" />

                   </View>

                </View>:null
               }
                <ScrollView>

                    
                    <View style={styles.container}>
                        
                        <KeyboardAvoidingView behavior='position' enabled>
                            <View style={styles.companyName}>
                                
                                <Text style={styles.label}>Company name</Text>
                                <TextInput style={styles.myInput} placeholder='Enter name of company'></TextInput>
                                <Text style={styles.label}>Company location</Text>
                                <TextInput style={styles.myInput} placeholder='Enter location of company'></TextInput>
                                <Text style={styles.label}>Geo-coorinates</Text>

                                <TextInput style={styles.myInput} placeholder='Company Name'></TextInput>
                                <Text style={styles.label}>Date of visit</Text>
                                <View style={styles.myInput}>
                                    <DatePicker
                                        defaultDate={new Date()}
                                        style={{
                                        padding: 10
                                    }}
                                        locale={"en"}
                                        timeZoneOffsetInMinutes={undefined}
                                        modalTransparent={false}
                                        animationType={"fade"}
                                        androidMode={"default"}
                                        textStyle={{
                                        color: "green"
                                    }}
                                        placeHolderTextStyle={{
                                        color: "black"
                                    }}
                                        onDateChange={(newDate) => this.setState({chosenDate: newDate.toString()
    .substr(4, 12)})}
                                        disabled={false}/>
                                </View>


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
        backgroundColor: '#f4f4f4'
    },
    label: {
        padding: 10,
        fontFamily: 'italic',
        fontWeight: 'bold'
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
       
        
    }
});
