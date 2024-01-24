import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { StyleSheet, Image, Text } from 'react-native';
import { View } from 'react-native-animatable';
import { Button, CheckBox, Icon, Input } from 'react-native-elements';
//import { baseUrl } from '../shared/baseUrl';
import logo from '../assets/takenote-logo.png'

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggingError, setloggingError] = useState('');
    const [token, setToken] = useState('');
    const [remember, setRemember] = useState(false);

    const handleLogin = () => {

        const requestOptions = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, password: password })
        };

        const loggingIn = async () => {
            try {
                const response = await fetch(
                    'https://us-central1-takenoteapi-412103.cloudfunctions.net/takenote_api/user/login', requestOptions);
                const result = await response.json();

                if (remember) {
                    SecureStore.setItemAsync(
                        'userinfo',
                        JSON.stringify({
                            username,
                            password,
                            token: result.token
                        })
                    ).catch((error) => console.log('Could not save user info', error));
                } else {
                    SecureStore.deleteItemAsync('userinfo').catch((error) => console.log('Could not delete user info', error));
                    SecureStore.setItemAsync( //token remembered regardless
                        'userinfo',
                        JSON.stringify({
                            token: result.token
                        })
                    ).catch((error) => console.log('Could not save user info', error));
                }

                navigation.replace('Main');

            } catch (error) {
                //console.error(error);
                setloggingError('Invalid username or password!');
                
            }
        };

        loggingIn();
    };

    useEffect(() => {
        SecureStore.getItemAsync('userinfo').then((userdata) => {
            const userinfo = JSON.parse(userdata);
            if (userinfo) {
                setUsername(userinfo.username);
                setPassword(userinfo.password);
                setToken(userinfo.token);
                setRemember(true);
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={logo}
                    style={styles.image}
                />
            </View>
            <View style={styles.formContainer}>
                <Text style={{ color: 'red' }}>{loggingError}</Text>
                <Input
                    placeholder='Username'
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                />
                <Input
                    placeholder='Password'
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    containerStyle={styles.formInput}
                    leftIconContainerStyle={styles.formIcon}
                    secureTextEntry={true}
                />
                <CheckBox
                    title='Remember Me'
                    center
                    checked={remember}
                    onPress={() => setRemember(!remember)}
                    containerStyle={styles.formCheckbox}
                />
            </View>
            <View style={styles.formButton}>
                <Button
                    onPress={() => handleLogin()}
                    title='Login'
                    color='#5637DD'
                    icon={
                        <Icon
                            name='sign-in'
                            type='font-awesome'
                            color='#fff'
                            iconStyle={{ marginRight: 10 }}
                        />
                    }
                    buttonStyle={{ backgroundColor: '#2d054d' }}
                />
            </View>
            <View style={styles.formButton}>
                <Button
                    onPress={() => googleAuth()}
                    title='Google'
                    type='clear'
                    icon={
                        <Icon
                            name='user-plus'
                            type='font-awesome'
                            color='#b464dc'
                            iconStyle={{ marginRight: 10 }}
                        />
                    }
                    titleStyle={{ color: '#b464dc' }}
                />
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 10,
        marginTop: 100
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 8,
        height: 60
    },
    formCheckbox: {
        margin: 8
    },
    formButton: {
        margin: 20,
        marginRight: 40,
        marginLeft: 40
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 10,
        marginTop: 50
    },
    image: {
        width: 150,
        height: 150
    },
    formContainer: {
        justifyContent: 'center',
        margin: 10,
        marginTop: 100
    }
})

export default LoginScreen;