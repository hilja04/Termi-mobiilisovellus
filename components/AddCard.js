import { useState } from "react";
import { Modal, View, Text, } from "react-native";
import { Button, IconButton, TextInput } from "react-native-paper";
import { useSQLiteContext } from "expo-sqlite";
import { LinearGradient } from "expo-linear-gradient";
import { saveCard } from "../database/dbFunctions";
import styles from "./styles";

export default function AddCard({ onCardAdded, deck_id }) {
    const db = useSQLiteContext(); //Access database
    const [showModal, setShowModal] = useState(false);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleSaveCard = async () => {
        await saveCard(db, deck_id, question, answer);
        await onCardAdded();
        setQuestion("");
        setAnswer("");
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

                        <Text style={styles.modalHeader}>Create a new Card</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Term"
                            value={question}
                            onChangeText={setQuestion}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Definition or Translation"
                            value={answer}
                            onChangeText={setAnswer}
                        />
                        <Button
                            mode="contained"
                            style={styles.saveButton}
                            labelStyle={styles.buttonLabel}
                            onPress={handleSaveCard}
                        >
                            Save
                        </Button>
                    </LinearGradient>
                </View>

            </Modal>
        </>
    );
}
