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
    Icon,
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

// Import Navigation

//firebase
import firebase from '../Firebase'
var db = firebase.firestore()


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
        };
    }

    componentDidMount() {

        AppState.addEventListener('change', this.handleAppStateChange);

        setTimeout(()=>{
            this.getAllCompanies()
        },1000)
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

    getAllCompanies=()=>{
        this.setState({
            isLoading:true
        })
        const companies = [];

        var ref=db.collection('companies')

        ref.get().then((querysnapShot)=>{
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

                <View style={styles.container}>
                 
                   
                     <Text 
                        style={{
                        fontSize: 30,
                        padding: 10
                    }}>Explore</Text>
               <View style={{backgroundColor:'#ededed',margin:10,borderRadius:10,borderBottomWidth:0,borderBottomColor:'transparent'}}>
               <Item style={{borderBottomWidth:0}}>
        
            <Input placeholder="Search" />
       
          </Item>
               </View>

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
                            compId:item.key
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
              
               
                 
                </View>

                <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{}}
                        style={{
                        backgroundColor: 'orange'
                    }}
                        position="bottomRight"
                        onPress={()=>this.props.navigation.navigate('AddCompany')}>
                      <Image style={{height:30,width:30}} source={require('../../android/assets/images/plus-white.png')}></Image>

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
    }
});
