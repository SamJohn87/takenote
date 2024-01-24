import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Modal, TextInput, FlatList } from 'react-native';
import { Card, Icon, Input } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

function NotesScreen() {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = () => {
        // console.log(title);
        // console.log(note);
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
                    body: JSON.stringify({ title: title, content: note })
                };

                //console.log('token', userToken);
                const addNote = async () => {
                    try {
                        const response = await fetch('https://us-central1-takenoteapi-412103.cloudfunctions.net/takenote_api/notes', requestOptions);
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

                addNote();
            }
        });
    };

    const resetForm = () => {
        setTitle('');
        setNote('');
    };

    const listNotes = ({ item: note }) => {
        return (
            <Animatable.View
                animation='fadeInRightBig'
                duration={1000}
            >
                <Card containerStyle={{ padding: 0, borderRadius: 10 }} style={styles.card}>
                    <View style={styles.content}>
                        <Text>{note.content}</Text>
                    </View>
                </Card>
                <Text style={styles.title}>{note.title} - {new Date(note.createdAt).toLocaleDateString()}</Text>
            </Animatable.View>
        );
    };

    useEffect(() => {

        SecureStore.getItemAsync('userinfo').then((userdata) => {
            const userinfo = JSON.parse(userdata);
            if (userinfo) {
                console.log(userinfo.token);
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Authorization': `Bearer ${userinfo.token}`,
                        'Content-Type': 'application/json',
                    }
                };

                //get user's notes with REST API
                const getNotes = async () => {
                    try {
                        const response = await fetch('https://us-central1-takenoteapi-412103.cloudfunctions.net/takenote_api/notes', requestOptions);
                        if (!response.ok) {
                            // Handle non-successful response (HTTP status code other than 200)
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }

                        const result = await response.json();
                        setNotes(result);
                    } catch (error) {
                        console.log(error.message);
                    }
                };

                getNotes();
            }
        })
    }, [showModal]);

    return (
        <>
            <View style={{ flex: 1, backgroundColor: '#e5d6eb' }}>
                <Animatable.View
                    animation='zoomInDown'
                    duration={1500}
                >
                    <Card containerStyle={{ padding: 0, borderRadius: 10 }}>
                        <View style={styles.blockquoteContainer}>
                            <Text style={styles.blockquoteText}>Note-taking not only focuses the mind but also enables a listener to review the material later.</Text>
                            <Text style={{ fontSize: 10 }}>- g 2/09 pp. 26-29 - Awake!—2009</Text>
                        </View>
                    </Card>
                </Animatable.View>
                <View style={{ marginTop: 10, flexDirection: 'row-reverse', marginLeft: 20 }}>
                    <Icon
                        name='note-search'
                        type='material-community'
                        iconStyle={styles.stackIcon}
                    // onPress={() => navigation.toggleDrawer()}
                    />
                    <Icon
                        name='note-plus'
                        type='material-community'
                        iconStyle={styles.stackIcon}
                        onPress={() => setShowModal(true)}
                    />
                </View>
                <FlatList
                    data={notes}
                    renderItem={listNotes}
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
                        leftIcon={{ type: 'material-community', name: 'format-title' }}
                        leftIconContainerStyle={{ paddingRight: 10 }}
                        onChangeText={(title) => setTitle(title)}
                        value={title}
                    />
                    <ScrollView>
                        <TextInput
                            placeholder='Enter your note here...'
                            multiline={true}
                            numberOfLines={25}
                            onChangeText={(note) => setNote(note)}
                            value={note}
                            style={{ textAlignVertical: 'top', padding: 10, backgroundColor: '#fbf2ff', borderRadius: 10 }}
                        />
                    </ScrollView>
                    <View style={{ margin: 10 }}>
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
            </Modal>
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
    }
});

export default NotesScreen;