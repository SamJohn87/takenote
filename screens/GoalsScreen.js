import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Modal, Button } from 'react-native';
import { Card, Icon, Input } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

function GoalsScreen() {
    const [showModal, setShowModal] = useState(false);
    const [goalTitle, setGoalTitle] = useState('');

    const handleSubmit = () => {
        console.log(goalTitle);
        setShowModal(!showModal);
    };


    const resetForm = () => {
        setGoalTitle('');
    };

    return (
        <>
            <ScrollView style={{ flex: 1, backgroundColor: '#e5d6eb' }}>
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
                        leftIcon={{ type: 'material-community', name: 'bullseye' }}
                        leftIconContainerStyle={{ paddingRight: 10 }}
                        onChangeText={(title) => setGoalTitle(title)}
                        value={goalTitle}
                    />
                    <View>
                        <Input
                            placeholder='To do...'
                            rightIcon={{ type: 'entypo', name: 'add-to-list' }}
                        />
                    </View>
                    <ScrollView>
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
    }
});

export default GoalsScreen;