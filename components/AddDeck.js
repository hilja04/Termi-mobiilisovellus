import { useState } from "react";
import { Modal, View, Text, } from "react-native";
import { Button,IconButton, TextInput } from "react-native-paper";
import { useSQLiteContext } from "expo-sqlite";
import { LinearGradient } from 'expo-linear-gradient';
import { saveDeck } from "../database/dbFunctions";
import styles from "./styles";

export default function AddDeck({ onDeckAdded }) {
    const db = useSQLiteContext();
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSaveDeck = async () => {
        await saveDeck(db, title, description);
        await onDeckAdded();  // updates the list of decks in HomeScreen
        setTitle("");
        setDescription("");
        setShowModal(false);
    };

    return (
        <>
            <IconButton
                icon="plus-box"
                mode="outlined"
                iconColor="#424143"
                size={30}
                style={styles.addButton}
                onPress={() => setShowModal(true)}
               
            />

            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalBackground}>
                    <LinearGradient
                        colors={['#e0d6f4', '#5b565f']}  
                        start={{ x: 1, y: 0.1 }}
                        end={{ x: 0, y: 0 }}
                        style={styles.deckModal}
                        >

                        <IconButton
                                icon="window-close"
                                style={styles.cancelButton}
                                onPress={() => setShowModal(false)}
                            />

                        <Text style={styles.modalHeader}>Create a new deck</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Title"
                            value={title}
                            onChangeText={setTitle}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Description"
                            value={description}
                            onChangeText={setDescription}
                        />
                        <Button
                             mode="contained"
                             style={styles.saveButton}
                             labelStyle={styles.buttonLabel}
                             onPress={handleSaveDeck}
                        >
                            Save
                         </Button>

                        </LinearGradient>

                    </View>
                
            </Modal>
        </>
    );
}
