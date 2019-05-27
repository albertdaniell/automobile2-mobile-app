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
    Grid,
Col
} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

// Import Navigation

//firebase
import firebase from '../Firebase'
var db = firebase.firestore()
import { NavigationEvents } from 'react-navigation';


type Props = {};
export default class Home extends Component < Props > {

    constructor(props) {
        super(props)
        YellowBox.ignoreWarnings(['Setting a timer']);
        YellowBox.ignoreWarnings(['Failed prop type']);
        YellowBox.ignoreWarnings(["Can't perform a React state update on an unmounted component"]);

        this.state = {
            active: false,
            companies:[],
            isLoading: true,
            appState: AppState.currentState,
            isLoading: true,
            Username:'',
            Role:'',
            superUser:false,
            UserId:'',
            message:'',
            isSearching:false,
            companies2:[],
            searchCompQuery:'',
            message:'',
            companyDataPresent:true,
            longi:'',
            lati:'',
            recentSearchcompanies:[]
        };
    }

    geoSuucess=(position)=>{
        this.setState({longi: position.coords.longitude, lati: position.coords.latitude, error: null});
alert(this.state.longi)

    }

    geoFailure=(error)=>{
     
    }

    getGeo=()=>{
      
        navigator
        .geolocation
        .getCurrentPosition(this.geoSuucess,this.geoFailure)

       
    }

    test=()=>{
      
        setTimeout(()=>{
            this.getAllCompanies()
        },10)
       
            }

    checkUser=()=>{
        firebase.auth().onAuthStateChanged((user)=> {
            if (user) {
//update state

this.setState({
    Email:user.email
})
                //get user datails


        var ref=db.collection('users')
        var userRef=ref.where("Email","==",user.email)
        userRef.get().then(dataSnap=>{
            dataSnap.forEach((doc)=>{
                this.setState({
                    Username:doc.data().Username,
                    Role:doc.data().Role,
                    UserId:doc.id
                })

               // alert(doc.id)

                if(this.state.Role === '1'){
                    this.setState({
                        superUser:true
                    })
                }
              // alert(this.state.Role)

               
            })
        })
    
            } else {
         
            }
          });

        
          
    }

    predictFn=(sq)=>{
        alert(/^T/.test(sq))
     //return  /^T/.test(sq);
    }

    searchFn=()=>{

        setTimeout(()=>{
            this.setState({
                isLoading:true
            })
            if(this.state.searchCompQuery === ''){
                this.setState({
                    isSearching:false,isLoading:false
                })
            }
            else{
                this.setState({
                    isSearching:true
                })  
            }

            const mycompdata=this.state.companies.filter((com)=>{
              //  return com.companyName == 'Test1'
              var str =JSON.stringify(com.companyName);
              var patt = new RegExp(this.state.searchCompQuery);

              return patt.test(str)
    
          
            })

            this.setState({
                companies2:mycompdata,isLoading:false
            })

            console.log(mycompdata)
         
               
     
         },1000)
    }


    updateRecentSearch=(compId,UserId,companyName)=>{
      setTimeout(()=>{
        this.props.navigation.navigate('ViewCompany',{
            compId:compId,UserId:this.state.UserId,UserRole:this.state.Role
        })
        //alert(companyName)
        var ref=db.collection('searches')
        ref.add({
            userid:UserId,
            postid:compId,
            companyName:companyName
            

        }).then(()=>{
            
            console.log("Data has been added")

        }).catch(error=>{
            console.log(error.message)
        })
      },1000)

    }

listen=()=>{
    db.collection("user")
    .onSnapshot((doc) =>{
        alert("Current data...")

        this.setState({
            message:'A new user has been added to the system'
        })
        // console.log("Current data: ", doc.data());
    });
}


    async componentDidMount() {

       
        const fn1=await this.checkUser();
        const fn11=await fn1
        const fn2=await this.getAllCompaniesSearches()
        const fn22=await fn2

        const fn3=await this.getGeo()
        const fn33=await fn3
        const fn4=await this.test()
        const fn44=await fn4
        

        // fn2
        // const fn3=await fn2
        // fn3

        // const
        // setTimeout(()=>{
        //     this.checkUser()
        //     this.getGeo()
        //     this.getAllCompaniesSearches()
        // },1000)
      //  this.listen()

      

      

        AppState.addEventListener('change', this.handleAppStateChange);

      }

      handleAppStateChange = (nextAppState) => {
         // alert(0)
        if (
          this.state.appState.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
            this.getAllCompanies()
            //alert("app has come to foreground")
          console.log('App has come to the foreground!');
        }
        this.setState({appState: nextAppState});
      };



      getAllCompaniesSearches=()=>{
        setTimeout(()=>{
            this.setState({
                isLoading:true,
                
            })
            const recentSearchcompanies = [];
            var userid=this.state.UserId;
    
            var ref=db.collection('searches').where("userid","==",`${userid}`)
    
            ref.get().then((querysnapShot)=>{

                

    
                if (querysnapShot.size >=1){
    //alert("nicee")
                }
    
                else{
                    //alert("No data for "+this.state.UserId)
                    this.setState({
                   //  companyDataPresent:false,isLoading:false
                    })
    
                }
               querysnapShot.forEach(doc=>{
                const {companyName,companyLocation}=doc.data()
                recentSearchcompanies.push({
                    key:doc.id,
                    doc,companyName,
                    companyLocation
                })
    
                this.setState({recentSearchcompanies,isLoading:false})
               })
            })
        },1000)

    }

