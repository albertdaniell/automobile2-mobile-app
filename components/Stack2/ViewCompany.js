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
   
    DatePicker,
    Grid,
    Col,
    Badge,
    List,
    ListItem
} from 'native-base';
import { NavigationEvents } from 'react-navigation';
//firebase
import firebase from '../Firebase'
var db = firebase.firestore()
import Icon from 'react-native-vector-icons/Ionicons';

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
            companyDataExists:false,
            softwareExists:null,
            softwareName:'',
            UserId:'',
            EntryOwner:false,
            EntryBy:'',
            UserRole:'',
            superUser:false,
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

    test=()=>{
setTimeout(()=>{
    this.getCompanyDetails()
    this.getAutomobile() 
},10)
    }

    getCompanyDetails = () => {
        //alert(0)

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
                            .dateOfVisit,
                            EntryBy:doc
                            .data()
                            .userId
                    })
                  // alert(this.state.EntryBy)

                    // if(this.state.EntryBy === this.state.UserId){
                    //     // this.setState({
                    //     //     EntryOwner:true
                    //     // })

                    //     alert("This is the owner of the post")
                    // }
                    // else{
                    //     alert("Not owner of post")
                    // }

                 

                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }

            })
            .catch(function (error) {
                console.log("Error getting document:", error);
            });

    }

    getAutomobile=()=>{
           //get automation sware details

           var autoref=db.collection('softwares').where("companyId","==",this.state.compId)
           autoref.get().then(autoSnap=>{
               autoSnap.forEach((autodoc) => {
                   //alert(autodoc.data().softwareExists)
                   this.setState({
                       softwareExists:autodoc.data().softwareExists,
                       softwareName:autodoc.data().swareName


                   })

               })
               if(autoSnap.size >=1){
                   this.setState({
                       companyDataExists:true
                   })

                

               }


               else{
               this.setState({
                   companyDataExists:false
               })
               }
             

           }).catch(error=>{
               console.log('error occured')
           })
    }

    componentDidMount() {
       

        const compId = this
            .props
            .navigation
            .getParam('compId', 'NO-ID');
        
        const UserId = this
            .props
            .navigation
            .getParam('UserId', 'NO-USERID');
          
        const UserRole = this
        .props
        .navigation
        .getParam('UserRole', 'NO-USERole');

        if(UserRole === '1'){
           this.setState({
            superUser:true
           })
        }


        this.setState({compId: compId,UserId:UserId,UserRole:UserRole})
        setTimeout(()=>{
            this.getAutomobile() 
        },1000)
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
                <NavigationEvents
                  onWillFocus={
                   this.test
                  }
                />
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
                                <Item style={{borderBottomWidth:0}}>
                                 <Icon name='ios-briefcase' size={30} color="white"></Icon>

                                 <Text
                                        style={{
                                        color: '#fff',
                                        fontSize: 20,
                                        marginLeft:10
                                    }}>Company Name: {this.state.compName}</Text>
                                 </Item>
                                    
                                </ListItem>
                                <ListItem style={styles.myList}>
                                <Item style={{borderBottomWidth:0}}>
                                 <Icon name='ios-navigate' size={30} color="white"></Icon>

                                 <Text
                                        style={{
                                        color: '#fff',
                                        fontSize: 15,
                                        marginLeft:10
                                    }}>Company Location: {this.state.compLocation}</Text>
                                 </Item>



                                   
                                </ListItem>
                                <ListItem style={styles.myList}>


                                <Item style={{borderBottomWidth:0}}>
                                 <Icon name='ios-calendar' size={30} color="white"></Icon>

                                 <Text
                                        style={{
                                        color: '#fff',
                                        fontSize: 15,
                                        marginLeft:10
                                    }}>Date of Visit: {this.state.dateOfVisit}</Text>
                                 </Item>
                                  
                                </ListItem>
                            </List>
                        </View>
                        <View style={styles.div2}>

                            <ScrollView>
                                <View
                                    style={{
                                    padding: 10
                                }}>
                                 <Item>
                                 <Icon name='ios-car' size={40} color="purple"></Icon>

                                 <Text
                                        style={{
                                        fontWeight: 'bold',
                                        marginLeft:10
                                    }}>Vehicle Categories</Text>
                                 </Item>
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
                                <Item>
                                 <Icon name='ios-list' size={40} color="purple"></Icon>

                                 <Text
                                        style={{
                                        fontWeight: 'bold',
                                        marginLeft:10
                                    }}>Automation details</Text>
                                 </Item>

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
                                           {
                                               this.state.companyDataExists?
                                               
                                               <View>
                                                   <Text>Software exits {this.state.softwareExists}</Text>
                                                   <Text>Software name {this.state.softwareName}</Text>
                                                   </View>:
                                             this.state.superUser?
                                             <TouchableOpacity
                                            onPress={()=>this.props.navigation.navigate('AutomationDetails',{compId:this.state.compId, compName:this.state.compName})}
                                                style={{
                                                alignItems: 'center',
                                                marginTop: 10,
                                                backgroundColor: '#ededed',
                                                padding: 20,
                                                borderRadius: 50
                                            }}>
                                                <Text>Add data</Text>
                                            </TouchableOpacity>:<Text>No data available</Text>
                                           }
                                        </View>
}
                                </View>

                            </ScrollView>
                        </View>

                        </View>
                    }
                    {
    this.state.companyDataExists?
    this.state.superUser?
    <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{}}
                        style={{
                        backgroundColor: 'orange'
                    }}
                        position="bottomRight"
                       >
                       <Icon name='ios-create' size={30} color="white"></Icon>

                    </Fab>
    :null

    :null
}
                    </ImageBackground>

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
