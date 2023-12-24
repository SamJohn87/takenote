import { Platform, View, Text, StyleSheet, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
// import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import Constants from 'expo-constants';
import logo from '../assets/takenote-logo.png';
import HomeScreen from './HomeScreen';
import GoalsScreen from './GoalsScreen';
import NotesScreen from './NotesScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeNavigator = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='Home'
                component={HomeScreen}
            />
        </Stack.Navigator>

    );
};

const NotesNavigator = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='notes'
                component={NotesScreen}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <Icon
                            name='notes'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
                })}
            />
        </Stack.Navigator>
    );
};

const GoalsNavigator = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='Goals'
                component={GoalsScreen}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <Icon
                            name='Goals'
                            type='font-awesome'
                            iconStyle={styles.stackIcon}
                            onPress={() => navigation.toggleDrawer()}
                        />
                    )
                })}
            />
        </Stack.Navigator>
    );
};

const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props}>
        <View style={styles.drawerHeader}>
            <View style={{ flex: 1 }}>
                <Image source={logo} style={styles.drawerImage} />
            </View>
            <View style={{ flex: 2 }}>
                <Text style={styles.drawerHeaderText}>Takenote</Text>
            </View>
        </View>
        <DrawerItemList {...props} labelStyle={{ fontWeight: 'bold' }} />
    </DrawerContentScrollView>
);


function MainComponent() {
    return (
        <View style={{
            flex: 1,
            paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
        }}>
            <Drawer.Navigator
                initialRouteName='Home'
                drawerContent={CustomDrawerContent}         
            >
                <Drawer.Screen
                    name='Home'
                    component={HomeNavigator}
                    options={{
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='home'
                                type='font-awesome'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            ></Icon>
                        )
                    }}
                />
                <Drawer.Screen
                    name='Notes'
                    component={NotesNavigator}
                    options={{
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='note-multiple'
                                type='material-community'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            ></Icon>
                        )
                    }}
                />
                <Drawer.Screen
                    name='Goals'
                    component={GoalsNavigator}
                    options={{
                        drawerIcon: ({ color }) => (
                            <Icon
                                name='bullseye-arrow'
                                type='material-community'
                                size={24}
                                iconStyle={{ width: 24 }}
                                color={color}
                            ></Icon>
                        )
                    }}
                />
            </Drawer.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    stackIcon: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 24
    },
    drawerHeader: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#2d054d',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        height: 60,
        width: 60
    }
});

export default MainComponent;