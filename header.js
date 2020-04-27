import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Header extends Component {
    render() {
        return (
            <View style={styles.head}>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        head: {
            backgroundColor: '#1e85c9', 
            justifyContent: "center",
            flex: 10, alignItems: "center",
            // width: 60, height: 40,
        }
    }
)