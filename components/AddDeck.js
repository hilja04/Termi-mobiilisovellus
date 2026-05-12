import { useState } from "react";
import { Modal, View, Text, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { useSQLiteContext } from "expo-sqlite";
import { saveDeck } from "../database/dbFunctions";
import styles from "./styles";

export default function AddDeck({ onDeckAdded }) {
    const db = useSQLiteContext();

    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSaveDeck = async () => {
        await saveDeck(db, title, description);
        await onDeckAdded(); // Updates the lists in HomeScreen
        setTitle("");
        setDescription("");
        setShowModal(false);
    };

    return (
        <>
            <Button
                mode="outlined"
                onPress={() => setShowModal(true)}
                style={styles.addButton}
                labelStyle={styles.buttonLabel}
            >
                Add
            </Button>

            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.addDeckModal}>
                        <Text>Create a new deck</Text>

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

                        <View style={styles.buttonRow}>
                            <Button
                                mode="contained"
                                style={styles.saveButton}
                                onPress={handleSaveDeck}
                            >
                                Save Deck
                            </Button>

                            <Button
                                mode="contained"
                                style={styles.cancelButton}
                                onPress={() => setShowModal(false)}
                            >
                                Cancel
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}
