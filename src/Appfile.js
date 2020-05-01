import React from 'react';
import { Icon, View, Text } from "native-base";
import {
    createAppContainer, createBottomTabNavigator,
    createStackNavigator, createSwitchNavigator,
} from 'react-navigation';
import SignUpScreen from "./Screen/Signup";
import LoginScreen from "./Screen/Login";
import AuthLoadingScreen from "./Screen/Loading";
import HScreen from "././Screen/HScreen";
import HomeScreen from "././Screen/Home";
import ProfileScreen from "././Screen/Profile";
import PostScreen from "././Screen/PostSccreen";
import editProfileScreen from "././Screen/EditProfie";
import AfterScreen from "././Screen/AfterSelection";
import PDFViewer from "././Screen/PDFViewer";
import Success from "././Screen/Success";

import firebaseR from "firebase";

import { firebaseConfig } from "./config";
import { decode, encode } from 'base-64'
global.crypto = require("@firebase/firestore");
global.crypto.getRandomValues = byteArray => { for (let i = 0; i < byteArray.length; i++) { byteArray[i] = Math.floor(256 * Math.random()); } }

if (!global.btoa) { global.btoa = encode; }

if (!global.atob) { global.atob = decode; }
firebaseR.initializeApp(firebaseConfig);

class NavigationScreen extends React.Component {
    static navigationOption = {
        title: "NavigationScreen"
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>NAv!</Text>
            </View>
        );
    }
}

const TabNavigator = createBottomTabNavigator(
    {
        Home: HomeScreen,
        Post: PostScreen,
        Navigation: NavigationScreen,
        Profile: ProfileScreen,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `md-home`;
                } else if (routeName === 'Post') {
                    iconName = `md-add-circle`;
                } else if (routeName === 'Navigation') {
                    iconName = `navigate`;
                } else if (routeName === 'Profile') {
                    iconName = `md-person`;
                }

                // You can return any component that you like here!
                return <Icon name={iconName} size={25} style={{ color: "#fff" }} />;
            },
        }),
        tabBarOptions: {
            inactiveBackgroundColor: "#999",
            activeBackgroundColor: "#555",
            activeTintColor: '#bbb',
            inactiveTintColor: '#fff',
        },
    }
);

const AppStack = createStackNavigator({
    Home: {
        screen: TabNavigator,
        navigationOptions: {
            header: null
        },
    },
    AfterSelecting: AfterScreen,
    HScreen,
    editProfileScreen,
    PDFViewer,
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#d9534f',
            height: 80
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 22
        },
    }
})
const AuthStack = createStackNavigator(
    {
        LogIn: LoginScreen,
        SignUp: SignUpScreen,
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#d9534f',
                height: 80
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 22
            },
        }
    }
)

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
        Success
    },
    {
        initialRouteName: 'AuthLoading',
    }
));


