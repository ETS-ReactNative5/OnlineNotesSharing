import React, { Component } from 'react';
import { Dimensions } from 'react-native'
import {
    StyleSheet,
    View,
    Text, FlatList,
    TextInput,
    Button, TouchableOpacity,
    Image,
    Picker
} from 'react-native';
import Header from '../../header'
import Icon from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/MaterialIcons';
export default class Signup extends Component {
    state = {
        role: '',
    };

    static navigationOptions = {
        headerTitle: <Header />,
        headerStyle: {
            backgroundColor: '#1e85c9',
        },
    };
    render() {
        const { checked } = this.state;
        // const { navigate } = this.props.navigation;

        return (
            <View style={styles.body}>
                <View style={styles.form}>
                    <View style={styles.picture}>
                        <View >
                            <Image style={styles.imgblock} source={require("../../images/user.png")} />
                        </View>
                        <IconM name="create" style={{ marginTop: 150 }} color='#888' size={35} />

                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputpart}
                            placeholder={'Full  Name'}
                            placeholderTextColor={'#888'}
                            underlineColorAndroid='transparent' />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputpart}
                            placeholder={'Username'}
                            placeholderTextColor={'#888'}
                            underlineColorAndroid='transparent' />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.inputpart}
                            placeholder={'Password'}
                            secureTextEntry={true}
                            placeholderTextColor={'#888'}
                            underlineColorAndroid='transparent' />
                    </View>
                    <Picker
                        selectedValue={this.state.role}
                        style={styles.inputContainer}
                        itemStyle={{ color: "blue", backgroundColor: "grey" }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ role: itemValue })}>
                        <Picker.Item label="Student" color="#888" value="Student" />
                        <Picker.Item label="Teacher" color="#888" value="Teacher" />
                    </Picker>
                    <TouchableOpacity style={styles.btnLogin}>
                        <Text style={{ fontSize: 20, color: '#fff' }}>Edit</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create(
    {
        body: {
            backgroundColor: 'rgb(227, 227, 227)',
            flex: 1
        },
        form: {
            flex: 90,
            alignItems: "center"
        },
        picture: {
            flexDirection: "row", justifyContent: "center",
            alignItems: "center", marginBottom: 50,
            marginTop: 50,
        },
        head: {
            backgroundColor: '#1e85c9', justifyContent: "center",
            flex: 10, alignItems: "center"
        },
        imgblock: {
            flexDirection: "row",
            backgroundColor: '#1e85c9',
            borderRadius: 100, width: 200, height: 200,
        },
        inputContainer: {
            width: (Dimensions.get('window').width - 60),
            borderBottomColor: "#000", borderBottomWidth: 1
            , marginBottom: 20, padding: 5, fontSize: 20
        },
        radioContainer: {
            backgroundColor: '#1e85c9', width: 300,
            flexDirection: "row", marginBottom: 40, padding: 5,
            fontSize: 20,
            justifyContent: "space-around",
            alignItems: "center", color: "#efefef"
        },
        btnLogin: {
            width: (Dimensions.get('window').width - 60),
            backgroundColor: '#1e85c9',
            marginBottom: 50, padding: 7,
            justifyContent: "center", alignItems: "center"
        }
    }
)