import React, { Component } from 'react';
import { FlatList, Image, AsyncStorage } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import MHeader from "../Component/hHeader"
import * as firebaseR from "firebase";

export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            mydata: {}, Screen: "Home", received: false
        };
    }
    componentDidMount() {
        this.unsubscribeAuth = firebaseR.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    email: user.email
                })
            }
            else {
                this.props.navigation.navigate('Auth');
            }
        })
        fetch('https://alphachetan.000webhostapp.com/uploads.json')
            .then(res => res.json())
            .then(result => {
                this.setState({ mydata: result, received: true });
                // alert(this.state.mydata);
            }
            )
    }

    onClickItem(item) {
        console.log(item);
        this.props.navigation.navigate('AfterSelecting', { obj: item });
    }

    componentWillUnmount() {
        this.unsubscribeAuth()
    }

    render() {
        const getHeader = () => {
            return <Text style={{ textAlign: 'center', fontSize: 22 }}>RECENTLY ADDED</Text>;
        };

        const getFooter = () => {
            if (this.state.loading) {
                return null;
            }
            return <Text style={{ textAlign: 'center', fontSize: 22 }}>'Loading'</Text>;
        };
        return (
            <Container>
                <MHeader SName={this.state.Screen} />
                <Content>
                    <FlatList
                        data={this.state.received ? this.state.mydata : "Not Recived"}
                        ListHeaderComponent={getHeader}
                        ListFooterComponent={getFooter}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) =>
                            <Card >
                                <CardItem button
                                    onPress={() => this.onClickItem(item)} >
                                    <Left >
                                        <Thumbnail source={{ uri: 'https://icons-for-free.com/iconfiles/png/512/instagram+photos+round+icon+social+media+social+network+icon-1320190505735536578.png' }} />
                                        <Body>
                                            <Text>{item.file_name}</Text>
                                            <Text note>{item.file_uploaded_to}</Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem cardBody button onPress={() => this.onClickItem(item)} >
                                    <Image source={{ uri: 'https://cdn.pixabay.com/photo/2012/08/27/14/19/evening-55067_1280.png' }} style={{ height: 200, width: null, flex: 1 }} />
                                </CardItem>
                                <CardItem button onPress={() => this.onClickItem(item)}>
                                    <Left>
                                        <Button transparent>
                                            <Icon active name="thumbs-up" />
                                            <Text>12 Likes</Text>
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Button transparent>
                                            <Icon active name="chatbubbles" />
                                            <Text>4 Comments</Text>
                                        </Button>
                                    </Body>
                                    <Right>
                                        <Text>11h ago</Text>
                                    </Right>
                                </CardItem>
                            </Card>}
                    />
                </Content>
            </Container>
        );
    }
}