import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Modal, TextInput } from 'react-native';
import { Card, Icon, Input } from 'react-native-elements';

function NotesScreen() {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');

    const handleSubmit = () => {
        console.log(title);
        console.log(note);
        setShowModal(!showModal);
    };


    const resetForm = () => {
        setTitle('');
        setNote('');
    };

    return (
        <>
            <ScrollView style={{ flex: 1, backgroundColor: '#e5d6eb' }}>
                <View>
                    <Card containerStyle={{ padding: 0, borderRadius: 10 }}>
                        <View style={styles.blockquoteContainer}>
                            <Text style={styles.blockquoteText}>Note-taking not only focuses the mind but also enables a listener to review the material later.</Text>
                            <Text style={{ fontWeight: 'italic' }}>- g 2/09 pp. 26-29 - Awake!—2009</Text>
                        </View>
                    </Card>
                </View>
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
            </ScrollView>
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
        margin: 10,
    },
    blockquoteText: {
        fontStyle: 'italic',
        fontSize: 16,
        color: '#333',
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
});

export default NotesScreen;