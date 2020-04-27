import React, { Component } from 'react';
import { View,StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class Bottem extends Component {
    render() {
        return (
            <View style={styles.navbar}>
                <Icon.Button name="home" backgroundColor='#1e85c9' size={40} />
                <Icon.Button name="compass" backgroundColor='#1e85c9' size={40} />
                <Icon.Button name="plus-circle" backgroundColor='#1e85c9' size={40} />
                <Icon.Button name="user" backgroundColor='#1e85c9' size={40} />
            </View>
        );
    }
}
const styles = StyleSheet.create(
    {

        navbar: {
            backgroundColor: '#1e85c9',
            flex: 10, flexDirection: "row", justifyContent: "space-around"
            , alignItems: "center"
        },
    }
)