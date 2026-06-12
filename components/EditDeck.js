import { useEffect, useState } from "react";
import { Modal, View, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useSQLiteContext } from "expo-sqlite";
import { updateDeck } from "../database/dbFunctions";
import styles from "./styles";

export default function EditDeck({ selectedDeck, onDeckUpdated }) {
    const db = useSQLiteContext();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (selectedDeck) {
            setTitle(selectedDeck.title);
            setDescription(selectedDeck.description);
        }
    }, [selectedDeck]);

    const handleUpdateDeck = async () => {
        await updateDeck(db, selectedDeck.id, title, description);
        onDeckUpdated();
    };

    return (
        <Modal visible={true} transparent animationType="fade">
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
                        <Button mode="contained" onPress={handleUpdateDeck}>
                            Update Deck
                        </Button>

                        <Button mode="contained" onPress={onDeckUpdated}>
                            Cancel
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
