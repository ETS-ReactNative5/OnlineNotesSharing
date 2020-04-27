import React, { Component } from 'react';
import { StyleSheet, Text, KeyboardAvoidingView, Image, Alert, AsyncStorage } from 'react-native';
import { View, Item, Label, Input, Button, Icon, Picker } from "native-base";
import prompt from 'react-native-prompt-android';

import * as firebaseR from "firebase";

export default class Login extends Component {
  state = {
    passwordVisibility: true,
    email: "",
    pass: "", passwordIcon: "ios-eye",
    promptVisible: false
  };

  static navigationOptions = {
    title: "Please Log In"
  };
  userForgetPass(value) {
    // console.log("11");

    var auth = firebaseR.auth();
    var emailAddress = value;

    auth.sendPasswordResetEmail(emailAddress).then(function () {
      alert("// Email sent.");
    }).catch(error => {
      Alert.alert(error.message)
    });
  }

  userSignin(email, pass) {
    firebaseR.auth().signInWithEmailAndPassword(email, pass)
      .then(() => { this.props.navigation.navigate("AuthLoading") })
      .catch(error => {
        Alert.alert(error.message)
      })
    this._signInAsync();
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', this.state.email);
    // this.props.navigation.navigate('App');
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="position" style={styles.body} >

        <View style={{ alignItems: "center" }}>
          <Image source={require("../../images/logo.png")} style={styles.imgblock} />
        </View>

        <View style={styles.IFeild}>
          <Item floatingLabel
            style={{ borderBottomColor: "#d9534a" }}>
            <Label style={styles.ILabel} >User Email</Label>
            <Input
              keyboardType="email-address"
              value={this.state.email}
              onChangeText={(text) => this.setState({ email: text })} />
          </Item>
        </View>

        <View style={styles.IFeild}>
          <Item floatingLabel style={{ borderBottomColor: "#d9534a" }} disabled >
            <Label style={styles.ILabel} >User Password</Label>
            <Input
              value={this.state.pass}
              secureTextEntry={this.state.passwordVisibility}
              onChangeText={(text) => this.setState({ pass: text })} />
            <Icon active name={this.state.passwordIcon} color="red" onPress={() => {
              this.setState(prevState => ({
                passwordIcon: prevState.passwordIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
                passwordVisibility: !prevState.passwordVisibility
              }))
            }} />
          </Item>
        </View>

        <Button full rounded info style={styles.ButtonI} onPress={() => this.userSignin(this.state.email, this.state.pass)}>
          <Text style={{ fontSize: 24, color: "white" }}>Login</Text>
        </Button>

        <View style={styles.IFeild, { flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ fontSize: 16, }} >Don't having an account?</Text>
          <Text style={{ fontWeight: "bold", fontSize: 16 }} onPress={() => this.props.navigation.navigate('SignUp')}>Sign up</Text>
        </View>
        <Button style={styles.ButtonI} transparent onPress={() => prompt(
          'Forget Password',
          'Enter Email id',
          [
            { text: 'Cancel', onPress: () => alert('Cancel Pressed'), style: 'cancel' },
            { text: 'OK', onPress: (value) => this.userForgetPass(value) },
          ],
          {
            type: 'default',
            cancelable: false,
            defaultValue: '',
            placeholder: 'user email'
          }
        )}>
          <Text style={{ fontWeight: "bold", fontSize: 16,textAlign:"center" }} >Forget Password</Text>
        </Button>
      </KeyboardAvoidingView>
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
    },
    IFeild: {
      padding: 7.5,
      fontSize: 22,
      color: "red",
      width: 500
    },
    ILabel: {
      fontSize: 20,
      color: "grey"
    },
    ButtonI: {
      margin: 50,
      justifyContent: "center"
    },
    imgblock: {
      backgroundColor: '#1e85c9',
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 100,
      width: 200, height: 200,
      marginBottom: 50,
      marginTop: 50,
    }
  }
)