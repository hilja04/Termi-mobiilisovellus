import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { Modal, View, Text, } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { updateDeck } from "../database/dbFunctions";
import styles from "./styles";

export default function EditDeck({ onDeckUpdated, selectedDeck }) {
    //get database
    const db = useSQLiteContext();

    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const openModal = () => {
        // filling edit inputs with existing values
        setTitle(selectedDeck.title);
        setDescription(selectedDeck.description);
        setShowModal(true);
    };

    const handleUpdateDeck = async () => {
        await updateDeck(db, selectedDeck.id, title, description)
        await onDeckUpdated(); // Updates the list of decks in HomeScreen
        setTitle("");
        setDescription("");
        setShowModal(false);
    }

    return (
        <>
            <Button
                mode="outlined"
                onPress={openModal}
                style={[styles.defaultButton, { top:20, right:20,position:"absolute"}]}
                labelStyle={styles.buttonLabel}
            >
                Edit
            </Button>

            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.deckModal}>
                        <Text style={styles.modalHeader}>Edit your deck</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Write new title..."
                            value={title}
                            onChangeText={setTitle}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Write new description..."
                            value={description}
                            onChangeText={setDescription}
                        />


                        <View style={styles.buttonRow}>
                            <Button
                                mode="contained"
                                style={styles.saveButton}
                                onPress={handleUpdateDeck}
                            >
                                Update Deck
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