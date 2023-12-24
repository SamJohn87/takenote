import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import { Card } from 'react-native-elements';
import logo from '../assets/takenote-logo.png';
import notesImg from '../assets/diana-polekhina-1ixT36dfuSQ-unsplash.jpg';
import goalsImg from '../assets/alexa-williams-YwBX02K60A4-unsplash.jpg';

function HomeScreen({ navigation }) {
    return (
        <ScrollView style={{ backgroundColor: '#e5d6eb' }}>
            <View style={{ alignItems: 'center' }}>
                <Image source={logo} style={{
                    height: 150,
                    width: 150,
                    margin: 20,
                }} />
                <Text style={{ paddingBottom: 10 }}> Welcome to Takenote</Text>
            </View>
            <View>
                <Pressable onPress={() => navigation.navigate('Notes')}>
                    <Card containerStyle={{ padding: 0 }}                    >
                        <Card.Image source={notesImg} />
                        <Text style={{ margin: 20 }}>Notes</Text>
                    </Card>
                </Pressable>
            </View>
            <View>
                <Pressable onPress={() => navigation.navigate('Goals')}>
                    <Card containerStyle={{ padding: 0 }}>
                        <Card.Image source={goalsImg} />
                        <Text style={{ margin: 20 }}>Goals</Text>
                    </Card>
                </Pressable>
            </View>
        </ScrollView>
    );
}

export default HomeScreen;