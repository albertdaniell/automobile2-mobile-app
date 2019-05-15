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
    DatePicker,
    Grid,
    Col,
    Badge,
    List,
    ListItem
} from 'native-base';

//firebase
import firebase from '../Firebase'
var db = firebase.firestore()

type Props = {};
export default class ViewCompany extends Component < Props > {

    constructor(props) {
        super(props)
        YellowBox.ignoreWarnings(['Setting a timer']);
        YellowBox.ignoreWarnings(['Each child in a list should have a unique "key" prop']);

        this.state = {
            active: false,
            compId: '',
            compName: '',
            compLocation: '',
            dateOfVisit: '',
            vehicles: [],
            automationData: false,
            isLoading: true,
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

    getAutomationData = () => {

        var compId = this.state.compId
        var ref = db
            .collection('automation')
            .where("companyId", "==", compId)
        ref
            .get()
            .then((datasnapShot) => {
                if (datasnapShot.size >= 1) {
                    //alert("Data is here")
                    console.log("data is here.....")
                    this.setState({automationData: true})
                } else {
                    this.setState({automationData: false})
                    // alert("no data for "+ compId)

                }
            })

    }

    getCompanyVehicles = () => {

        var compId = this.state.compId
        var ref = db
            .collection('vehicles')
            .where("companyId", "==", compId)
        ref
            .get()
            .then((datasnapShot) => {
                if (datasnapShot.size >= 1) {
                    //alert("Data is here")
                    console.log("data is here.....")

                    datasnapShot.forEach((doc) => {
                        console.log(doc.data())

                        this.setState({
                            vehicles: doc
                                .data()
                                .vehicles,
                                isLoading:false
                        })

                        console.log("this is the data: " + this.state.vehicles)
                    })
            

                } else {

                    // alert("no data for "+ compId)

                }
            })

    }

    getCompanyDetails = () => {

        var compId = this.state.compId
        var ref = db.collection('companies')

        ref
            .doc(compId)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    //alert("yeaaah")
                    console.log("Document data:", doc.data());

                    this.setState({
                        compName: doc
                            .data()
                            .companyName,
                        compLocation: doc
                            .data()
                            .companyLocation,
                        dateOfVisit: doc
                            .data()
                            .dateOfVisit
                    })
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }

            })
            .catch(function (error) {
                console.log("Error getting document:", error);
            });

    }

    componentDidMount() {

        const compId = this
            .props
            .navigation
            .getParam('compId', 'NO-ID');

        this.setState({compId: compId})

        setTimeout(() => {
            this.getCompanyDetails()
            this.getCompanyVehicles()
            this.getAutomationData()
        }, 1000)
    }
    render() {
        return (

            <FadeIn>
                <StatusBar backgroundColor="purple" barStyle="light-content"/>
{
    this.state.isLoading?
    <View style={styles.loadingdiv}>
                   <View style={{backgroundColor:'#fff',padding:20,borderRadius:5}}>
                   <ActivityIndicator size="large" color="orange" />

                   </View>

                </View>:null
}
                <View style={styles.container}>
                    <ImageBackground
                        style={{
                        height: '100%'
                    }}
                        source={require('../../android/assets/images/bg.png')}>
                    {
                        this.state.isLoading?null:
                        <View>


                        <View
                            style={{
                            padding: 10
                        }}>
                            <List
                                style={{
                                marginLeft: 0,
                                padding: 0
                            }}>
                                <ListItem style={styles.myList}>
                                    <Text
                                        style={{
                                        color: '#fff',
                                        fontSize: 20
                                    }}>Company Name: {this.state.compName}</Text>
                                </ListItem>
                                <ListItem style={styles.myList}>
                                    <Text
                                        style={{
                                        color: '#fff',
                                        fontSize: 15
                                    }}>Company Location: {this.state.compLocation}</Text>
                                </ListItem>
                                <ListItem style={styles.myList}>
                                    <Text
                                        style={{
                                        color: '#fff',
                                        fontSize: 15
                                    }}>Date of Visit: {this.state.dateOfVisit}</Text>
                                </ListItem>
                            </List>
                        </View>
                        <View style={styles.div2}>

                            <ScrollView>
                                <View
                                    style={{
                                    padding: 10
                                }}>
                                    <Text
                                        style={{
                                        fontWeight: 'bold',
                                        textDecorationLine: 'underline'
                                    }}>Vehicle Categories</Text>
                                    <View
                                        style={{
                                        flexWrap: 'wrap',
                                        alignItems: 'flex-start',
                                        flexDirection: 'row'
                                    }}>
                                        {this
                                            .state
                                            .vehicles
                                            .map((vehicle) => {
                                                return (
                                                    <Text
                                                        style={{
                                                            flexDirection:'column',backgroundColor:'orange',marginRight:10,padding:5,borderRadius:4,marginBottom:3,marginTop:10
                                                    }}>{vehicle}</Text>
                                                )
                                            })
}
                                    </View>

                                </View>

                                <View
                                    style={{
                                    padding: 10
                                }}>
                                    <Text
                                        style={{
                                        fontWeight: 'bold',
                                        textDecorationLine: 'underline'
                                    }}>Automation software data</Text>

                                    {this.state.automationData
                                        ? null
                                        : <View>

                                            <View
                                                style={{
                                                padding: 10,
                                                marginTop: 10,
                                                flex: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                               
                                            </View>
                                            <TouchableOpacity
                                            onPress={()=>this.props.navigation.navigate('AutomationDetails')}
                                                style={{
                                                alignItems: 'center',
                                                marginTop: 10,
                                                backgroundColor: '#ededed',
                                                padding: 20,
                                                borderRadius: 50
                                            }}>
                                                <Text>Add data</Text>
                                            </TouchableOpacity>
                                        </View>
}
                                </View>

                            </ScrollView>
                        </View>

                        </View>
                    }
                    </ImageBackground>

                </View>

                <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{}}
                        style={{
                        backgroundColor: 'orange'
                    }}
                        position="bottomRight"
                       >
                      <Image style={{height:30,width:30}} source={require('../../android/assets/images/edit.png')}></Image>

                    </Fab>
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
    myList: {
        backgroundColor: 'rgba(118, 53, 104,.7)',
        marginLeft: 0,
        padding: 0,
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        borderBottomColor: 'transparent'
    },
    div2: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 10,
        height: '100%',
        marginTop: 20

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
