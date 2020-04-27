import React, { Component } from 'react';
import { Text, AsyncStorage, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MHeader from '../Component/hHeader';
import { Container, View, Thumbnail, Button } from 'native-base';
import * as firebaseR from "firebase";
import 'firebase/firestore';

export default class Signup extends Component {
    state = {
        checked: false, Screen: "Profile",
        userToken: {
            urole: '', uemail: '', uname: 'Name',
        },
    };

    constructor() {
        super();
        // this.startin();
    }

    putValue(userToken) {
        var alpha = async (data) => {
            this.setState({ userToken: data ,checked:true })
            console.log(" 1=> ", this.state.userToken.uname);
        };
        firebaseR.firestore().collection("usersData")
            .where("uemail", "==", userToken)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    alpha(doc.data());
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            })
    }

    startin = async () => {
        // this.setState=({checked:true});
        const userToken = await AsyncStorage.getItem('userToken');
        console.log("token is ", userToken)
        this.putValue(userToken)

    };
    render() {
        if (this.state.checked != true)
            this.startin();

        return (
            <Container style={{ backgroundColor: "#fef" }}>
                <MHeader SName={this.state.Screen} />
                <View padder style={{ flexDirection: "row" }}>
                    <View style={{ width: "40%", justifyContent: "center", alignItems: "center" }}>
                        <Thumbnail style={{ width: 100, height: 100, borderRadius: 300 }} large source={{ uri: "https://alphachetan.000webhostapp.com/user.png" }} />
                        <Text style={{ fontSize: 25 }} >{this.state.userToken.uname}</Text>
                        {/* {this.putValue()} */}
                        <Text note>{this.state.userToken.urole}</Text>
                    </View>
                    <View style={{ flexDirection: "row", width: "60%", justifyContent: "space-evenly", alignItems: "center" }}>
                        <View style={{ alignItems: "center" }}>
                            <Icon name="cloud-upload" color="#333" type="FontAwesome5" style={{ fontSize: 30, }} />
                            <Text note>No. of uploads</Text>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <View style={{ flexDirection: "row" }}>
                                <Icon name="star" style={{ fontSize: 25, color: '#FFCC01' }} />
                                <Icon name="star" style={{ fontSize: 25, color: '#FFCC01' }} />
                                <Icon name="star" style={{ fontSize: 25, color: '#FFCC01' }} />
                                <Icon name="star-half" style={{ fontSize: 25, color: '#FFCC01' }} />
                                <Icon name="star-o" style={{ fontSize: 25, color: '#FFCC01' }} />
                            </View>
                            <Text note>Rating</Text>
                        </View>
                    </View>
                </View>
                <Button block bordered warning style={{ margin: 7.5 }}
                    onPress={() => this.props.navigation.navigate('editProfileScreen')}>
                    <Text style={{ fontSize: 20, }} > EDIT  </Text>
                    <Icon name="edit" color="black" style={{ fontSize: 20, }} />
                </Button>

            </Container>
        );
    }
}
