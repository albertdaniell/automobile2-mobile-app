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
    DatePicker,Grid,Col,Badge,Picker, Textarea
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
            q1: 'Yes',
            softwareExists:true,
            period:'',
            compId:'',
            compName:'',
            softwareName:'',
            updatePeriod:'',
            improvementAreas:'',
            areasAutomated:''

         

            
        };
    }

    submitForm=()=>{
        if(this.state.softwareName == '' || this.state.period == ''){
            alert("Fields cannot be empty!")

            return 0;
        }
        var ref=db.collection('softwares');
        ref.add({
            softwareExists:this.state.softwareExists,
            swareName:this.state.softwareName,
            period_of_use:this.state.period,
            updatePeriod:this.state.updatePeriod,
            improvementAreas:this.state.improvementAreas,
            areasAutomated:this.state.areasAutomated,
            date:'',
            userId:'',
            delete_status:false,
            approved_status:true,
            companyId:this.state.compId


        }).then(()=>{
            this.props.navigation.navigate('ViewCompany',{compId:this.state})

           // alert("Updated success")
        }).catch(error=>{
            alert(error)
        })
    }
    onValueChange3(value: string) {
        this.setState({
          period: value,
          
        });

    }


    onValueChange2(value: string) {
        this.setState({
          q1: value,
          
        });
     // alert(this.state.q1)

        if(this.state.q1 == 'Yes'){
       setTimeout(()=>{
        this.setState({
            softwareExists:false
        })
       },10)
        }

        else if(this.state.q1 =='No'){
            setTimeout(()=>{
                this.setState({
                    softwareExists:true
                })
               },10)

        }

        else{
         
        }
      }
   
    componentDidMount() {
        const compId = this
        .props
        .navigation
        .getParam('compId', 'NO-ID');

        const compName = this
        .props
        .navigation
        .getParam('compName', 'NO-Company name');

    this.setState({compId: compId,compName:compName})
     setTimeout(()=>{
        if(this.state.q1 == 'Yes'){
            this.setState({
                softwareExists:true
            })
            }
    
            else if(this.state.q1 =='No'){
                this.setState({
                    softwareExists:false
                })
    
            }
    
            else{
    
            }
     },1000)
   
    }






    render() {
        return (

            <FadeIn style={{height:'100%'}}>
                <StatusBar backgroundColor="purple" barStyle="light-content"/>
       
                <ScrollView>

                    
                    <View style={styles.container}>
                        
                    <KeyboardAvoidingView behavior='padding' enabled>
                    <Text style={styles.instructions}>Fill in the following data entry form for {this.state.compName}</Text>
                   <View style={styles.yesDiv}>
                       
                   <Text style={styles.label}>Does the company have automation application sofware for motor vehicle assembly line?</Text>
                                <Item picker>
              <Picker
              style={styles.myInput}
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
               
                placeholder="Select"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.q1}
                onValueChange={this.onValueChange2.bind(this)}
              >
              <Picker.Item label="No" value="No"/>
                <Picker.Item label="Yes" value="Yes"/>
                
              </Picker>
            </Item>
                        
                       </View>   

                            {this.state.softwareExists?
                                <View  style={styles.yesDiv}>

                            
             
<Text style={styles.label}>Which one?</Text>
         <TextInput onChangeText={(softwareName)=>this.setState({softwareName})} value={this.state.softwareName}  style={styles.myInput} placeholder='Enter name of the software'></TextInput>
         <Text style={styles.label}>For how long has the company been using the software?</Text>
         <Item picker>
              <Picker
              style={styles.myInput}
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
               
                placeholder="Select"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.period}
                onValueChange={this.onValueChange3.bind(this)}
              >
                <Picker.Item label="Choose" value=""/>
                <Picker.Item label="1 month" value="1 month"/>
                <Picker.Item label="1-5 years" value="1-5y"/>
                <Picker.Item label="6-10 years" value="6-10y"/>
                <Picker.Item label="Over years" value="over10"/>


                

              </Picker>
            </Item>

            <Text style={styles.label}>How frequent do you update your software?</Text>
            <TextInput onChangeText={(updatePeriod)=>this.setState({updatePeriod})}  style={styles.myInput}></TextInput>


            <Text style={styles.label}>Are there areas where you need improvement in the software?</Text>

            <Textarea onChangeText={(improvementAreas)=>this.setState({improvementAreas})}  style={styles.myInput2} rowSpan={5} bordered placeholder="..." />
            <Text style={styles.label}>Apart from automation motor vehicles assemply line, whuch other areas within your organization need to be automated?</Text>

<Textarea onChangeText={(areasAutomated)=>this.setState({areasAutomated})}  style={styles.myInput2} rowSpan={5} bordered placeholder="..." />

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
         onPress={this.submitForm}
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
                 }}>Submit form</Text>

             </TouchableOpacity>
         </ImageBackground>


        
     </View>
                            :
                                <View style={styles.noDiv}>

<Text>No</Text>
</View>

                            }

                          
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
    },    myInput2: {
        
        marginTop: 10,
        marginBottom: 10,
   
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
padding:5
    },
    noDiv:{
        backgroundColor:'#e0e0e0',
        padding:10
            }
});
