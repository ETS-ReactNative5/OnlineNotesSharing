import React, { Component } from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, Image, Alert, AsyncStorage } from 'react-native';
import { View, Item, Label, Input, Button, Icon, Picker } from "native-base";

import * as firebaseR from "firebase";
import 'firebase/firestore';

export default class Signup extends Component {
    state = {
        passwordVisibility: true,
        userToken: {
            urole: '', uemail: '', uname: '',
        },
        role: 'Student',
        email: "",
        pass: "",
        name: "",
        idtoken: 'nulll'

    };

    static navigationOptions = {
        title: "SignUp",

    };

    userSignUp(email, pass) {

        firebaseR.auth().createUserWithEmailAndPassword(email, pass)
            .then(() => {
                console.log("auth is starting")
                this.props.navigation.navigate("AuthLoading");

            })
            .catch(error => {
                Alert.alert(error.message);
            })

        // var temp = this.state.userToken;
        // console.log("11" + temp.uemail);
        // console.log("11" + temp.uid);
        // console.log("11" + temp.uname);
        // console.log("11" + temp.urole);
        this._signInAsync();
    }

    savingOtherdetail() {
        let idtoken1
        var temp = firebaseR.firestore().collection("usersData")
            .add(this.state.userToken)
            .then(function (docRef) {
                idtoken1 = docRef.id;
                console.log("1Document written with ID: ", idtoken1);
                // console.log("2Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.log("from svingOtherdetail Error adding document: ", error);
            });
        console.log("saving is over ", idtoken1);
        // this.state.idtoken=idtoken1;
        // this.userSignUp(this.state.email, this.state.pass);

    }

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', this.state.userToken.email);
        this.savingOtherdetail();
    };



    render() {

        return (
            <KeyboardAvoidingView style={styles.body} behavior="position" >
                <View style={{ alignItems: "center" }}>
                    <Image source={require("../../images/logo.png")} style={styles.imgblock} />
                </View>
                <View style={styles.IFeild}>
                    <Item floatingLabel
                        style={{ borderBottomColor: "#d9534a" }}>
                        <Label style={styles.ILabel} >UserName</Label>
                        <Input
                            value={this.state.name}
                            onChangeText={(text) => this.setState({
                                name: text, userToken: {
                                    urole: this.state.role, uemail: this.state.email, uname: this.state.name
                                }
                            })}
                        />
                    </Item>
                </View>
                <View style={styles.IFeild}>
                    <Item floatingLabel
                        style={{ borderBottomColor: "#d9534a" }}>
                        <Label style={styles.ILabel} >User Email</Label>
                        <Input
                            value={this.state.email}
                            onChangeText={(text) => this.setState({
                                email: text, userToken: {
                                    urole: this.state.role, uemail: this.state.email, uname: this.state.name
                                }
                            })}
                        />
                    </Item>
                </View>
                <View style={styles.IFeild}>
                    <Item floatingLabel style={{ borderBottomColor: "#d9534a" }}>
                        <Label style={styles.ILabel} >User Password</Label>
                        <Input
                            name="password"
                            secureTextEntry={this.state.passwordVisibility}
                            value={this.state.pass}
                            onChangeText={(text) => this.setState({
                                pass: text, userToken: {
                                    urole: this.state.role, uemail: this.state.email, uname: this.state.name
                                }
                            })}
                        />
                        <Icon active name="eye" color="#000" onPress={() => {
                            this.setState(prevState => ({
                                passwordIcon: prevState.passwordIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
                                passwordVisibility: !prevState.passwordVisibility
                            }))
                        }} />
                    </Item>
                </View>
                <View style={styles.IFeild}>
                    <Item picker
                        style={{ borderBottomColor: "#d9534a" }}
                    >
                        <Picker
                            mode="dropdown"
                            style={styles.ILabel}
                            selectedValue={this.state.role}
                            onValueChange={(value) => {
                                this.setState({
                                    role: value, userToken: {
                                        urole: value, uemail: this.state.email, uname: this.state.name
                                    }
                                })
                                console.log(value);
                            }
                            }
                        >
                            <Picker.Item label="Student" value="Student" />
                            <Picker.Item label="Teacher" value="Teacher" />
                        </Picker>
                    </Item>
                </View>

                <Button full rounded danger style={styles.ButtonI} onPress={() => this.userSignUp(this.state.email, this.state.pass)}>
                    <Text style={{ fontSize: 24, color: "white" }}>SignUp</Text>
                </Button>

                <View style={styles.IFeild, { flexDirection: "row", justifyContent: "center" }}>
                    <Text style={{ fontSize: 16, }} >Already having an account?</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 16 }} onPress={() => this.props.navigation.navigate('LogIn')}>Sign in</Text>
                </View>
            </KeyboardAvoidingView >
        );
    }
}
const styles = StyleSheet.create(
    {
        body: {
            flex: 1,
            backgroundColor: "#fff",
            justifyContent: "flex-start",
            padding: 10, alignItems: "center"
        }, IFeild: {
            padding: 7.5, fontSize: 22, color: "red", width: 500
        }, ILabel: {
            fontSize: 20, color: "grey"
        }, ButtonI: {
            margin: 20, justifyContent: "center"
        },

        form: {
            // justifyContent: "center",
            flex: 90,
            alignItems: "center"
        },
        head: {
            backgroundColor: '#1e85c9', justifyContent: "center",
            flex: 10, alignItems: "center"
        },
        imgblock: {
            backgroundColor: '#1e85c9',
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100, width: 200, height: 200,
            marginBottom: 50,
            marginTop: 50,
        },
        inputContainer: {
            backgroundColor: '#1e85c9', width: 300
            , marginBottom: 20, padding: 5, fontSize: 20
        },
        inputContainer2: {
            backgroundColor: '#1e85c9', width: 300
            , marginBottom: 20, padding: 5, fontSize: 20,
            flexDirection: "row", alignItems: "center", justifyContent: "space-between"
        },
        radioContainer: {
            backgroundColor: '#1e85c9', width: 300, color: "#777",
            flexDirection: "row", marginBottom: 40, padding: 5, fontSize: 20,
            justifyContent: "space-around",
            alignItems: "center",
        },
        btnLogin: {
            backgroundColor: '#1e85c9',
            width: 150, height: 40,
            marginBottom: 50, padding: 7,
            justifyContent: "center", alignItems: "center"
        }
    }
)