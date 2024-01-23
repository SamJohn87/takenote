import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Image } from 'react-native';
import { View } from 'react-native-animatable';
import { Button, CheckBox, Icon, Input } from 'react-native-elements';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes
  } from '@react-native-google-signin/google-signin';
//import { baseUrl } from '../shared/baseUrl';
import logo from '../assets/takenote-logo.png'

GoogleSignin.configure({
    //scopes: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email' ], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '559715427001-tlf88666928lu0kkcmnredlgsmri8uf4.apps.googleusercontent.com' // client ID of type WEB for your server (needed to verify user ID and offline access)
    //offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    //hostedDomain: '', // specifies a hosted domain restriction
    //loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
    //forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    //accountName: '', // [Android] specifies an account name on the device that should be used
    //iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  });


// const LoginTab = ({ navigation }) => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [remember, setRemember] = useState(false);

//     const handleLogin = () => {
//         console.log('username', username);
//         console.log('password', password);
//         console.log('remember', remember);

//         if (remember) {
//             SecureStore.setItemAsync(
//                 'userinfo',
//                 JSON.stringify({
//                     username,
//                     password
//                 })
//             ).catch((error) => console.log('Could not save user info', error));
//         } else {
//             SecureStore.deleteItemAsync('userinfo').catch((error) => console.log('Could not delete user info', error));
//         }
//     };

//     useEffect(() => {
//         SecureStore.getItemAsync('userinfo').then((userdata) => {
//             const userinfo = JSON.parse(userdata);
//             if (userinfo) {
//                 setUsername(userinfo.username);
//                 setPassword(userinfo.password);
//                 setRemember(true);
//             }
//         })
//     }, []);

//     return (
//         <View style={styles.container}>
//             <Input
//                 placeholder='Username'
//                 leftIcon={{ type: 'font-awesome', name: 'user-o' }}
//                 onChangeText={(text) => setUsername(text)}
//                 value={username}
//                 containerStyle={styles.formInput}
//                 leftIconContainerStyle={styles.formIcon}
//             />
//             <Input
//                 placeholder='Password'
//                 leftIcon={{ type: 'font-awesome', name: 'key' }}
//                 onChangeText={(text) => setPassword(text)}
//                 value={password}
//                 containerStyle={styles.formInput}
//                 leftIconContainerStyle={styles.formIcon}
//             />
//             <CheckBox
//                 title='Remember Me'
//                 center
//                 checked={remember}
//                 onPress={() => setRemember(!remember)}
//                 containerStyle={styles.formCheckbox}
//             />
//             <View style={styles.formButton}>
//                 <Button
//                     onPress={() => handleLogin()}
//                     title='Login'
//                     color='#5637DD'
//                     icon={
//                         <Icon
//                             name='sign-in'
//                             type='font-awesome'
//                             color='#fff'
//                             iconStyle={{ marginRight: 10 }}
//                         />
//                     }
//                     buttonStyle={{ backgroundColor: '#5637DD' }}
//                 />
//             </View>
//             <View style={styles.formButton}>
//                 <Button
//                     onPress={() => navigation.navigate('Register')}
//                     title='Register'
//                     type='clear'
//                     icon={
//                         <Icon
//                             name='user-plus'
//                             type='font-awesome'
//                             color='blue'
//                             iconStyle={{ marginRight: 10 }}
//                         />
//                     }
//                     titleStyle={{ color: 'blue' }}
//                 />
//             </View>
//         </View>
//     );
// };

// const RegisterTab = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [remember, setRemember] = useState(false);
//     const [imageUrl, setImageUrl] = useState(`${baseUrl}images/logo.png`);

//     const handleRegister = () => {
//         const userInfo = {
//             username,
//             password,
//             firstName,
//             lastName,
//             email,
//             remember
//         }
//         console.log(JSON.stringify(userInfo));

//         if (remember) {
//             SecureStore.setItemAsync(
//                 'userinfo',
//                 JSON.stringify({
//                     username,
//                     password
//                 })
//             ).catch((error) => console.log('Could not save user info', error));
//         } else {
//             SecureStore.deleteItemAsync('userinfo').catch((error) => console.log('Could not delete user info', error));
//         }
//     };

//     const getImageFromCamera = async () => {
//         const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

//         if (cameraPermission.status === 'granted') {
//             const capturedImage = await ImagePicker.launchCameraAsync({
//                 allowsEditing: true,
//                 aspect: [1, 1]
//             });

//             if(capturedImage.assets) {
//                 console.log(capturedImage.assets[0]);
//                 setImageUrl(capturedImage.assets[0].uri);
//             }
//         }
//     };
// ``
//     return (
//         <ScrollView>
//             <View style={styles.container}>
//                 <View style={styles.imageContainer}>
//                     <Image
//                         source={{ uri: imageUrl }}
//                         loadingIndicatorSource={logo}
//                         style={styles.image}
//                     />
//                     <Button title='Camera' onPress={getImageFromCamera} />
//                 </View>
//                 <Input
//                     placeholder='Username'
//                     leftIcon={{ type: 'font-awesome', name: 'user-o' }}
//                     onChangeText={(text) => setUsername(text)}
//                     value={username}
//                     containerStyle={styles.formInput}
//                     leftIconContainerStyle={styles.formIcon}
//                 />
//                 <Input
//                     placeholder='Password'
//                     leftIcon={{ type: 'font-awesome', name: 'key' }}
//                     onChangeText={(text) => setPassword(text)}
//                     value={password}
//                     containerStyle={styles.formInput}
//                     leftIconContainerStyle={styles.formIcon}
//                 />
//                 <Input
//                     placeholder='First Name'
//                     leftIcon={{ type: 'font-awesome', name: 'user-o' }}
//                     onChangeText={(text) => setFirstName(text)}
//                     value={firstName}
//                     containerStyle={styles.formInput}
//                     leftIconContainerStyle={styles.formIcon}
//                 />
//                 <Input
//                     placeholder='Last Name'
//                     leftIcon={{ type: 'font-awesome', name: 'user-o' }}
//                     onChangeText={(text) => setLastName(text)}
//                     value={lastName}
//                     containerStyle={styles.formInput}
//                     leftIconContainerStyle={styles.formIcon}
//                 />
//                 <Input
//                     placeholder='Email'
//                     leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
//                     onChangeText={(text) => setEmail(text)}
//                     value={email}
//                     containerStyle={styles.formInput}
//                     leftIconContainerStyle={styles.formIcon}
//                 />
//                 <CheckBox
//                     title='Remember Me'
//                     center
//                     checked={remember}
//                     onPress={() => setRemember(!remember)}
//                     containerStyle={styles.formCheckbox}
//                 />
//                 <View style={styles.formButton}>
//                     <Button
//                         onPress={() => handleRegister()}
//                         title='Register'
//                         color='#5637DD'
//                         icon={
//                             <Icon
//                                 name='user-plus'
//                                 type='font-awesome'
//                                 color='#fff'
//                                 iconStyle={{ marginRight: 10 }}
//                             />
//                         }
//                         buttonStyle={{ backgroundColor: '#5637DD' }}
//                     />
//                 </View>
//             </View>
//         </ScrollView>
//     );
// };

//const Tab = createBottomTabNavigator();

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const handleLogin = () => {
        console.log('username', username);
        console.log('password', password);
        console.log('remember', remember);

        if (remember) {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({
                    username,
                    password
                })
            ).catch((error) => console.log('Could not save user info', error));
        } else {
            SecureStore.deleteItemAsync('userinfo').catch((error) => console.log('Could not delete user info', error));
        }
    };

    // const googleAuth = () => {
    //     console.log('google auth');
    //     async () => {
    //         const response = await fetch('http://localhost:8080/user/auth/google');
    //         if (!response.ok) {
    //             return Promise.reject(
    //                 'Unable to fetch, status: ' + response.status
    //             );
    //         }
    //         const data = await response.json();
    //         return data;
    //     }
    // };

    const googleAuth = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          this.setState({ userInfo });
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
      };

    useEffect(() => {
        SecureStore.getItemAsync('userinfo').then((userdata) => {
            const userinfo = JSON.parse(userdata);
            if (userinfo) {
                setUsername(userinfo.username);
                setPassword(userinfo.password);
                setRemember(true);
            }
        })
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
        marginTop: 150
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
    formContainer:{
        justifyContent: 'center',
        margin: 10,
        marginTop: 100
    }
})

export default LoginScreen;