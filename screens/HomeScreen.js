import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Card } from 'react-native-elements';
import logo from '../assets/takenote-logo.png';
import notesImg from '../assets/diana-polekhina-1ixT36dfuSQ-unsplash.jpg';
import goalsImg from '../assets/alexa-williams-YwBX02K60A4-unsplash.jpg';

function HomeScreen({ navigation }) {
    const [username, setUsername] = useState('');

    useEffect(() => {
        SecureStore.getItemAsync('userinfo').then((userdata) => {
            const userinfo = JSON.parse(userdata);
            if (userinfo) {
                setUsername(userinfo.username);
            }
        })
    }, []);

    return (
        <ScrollView style={{ flex: 1,backgroundColor: '#e5d6eb' }}>
            <View style={{ alignItems: 'center' }}>
                <Image source={logo} style={{
                    height: 150,
                    width: 150,
                    margin: 20,
                }} />
                <Text style={{
                    paddingBottom: 10, color: '#2d054d'
                }}> Welcome to Takenote {username}</Text>
            </View>
            <View>
                <Pressable onPress={() => navigation.navigate('Notes')}>
                    <Card containerStyle={{
                        padding: 0, borderRadius: 10, shadowColor: 'black',
                        shadowOpacity: 0.26,
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 10,
                        elevation: 10
                    }}                    >
                        <Card.Image source={notesImg} style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                        <Text style={{ margin: 20, color: '#2d054d' }}>Notes</Text>
                    </Card>
                </Pressable>
            </View>
            <View style={{ marginBottom: 20}}>
                <Pressable onPress={() => navigation.navigate('Goals')}>
                    <Card containerStyle={{
                        padding: 0, borderRadius: 10, shadowColor: 'black',
                        shadowOpacity: 0.26,
                        shadowOffset: { width: 0, height: 2 },
                        shadowRadius: 10,
                        elevation: 10
                    }}>
                        <Card.Image source={goalsImg} style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                        <Text style={{ margin: 20, color: '#2d054d' }}>Goals</Text>
                    </Card>
                </Pressable>
            </View>
        </ScrollView>
    );
}

export default HomeScreen;