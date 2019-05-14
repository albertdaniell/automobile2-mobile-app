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
    StatusBar,ScrollView
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
    Icon
} from 'native-base';

// Import Navigation

type Props = {};
export default class Home extends Component < Props > {

    constructor(props) {
        super(props)
        this.state = {
            active: false
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

    componentDidMount() {}
    render() {
        return (

            <FadeIn>
                <StatusBar backgroundColor="purple" barStyle="light-content"/>

                <View style={styles.container}>
                 <ScrollView>
                 <Text
                        style={{
                        fontSize: 30,
                        padding: 10
                    }}>Explore Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio nam laborum laboriosam ipsa ad quidem, temporibus delectus, dolorem rerum cum aliquam, commodi voluptate neque doloremque. Consectetur consequatur magni nihil neque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet earum cupiditate aliquid nostrum numquam molestias tempore ab? Libero dicta modi, eaque officia dolorem, recusandae et nemo veritatis quasi reprehenderit optio? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quae natus qui quos minima eos, harum sed nihil neque doloremque corporis nulla libero ratione, numquam repellat quam! Saepe, veniam animi.</Text>
                 </ScrollView>
                 
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
                        <Icon name="share"/>

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