    getAllCompanies=()=>{
        this.setState({
            isLoading:true,
            
        })
        const companies = [];

        var ref=db.collection('companies')

        ref.get().then((querysnapShot)=>{

            if (querysnapShot.size >=1){
this.setState({
    companyDataPresent:true
})
            }

            else{
                this.setState({
                 companyDataPresent:false,isLoading:false
                })

            }
           querysnapShot.forEach(doc=>{
            const {companyName,companyLocation}=doc.data()
            companies.push({
                key:doc.id,
                doc,companyName,
                companyLocation
            })

            this.setState({companies,isLoading:false})
           })
        })

    }
    loadGetStarted = async() => {

        setTimeout(() => {
            this
                .props
                .navigation
                .reset([NavigationActions.navigate({routeName: 'GetStarted'})], 0)
        }, 4000)

    }

    pull = () => {
        this.getAllCompanies()

        
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
                <View style={styles.container}>
                 
                   
                     <Text 
                        style={{
                        fontSize: 30,
                        padding: 10,
                        fontWeight:'bold'
                    }}>Explore</Text>
               <View style={{backgroundColor:'#ededed',margin:10,borderRadius:10,borderBottomWidth:0,borderBottomColor:'transparent'}}>
               <Item style={{borderBottomWidth:0}}>
        
            <Input onFocus={()=>this.setState({isSearching:true})} onChange={this.searchFn} onSubmitEditing={this.searchFn} onChangeText={(searchCompQuery)=>this.setState({searchCompQuery})} placeholder="Search" />
       
          </Item>
               </View>
               {
                   this.state.isSearching?
                   <View>
                       <View><Text style={{color:'orange',padding:10,marginTop:-10}}>{this.state.message}</Text></View>
<View>

    <Text style={{fontStyle:'italic',padding:10,fontWeight:'bold'}}>Recent Searches</Text>
  <ScrollView style={{height:200,backgroundColor:'#ededed'}}>
  <FlatList
  
                    data={this.state.recentSearchcompanies}
                    
                    renderItem={({item}) => <ListItem key={item.key} avatar>
                    <Left>
                    <Icon name='ios-time' size={30} color='black'></Icon>

                    </Left>
                    <Body>
                        <TouchableOpacity 
                        onPress={()=>this.updateRecentSearch(item.key,this.state.UserId,item.companyName)}
                       
                       
                        >
                            <Text
                                style={{
                                marginBottom: 5,
                                padding: 2
                            }}>{item.companyName} </Text>
                            <Text note style={{fontSize:12,color:'#ccc'}}>{item.companyLocation}</Text>
                        </TouchableOpacity>

                       
                    </Body>
                    <Right>
                    <Image style={{height:10,width:10,marginTop:10}} source={require('../../android/assets/images/arrow-right.png')}></Image>

                    </Right>
</ListItem>}/>
  </ScrollView>
</View>
                
                   <FlatList
                    onRefresh={this.pull}
                    refreshing={this.state.isLoading}
                    data={this.state.companies2}
                    
                    renderItem={({item}) => <ListItem key={item.key} avatar>
                    <Left>
                    <Image style={{height:20,width:20,marginTop:10}} source={require('../../android/assets/images/company.png')}></Image>

                    </Left>
                    <Body>
                        <TouchableOpacity 
                        onPress={()=>this.updateRecentSearch(item.key,this.state.UserId,item.companyName)}
                       
                       
                        >
                            <Text
                                style={{
                                marginBottom: 5,
                                padding: 2
                            }}>{item.companyName} </Text>
                            <Text note style={{fontSize:12,color:'#ccc'}}>{item.companyLocation}</Text>
                        </TouchableOpacity>

                       
                    </Body>
                    <Right>
                    <Image style={{height:10,width:10,marginTop:10}} source={require('../../android/assets/images/arrow-right.png')}></Image>

                    </Right>
</ListItem>}/>
                       
                       </View>:
                   <View>
                      {
                          this.state.companyDataPresent?
                          <FlatList
                    onRefresh={this.pull}
                    refreshing={this.state.isLoading}
                    data={this.state.companies}
                    
                    renderItem={({item}) => <ListItem key={item.key} avatar>
                    <Left>
                    <Image style={{height:20,width:20,marginTop:10}} source={require('../../android/assets/images/company.png')}></Image>

                    </Left>
                    <Body>
                        <TouchableOpacity 
                       
                        onPress={()=>this.props.navigation.navigate('ViewCompany',{
                            compId:item.key,UserId:this.state.UserId,UserRole:this.state.Role
                        })}
                        >
                            <Text
                                style={{
                                marginBottom: 5,
                                padding: 2
                            }}>{item.companyName} </Text>
                            <Text note style={{fontSize:12,color:'#ccc'}}>{item.companyLocation}</Text>
                        </TouchableOpacity>

                       
                    </Body>
                    <Right>
                    <Image style={{height:10,width:10,marginTop:10}} source={require('../../android/assets/images/arrow-right.png')}></Image>

                    </Right>
</ListItem>}/>
                          
                          :
                          <View style={{alignItems:'center',justifyContent:'center',width:'100%',height:'100%',marginTop:-50}}>
                       <Image style={{height:'50%',width:'70%'}} source={require('../../android/assets/images/Nodata.png')}></Image>

                       </View> 
                      }

               
                   </View>
               }

                  
              
               
                 
                </View>

             {
                 this.state.superUser?
                 <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{}}
                        style={{
                        backgroundColor: 'orange'
                    }}
                        position="bottomRight"
                        onPress={()=>this.props.navigation.navigate('AddCompany',{UserRole:this.state.Role})}>
                        <Icon name='ios-add' size={40} color="purple"></Icon>

                    </Fab>
                 
                 :null
             }
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
    }
});
