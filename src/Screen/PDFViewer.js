import React from 'react';
import { StyleSheet, Dimensions, } from 'react-native';
import MHeader from '../Component/hHeader';
import Pdf from 'react-native-pdf';
import { Button, Icon, Text, View } from 'native-base';

export default class PDFExample extends React.Component {
    constructor(prop) {
        super(prop);
        const { navigation } = this.props;
        const obj = navigation.getParam('obj', 'NO-ID');
        this.state = {
            mydata: obj,
            like: 11, flag: true, Screen: "Select PDF"
        };
    }
    static navigationOptions = {
        title: "Select PDF"
    }

    render() {
        var temp = this.state.mydata.uri;
        const source = {
            uri: temp
            // 'http://samples.leanpub.com/thereactnativebook-sample.pdf'
            , cache: true
        };
        //const source = require('./test.pdf');  // ios only
        //const source = {uri:'bundle-assets://test.pdf'};

        //const source = {uri:'file:///sdcard/test.pdf'};
        //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};

        return (
            <View style={styles.container} padder>

                <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link presse: ${uri}`)
                    }}
                    style={styles.pdf} />
                <Button block bordered info >
                    <Icon name="ios-cloud-upload" />
                    <Text>UPLOAD</Text>
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
})