import { useState } from "react";
import { Modal, View, Text, } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useSQLiteContext } from "expo-sqlite";
import { saveCard } from "../database/dbFunctions";
import styles from "./styles";

export default function AddCard({ onCardAdded, deck_id }) {
    //get database
    const db = useSQLiteContext();

    const [showModal, setShowModal] = useState(false);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleSaveCard = async () => {
        await saveCard(db, deck_id, question, answer);
        await onCardAdded(); // Updates the list of decks in HomeScreen
        setQuestion("");
        setAnswer("");
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
                    <View style={styles.deckModal}>
                        <Text style={styles.modalHeader}>Create a new Card</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Write a word.."
                            value={question}
                            onChangeText={setQuestion}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Write the definition or translation.."
                            value={answer}
                            onChangeText={setAnswer}
                        />

                        <View style={styles.buttonRow}>
                            <Button
                                mode="contained"
                                style={styles.saveButton}
                                onPress={handleSaveCard}
                            >
                                Save Card
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
