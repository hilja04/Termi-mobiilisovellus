import { useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { Modal, View, Text, } from "react-native";
import { Button, IconButton, TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { saveCard } from "../database/dbFunctions";
import styles from "./styles";

export default function AddCard({ onCardAdded, deck_id }) {
    const db = useSQLiteContext(); // Access database
    const [showModal, setShowModal] = useState(false);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleSaveCard = async () => {
        await saveCard(db, deck_id, question, answer);
        await onCardAdded(); // Reloads the cards
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
                        colors={['#e0e0e0', '#e0e0e0']}
                        start={{ x: 1, y: 0.1 }}
                        end={{ x: 0, y: 0 }}
                        style={styles.deckModal}
                    >

                        <View style={styles.modalHeaderBox}>
                            <Text style={styles.modalHeaderText}>Add a new card</Text>

                            <IconButton
                                icon="window-close"
                                iconColor="white"
                                size={20}
                                style={styles.modalClose}
                                onPress={() => setShowModal(false)}
                            />
                        </View>
                        <View style={{ alignItems: "center", marginTop: "20" }}>
                            <TextInput
                                style={styles.input}
                                placeholder="Term"
                                value={question}
                                onChangeText={setQuestion}
                                maxLength={35}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Definition or Translation"
                                value={answer}
                                onChangeText={setAnswer}
                                maxLength={35}
                            />
                            <Button
                                mode="contained"
                                style={styles.saveButton}
                                onPress={handleSaveCard}
                            >
                                Save
                            </Button>
                        </View>
                    </LinearGradient>
                </View>

            </Modal>
        </>
    );
}
