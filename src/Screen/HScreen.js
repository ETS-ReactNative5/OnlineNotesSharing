import React from "react";
import { StyleSheet, ActivityIndicator, Text, Image, KeyboardAvoidingView } from "react-native";
import { Button, Content, Container, Icon, Footer, FooterTab } from "native-base";

import * as firebaseR from "firebase";

export default class Home extends React.Component {
    static navigationOptions = {
        title: "Home"
    };
    state = {
        email: ""
    }

    componentDidMount() {
        this.unsubscribeAuth = firebaseR.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    email: user.email
                })
            } else {
                this.props.navigation.replace("LogIn");
            }
        })
    }

    componentWillUnmount() {
        this.unsubscribeAuth()
    }

    userSignout() {
        firebaseR.auth().signOut();
    }

    render() {
        return (
            <Container>
                <Content >
                    <Text style={{ margin: 20, textAlign: "center" }} >You r loged in as {this.state.email} </Text>
                    <Button full rounded danger
                        onPress={() => this.userSignout()}
                        style={{ margin: 20, justifyContent: "center" }}>
                        <Text style={{ fontSize: 24, color: "white", justifyContent: "center" }}>Logout</Text>
                    </Button>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button vertical active info >
                            {/* <Icon active name="ios-eye" /> */}
                            <Icon active name="eye" color="#000" />
                            <Text>Apps</Text>
                        </Button>
                        <Button vertical info>
                            <Icon name="camera" />
                            <Text>Camera</Text>
                        </Button>
                        <Button vertical info >
                            <Icon name="navigate" />
                            <Text>Navigate</Text>
                        </Button>
                        <Button vertical info>
                            <Icon name="person" />
                            <Text>Contact</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#999",
        justifyContent: "center",
        padding: 10,

    }
})