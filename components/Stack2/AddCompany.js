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
    ActivityIndicator,YellowBox,Image,FlatList
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
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';


type Props = {};
export default class Home extends Component < Props > {

    constructor(props) {

        super(props)
        YellowBox.ignoreWarnings(['Setting a timer']);
        YellowBox.ignoreWarnings(['Failer prop type']);
        this.state = {
            active: false,
            chosenDate: "",
            isLoading:false,
            form1Complete:false,
            vehicles:[],
            vehicleInput:'',
            companyName:'',
            companyLocation:'',
            Geocoordinates:'',
            dateOfEntry:'',
            userId:'',
            Username:'',
            Approved:true,
            delete_status:false,
            showSubmitBtn:true,
            showFinishBtn:true,
            longi:'',
            lati:'',
            UserRole:'',
            vehiclesApi:[]

            
        };
    }

 


    setDate(newDate) {
        this.setState({chosenDate: newDate});
        alert(this.state.chosenDate)
    }

    componentDidMount() {

        setTimeout(()=>{
            this.getGeo()
        },1000)

        this.setState({chosenDate: todayDate,dateOfEntry:todayDate})
      
        
        //this._getVehiclesApi();
           
      
        const UserRole = this
        .props
        .navigation
        .getParam('UserRole', 'NO-USERole');

        this.setState({
            UserRole:UserRole
        })
        

    }

    geoSuucess=(position)=>{
        alert(position)
        this.setState({longi: position.coords.longitude, lati: position.coords.latitude, error: null});
alert(this.state.longi)

    }

    geoFailure=(error)=>{
    // alert(error.messaage)
    }

    getGeo=()=>{
        
       
      
        navigator
        .geolocation
        .getCurrentPosition(position=>{
            alert(position.coords.longitude)
        },this.geoFailure)
        
       
    }

    _getVehiclesApi = async () =>{
        console.log("Fetching data from api...")
        const vehiclesApiData=[];
        const carsUrl='https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json';
        const fetchCars=  await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json')
        
        const jsonCars=await fetchCars.json()
        console.log(jsonCars)

        this.setState({
            vehiclesApi:jsonCars.Results
        })

        //console.log(this.state.vehiclesApi)

        
        //alert(jsonCars)
    }

    submitFn1=async()=>{

        // if(this.state.companyName === '' || this.state.companyLocation === ''){
        //     alert("Fields cannot be empty!")

        //     return 0;
        // }
       const step1= this.setState({
            
            isLoading:true,
            showSubmitBtn:false
        })
     

        const step2=await step1
        
     setTimeout(()=>{

        this.setState({
            form1Complete:true,
            isLoading:false,
            showSubmitBtn:true
        })

     },300)
    }

    submitFn2=async()=>{

        const step1= this.setState({
            
            isLoading:true,
            showFinishBtn:false
        })

        setTimeout(()=>{


            var ref=db.collection('companies')
            var companyRef=ref.add({
                companyName:this.state.companyName,
                companyLocation:this.state.companyLocation,
                geo:this.state.Geocoordinates,
                dateOfVisit:this.state.chosenDate,
                dateOfEntry:this.state.dateOfEntry,
                userId:this.state.userId,
                Userame:this.state.Username,
                Approved:this.state.Approved,
                delete_status:this.state.delete_status,
                longitude:this.state.longi,
                latitude:this.state.lati
    
            }).then((docRef)=>{
               // alert("Success!")
                this.props.navigation.replace('ViewCompany',{compId:docRef.id,UserRole:this.state.UserRole})
                console.log("Addedd successfully with id"+docRef.id)
    
                setTimeout(()=>{
    
                    var vref=db.collection('vehicles')
                    vref.add({
                        companyId:docRef.id,
                        companyName:this.state.companyName,
                        userid:'',
                        Username:'',
                        vehicles:this.state.vehicles
                    })
    
                },1000)
            }).catch(error=>{

        this.setState({
            
            isLoading:false,
            showFinishBtn:true
        })

        alert(error)
                console.log(error)
            })
        },1000)
     

        const step2=await step1
        
     setTimeout(()=>{

        this.setState({
            
            isLoading:false,
            showFinishBtn:true
        })

     },2000)

        

    
    

      
    }

    addVehicle2(value){
        //alert(value)

        const {vehicles} = this.state.vehicles;
const newItem= value

        this.setState({
            vehicles:[...this.state.vehicles,newItem],
            
        })
    }

    addVehicle=()=>{

        if(this.state.vehicleInput === ''){
            alert("Input cannot be empty, if you are done click the finish button below")

            return 0;
        }
     
const {vehicles} = this.state.vehicles;
const newItem= this.state.vehicleInput

        this.setState({
            vehicles:[...this.state.vehicles,newItem],
            
        })
    }


    addVehicleCat=(vehicle,index)=>{

        //console.log("Updating "+ vehicle)

        this.state.vehicles[index]=vehicle
        this.setState({
            vehicles:this.state.vehicles
        })

        console.log("Vehicles"+this.state.vehicles)
    }

