import React, { Component } from 'react';
import { Header, Left, Button, Body, Title, Right, Icon } from 'native-base';
import * as firebaseR from "firebase";
import PropTypes from 'prop-types';
import { Alert, AsyncStorage } from 'react-native';

export default class Hheader extends Component {

    static propTypes = {
        SName: PropTypes.string.isRequired
    };
    userSignout() {
        firebaseR.auth().signOut();
        this._signOutAsync();
    }
    _signOutAsync= async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate("Auth");
    }
    render() {
        return (
            <Header noLeft style={{ backgroundColor: '#d9534f', height: 75 }}>
                <Body>
                    <Title style={{ fontWeight: "bold" }}>{this.props.SName}</Title>
                </Body>
                <Right>
                    <Button transparent onPress={() => Alert.alert(
                        'Sign Out',
                        'Really you want to logout?',
                        [
                            { text: 'Cancel', style: 'cancel', },
                            { text: 'OK', onPress: () => this.userSignout() },
                        ],
                        { cancelable: false },
                    )}>
                        <Icon active name="md-log-out" />
                        {/* <Text>Logout</Text> */}
                    </Button>
                </Right>
            </Header >
        );
    }
}