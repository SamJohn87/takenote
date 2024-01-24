import * as SecureStore from 'expo-secure-store';
import { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Modal, Button, FlatList, TextInput } from 'react-native';
import { Card, Icon, Input } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

function GoalsScreen() {
    const [showModal, setShowModal] = useState(false);
    const [goalTitle, setGoalTitle] = useState('');
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
    const [goals, setGoals] = useState('');
    const inputRef = useRef(null);


    const handleSubmit = () => {
        console.log(goalTitle);
        console.log(tasks);

        SecureStore.getItemAsync('userinfo').then((userdata) => { //get user token from secure store
            const userinfo = JSON.parse(userdata);
            if (userinfo) {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Authorization': `Bearer ${userinfo.token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title: goalTitle, tasks: tasks })
                };

                //console.log('token', userToken);
                const addGoal = async () => {
                    try {
                        const response = await fetch('https://us-central1-takenoteapi-412103.cloudfunctions.net/takenote_api/goals', requestOptions);
                        if (!response.ok) {
                            // Handle non-successful response (HTTP status code other than 200)
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }

                        const result = await response.json();
                        console.log(result);
                        setShowModal(!showModal);
                    } catch (error) {
                        console.log(error.message);
                    }
                };

                addGoal();
            }
        });

        setShowModal(!showModal);
    };

    const resetForm = () => {
        setGoalTitle('');
        setTasks([]);
    };

    const addTask = () => {
        setTasks([...tasks, task]);
        setTask('');
        inputRef.current.clear();
    }

    const listGoals = ({ item: goal }) => {
        return (
            <Animatable.View
                animation='fadeInLeftBig'
                duration={1000}
            >
                <Card containerStyle={{ padding: 0, borderRadius: 10 }} style={styles.card}>
                    <View style={styles.content}>
                        <Text>{goal.tasks.map((task, index) => index === goal.tasks.length - 1 ? task.title : task.title + "\r\n")}</Text>
                    </View>
                </Card>
                <Text style={styles.title}>{goal.title} - {new Date(goal.createdAt).toLocaleDateString()}</Text>
            </Animatable.View>
        );
    };


    useEffect(() => {

        SecureStore.getItemAsync('userinfo').then((userdata) => {
            const userinfo = JSON.parse(userdata);
            if (userinfo) {
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Authorization': `Bearer ${userinfo.token}`,
                        'Content-Type': 'application/json',
                    }
                };

                //get user's goals with REST API
                const getGoals = async () => {
                    try {
                        const response = await fetch('https://us-central1-takenoteapi-412103.cloudfunctions.net/takenote_api/goals', requestOptions);
                        if (!response.ok) {
                            // Handle non-successful response (HTTP status code other than 200)
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }

                        const result = await response.json();
                        setGoals(result);
                    } catch (error) {
                        console.log(error.message);
                    }
                };

                getGoals();
            }
        })
    }, [showModal]);

    return (
        <>
            <View style={{ flex: 1, backgroundColor: '#e5d6eb' }}>
                <Animatable.View
                    animation='zoomInRight'
                    duration={1500}
                >
                    <Card containerStyle={{ padding: 0, borderRadius: 10 }}>
                        <View style={styles.blockquoteContainer}>
                            <Text style={styles.blockquoteText}>Setting goals aids progress and strengthens purpose.</Text>
                            <Text style={{ fontStyle: 'italic', fontSize: 10 }}>- g80 10/22 pp. 6-7 - Awake!—1980</Text>
                        </View>
                    </Card>
                </Animatable.View>
                <View style={{ marginTop: 10, flexDirection: 'row-reverse', marginLeft: 20 }}>

                    <Icon
                        name='text-search'
                        type='material-community'
                        iconStyle={styles.stackIcon}
                    // onPress={() => navigation.toggleDrawer()}
                    />
                    <Icon
                        name='pen-plus'
                        type='material-community'
                        iconStyle={styles.stackIcon}
                        onPress={() => setShowModal(true)}
                    />
                </View>
                <FlatList
                    data={goals}
                    renderItem={listGoals}
                    keyExtractor={(item) => item._id.toString()}
                />
            </View>
            <Modal
                animationType='slide'
                transparent={false}
                visible={showModal}
                onRequestClose={() => setShowModal(!showModal)}
            >
                <View style={styles.modal}>
                    <Input
                        placeholder='Title'
                        leftIcon={{ type: 'material-community', name: 'bullseye' }}
                        leftIconContainerStyle={{ paddingRight: 10 }}
                        onChangeText={(title) => setGoalTitle(title)}
                        value={goalTitle}
                    />
                    <View style={styles.addTask}>
                        <TextInput
                            style={styles.input}
                            ref={inputRef}
                            placeholder='To do...'
                            clearTextOnFocus={true}
                            onChangeText={(text) => setTask(text)}
                        />
                        <Button
                            title='Add Task'
                            color='#b464dc'
                            onPress={addTask}
                        />
                    </View>
                    <ScrollView style={{ height: 350 }}>
                        {tasks.map((task, index) => (
                            <Card key={index} containerStyle={{ padding: 0, borderRadius: 10 }} style={styles.listTasks}>
                                <Text style={{
                                    fontSize: 16,
                                    padding: 10
                                }}> {task}</Text>
                            </Card>
                        ))}
                    </ScrollView>
                    <View style={{ margin: 10, marginTop: 50 }}>
                        <Button
                            onPress={() => {
                                handleSubmit();
                                resetForm();
                            }}
                            color='#2d054d'
                            title='Submit'
                        />
                    </View>
                    <View style={{ margin: 10 }}>
                        <Button
                            onPress={() => {
                                setShowModal(!showModal);
                                resetForm();
                            }}
                            color='#808080'
                            title='Cancel'
                        />
                    </View>
                </View>
            </Modal >
        </>
    );
}

const styles = StyleSheet.create({
    stackIcon: {
        marginLeft: 25,
        fontSize: 40
    },
    blockquoteContainer: {
        borderLeftWidth: 4,
        borderLeftColor: '#333',
        paddingHorizontal: 10,
        paddingVertical: 8,
        margin: 10
    },
    blockquoteText: {
        fontStyle: 'italic',
        fontSize: 16,
        color: '#2d054d'
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    title: {
        fontSize: 14,
        marginBottom: 8,
        fontWeight: 'bold',
        marginLeft: 20
    },
    content: {
        fontSize: 16,
        padding: 10
    },
    addTask: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginTop: 16,
    },
    input: {
        flex: 3, // Take remaining space in the row
        borderWidth: 1,
        padding: 8,
        borderTopWidth: 0, // No border on the top
        borderRightWidth: 0, // No border on the right
        borderLeftWidth: 0,
    },
    listTasks: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginTop: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2
    }
});

export default GoalsScreen;