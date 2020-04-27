import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, H1, H3 } from 'native-base';

export default class Document extends Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const obj = navigation.getParam('obj', 'NO-ID');
        this.state = {
            mydata:obj,
            like: 11, flag: true
        };
    }

    static navigationOptions = {
        title: "Document"
    }

    render() {
        return (
            <Container>
                <Content padder>
                    <CardItem
                        button onPress={() => console.log("This is Card Header")} >
                        <Left>
                            <Thumbnail large source={{ uri: 'https://icons-for-free.com/iconfiles/png/512/instagram+photos+round+icon+social+media+social+network+icon-1320190505735536578.png' }} />
                            <Body>
                                <H1>{this.state.mydata.file_name}</H1>
                                <Text note>{this.state.mydata.file_uploaded_to}</Text>
                            </Body>
                        </Left>
                        <Right><Text note>{this.state.mydata.file_uploaded_on}</Text>
                        </Right>
                    </CardItem>
                    <Card>
                        <CardItem
                            button onPress={() => console.log("This is Card Header")} >
                            <Left>
                                <Thumbnail small source={{ uri: 'https://image.shutterstock.com/image-illustration/user-sign-flat-style-icon-260nw-384122167.jpg' }} />
                                <Body>
                                    <Text>{this.state.mydata.file_uploader}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                    </Card>
                    <CardItem button onPress={() => console.log("This is Card Header")}                        >
                        <Left>
                            <Button iconLeft transparent onPress={() => {
                                if (this.state.flag == true) {
                                    let temp = (this.state.like) + 1;
                                    this.setState({ like: temp, });
                                    this.state.flag = false;
                                } else {
                                    let temp = (this.state.like) - 1;
                                    this.setState({ like: temp, });
                                    this.state.flag = true;
                                }
                            }}>
                                <Icon active name="thumbs-up" />
                                <Text>{this.state.like} Likes</Text>
                            </Button>
                        </Left>
                        <Body>
                            <Button iconLeft transparent>
                                <Icon active name="chatbubbles" />
                                <Text>4 Comments</Text>
                            </Button>
                        </Body>
                        <Right>
                            <Button transparent >
                                <Icon name="share" />
                                <Text>Share</Text>
                            </Button>
                        </Right>
                    </CardItem>
                    <Card>
                        <CardItem button onPress={() => console.log("This is Card Header")} >
                            <Image source={{ uri: 'https://cdn.pixabay.com/photo/2012/08/27/14/19/evening-55067_1280.png' }} style={{ height: 300, width: null, flex: 1 }} />
                        </CardItem>
                        <Button block bordered info>
                            <Icon name="md-download" />
                            <Text>DOWNLOAD</Text>
                        </Button>
                    </Card>
                    <Card style={{ padding: 12 }}>
                        <H3 style={{ paddingBottom: 10 }}>Description</H3>
                        <Text>{this.state.mydata.file_description}</Text>
                    </Card>
                </Content>
            </Container>
        );
    }
}