import React from 'react';
import { View, Text , StyleSheet } from 'react-native';
import { Image} from 'native-base';

export default class Success extends React.Component {
    performTimeConsumingTask = async () => {
        return new Promise((resolve) => setTimeout(() => { resolve('result'); }, 700));
    }

    async componentDidMount() {
        // Preload data from an external API
        // Preload data using AsyncStorage
        const data = await this.performTimeConsumingTask();

        if (data !== null) {
            this.props.navigation.navigate('App');
        }
    }
    render() {
        return (
            <View style={styles.container}>
               <Image source={require('../../images/logo.png')}/>
            </View>
        );
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