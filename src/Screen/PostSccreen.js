import React, { Component } from 'react';
import { View } from 'react-native';
import { Container,Text, Button, Icon} from 'native-base';
import MHeader from "../Component/hHeader";
import DocumentPicker from "react-native-document-picker";

export default class Home extends Component {

    constructor() {
        super();
        this.state = {
            Screen: "Upload"
        };
    }

    async selectOneFile() {
        //Opening Document Picker for selection of one file
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });
            //Printing the log realted to the file
            console.log('res : ' + JSON.stringify(res));
            console.log('URI : ' + res.uri);
            console.log('Type : ' + res.type);
            console.log('File Name : ' + res.name);
            console.log('File Size : ' + res.size);
            //Setting the state to show single file attributes
            // this.setState({ singleFile: res });
            this.props.navigation.navigate('PDFViewer', { obj: res });
        } catch (err) {
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
                alert('Canceled from single doc picker');
            } else {
                //For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    }

    render() {

        return (
            <Container >
                <MHeader SName={this.state.Screen} />
                <View style={{ alignItems: "center", marginTop: 100 }}>
                    <Text uppercase style={{ fontSize: 24, marginBottom: 20 }}>Upload Notes</Text>
                    <View padder >
                        <Button style={{ fontSize: 24, margin: 20 }}>
                            <Text style={{ fontSize: 24, }}>Create PDF</Text>
                            <Icon name="camera" style={{ fontSize: 24 }} />
                        </Button>
                        <Button style={{ fontSize: 24, margin: 20 }}
                            onPress={this.selectOneFile.bind(this)}>
                            <Text style={{ fontSize: 24, }}>Select PDF</Text>
                            <Icon name="md-document" style={{ fontSize: 24 }} />
                        </Button>
                    </View>
                </View>
            </Container>
        );
    }
}