import React from "react";
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, } from "react-native";
import { View, } from "native-base";
import * as firebaseR from "firebase";

export default class Loading extends React.Component {

    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    static navigationOptions = {
        header: null
    };

    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        console.log("from loading ",userToken)
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };

    // componentDidMount() {
    //     firebaseR.auth().onAuthStateChanged((user) => {
    //         if (user)
    //             this.props.navigation.navigate("Home");
    //         else
    //             this.props.navigation.navigate("LogIn");
    //     })
    // }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="blue" />
                <StatusBar barStyle="default" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eee",
        justifyContent: "center",
        padding: 10,

    }
})