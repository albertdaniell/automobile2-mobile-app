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
    Image,
    TouchableOpacity,
    StatusBar
} from 'react-native';

import Anime1 from './anime/anime1'
import FadeIn from './anime/FadeIn'

// Import Navigation

type Props = {};
export default class Splash extends Component < Props > {
    render() {
        return (

            <View>
            <StatusBar backgroundColor="purple" barStyle="light-content" />
                <View style={styles.container}>
                   <FadeIn>
                   <Image
                        style={{
                        width: 300,
                        height: 300
                    }}
                        source={require('../android/assets/images/ICON.png')}></Image>

                   </FadeIn>
                </View>
                <View
                    style={{
                    position: 'absolute',
                    width: '100%',
                    bottom: 0,
                }}>

               <FadeIn>
               <View style={{padding:30,letterSpacing:15,color:'black',fontSize:14,position:'absolute',bottom:70,textAlign:'center',alignItems:'center',width:'100%'}}>

<Text style={{fontWeight:'bold',fontSize:16,letterSpacing:1}}>Dont have account?  Sign Up</Text>
</View>

               </FadeIn>

          <Anime1>
          <TouchableOpacity
          onPress={()=>this.props.navigation.navigate('LoginScreen')}
          >
                <ImageBackground
                
                        source={require('../android/assets/images/btn1.png')}
                        style={{
                        height: '100%',
                        width: '100%',
                        alignItems:'center'
                    }}>


                        <Text style={{padding:30,letterSpacing:15,color:'#fff',fontSize:14}}>GET STARTED</Text>

                    </ImageBackground>
                </TouchableOpacity>
          </Anime1>
                 
                </View>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
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