    removeVehicle=(index)=>{
        
        this.state.vehicles.splice(index,1)

        console.log(this.state.vehicles,"$$$$")

        this.setState({
            vehicle:this.state.vehicles
        })
    }
    render() {
        return (

            <FadeIn style={{height:'100%'}}>
                <StatusBar backgroundColor="purple" barStyle="light-content"/>
                {/* {this.state.vehiclesApi.Results} */}
          
{/*                
                <FlatList
                  
                    data={this.state.vehiclesApi}
                    
                    renderItem={({item}) => <Text key={item.key} avatar>
                                           
</Text>}/> */}
               {
                   this.state.isLoading?
                   <View style={styles.loadingdiv}>
                   <View style={{backgroundColor:'#fff',padding:20,borderRadius:5}}>
                   <ActivityIndicator size="large" color="orange" />

                   </View>

                </View>:null
               }
               
                <View showsVerticalScrollIndicator={false}>

                    
                    <View style={styles.container}>
                        
                       

                     {
                         this.state.form1Complete?
                         <View style={styles.form2}>

                         <ScrollView style={{maxHeight:100,backgroundColor:'#ccc',marginBottom:20}}>
              {
                    this.state.vehiclesApi.map((vehicle)=>{
                        return(
                            <TouchableOpacity  onPress={()=>this.addVehicle2(vehicle.Make_Name)} style={{padding:10,borderBottomColor:'#ccc'}}>
                            <Text>{vehicle.Make_Name}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
              </ScrollView>
                             <TouchableOpacity
                             onPress={()=>this.setState({form1Complete:false})}
                              style={{padding:10}}>
                                 <Text>Go back to previous</Text>
                             </TouchableOpacity>
                             <Text style={styles.label}>Vehicle category</Text>

                          

{
    this.state.vehicles.map((vehicle,index)=>{
        return(

            <Grid key={index}>
          <Col style={{ width:'50%',marginTop:10 }}>
          <View disabled   style={{flex:0.9,padding:2}} placeholder='Enter the vehicle category'>
          <Badge success>
          <Text style={{padding:2,color:'white'}}>{vehicle} </Text>
          </Badge>
             
          </View>

          </Col>
          <Col style={{ width:'20%',marginTop:10 }}>
          <TouchableOpacity onPress={(index)=>this.removeVehicle(index)} style={{padding:2,alignItems:'center',borderRadius:10,marginTop:2}}><Image style={{height:20,width:20}} source={require('../../android/assets/images/cancel.png')} >
              </Image></TouchableOpacity>

          </Col>
        </Grid>
            //<Text key={index} onPress={this.removeVehicle}>Vehicle : {vehicle} - </Text>
        )
    })
}

                   


                           <Grid>
          <Col style={{ width:'80%',marginTop:10 }}>
          <TextInput  onSubmitEditing={this.addVehicle}  onChangeText={(vehicleInput)=>this.setState({vehicleInput})} autoFocus={true} style={styles.myInput} placeholder='Enter the vehicle category'></TextInput>


          </Col>

          <Col style={{ width:'20%',marginTop:10 }}>
          <TouchableOpacity onPress={this.addVehicle} style={{alignItems:'center',marginTop:10,backgroundColor:'#ccc',padding:13}}>
          <Image style={{height:25,width:25}} source={require('../../android/assets/images/plus-black.png')} >
              </Image>
          </TouchableOpacity>


          </Col>
   
        </Grid>


                      <KeyboardAvoidingView>
                   
              {
                  this.state.showFinishBtn?
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
                                onPress={this.submitFn2}
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
                                        }}>finish</Text>

                                    </TouchableOpacity>
                                </ImageBackground>
                                :null
              }
                            </KeyboardAvoidingView>
                      </View>: <KeyboardAvoidingView behavior='padding' enabled>
                            <View style={styles.companyName}>
                                
                                <Text style={styles.label}>Company name</Text>
                                <TextInput value={this.state.companyName} onChangeText={(companyName)=>this.setState({companyName})}  style={styles.myInput} placeholder='Enter name of company'></TextInput>
                                <Text style={styles.label}>Company location</Text>
                                <TextInput value={this.state.companyLocation} onChangeText={(companyLocation)=>this.setState({companyLocation})} style={styles.myInput} placeholder='Enter location of company'></TextInput>
                                <Text style={styles.label}>Geo-coorinates (auto-generated )</Text>

                              
                                    <Text style={styles.myInput}>{this.state.longi}, {this.state.lati}</Text>
                                   
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
{
    this.state.showSubmitBtn?
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
                                        }}>Submit</Text>

                                    </TouchableOpacity>
                                </ImageBackground>:null
}

                               
                            </View>
                        </KeyboardAvoidingView>
                     }
                   

                    </View>

                    
                </View>
            
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
       
        
    },
    form2:{
        height:'100%'
    }
});
