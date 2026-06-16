import { useEffect, useState } from "react";
import { Modal, View, Text } from "react-native";
import { Button, IconButton, TextInput } from "react-native-paper";
import { useSQLiteContext } from "expo-sqlite";
import { LinearGradient } from "expo-linear-gradient";
import { updateDeck } from "../database/dbFunctions";
import styles from "./styles";

export default function EditDeck({ selectedDeck, onDeckUpdated }) {
    const db = useSQLiteContext();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [titleError,setTitleError] = useState(false);


    useEffect(() => {
        if (selectedDeck) {
            setTitle(selectedDeck.title);
            setDescription(selectedDeck.description);
            setShowModal(true)
        }
    }, [selectedDeck]);

    const handleUpdateDeck = async () => {
        if (title.trim().length === 0) { //checks that title not empty
            setTitleError(true)
            return;
        }

        await updateDeck(db, selectedDeck.id, title, description);
        onDeckUpdated();
        setShowModal(false);
    };

    return (
        <>
        <Modal
            visible={showModal}
            transparent
            animationType="fade"
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
                        <Text style={styles.modalHeaderText}>Edit deck</Text>

                        <IconButton
                            icon="window-close"
                            iconColor="white"
                            size={20}
                            style={styles.modalClose}
                            onPress={() => {
                                setShowModal(false); 
                                onDeckUpdated();
                                setTitleError(false);
                            }}
                        />

                    </View>
                    <View style={{ alignItems: "center", marginTop: "20" }}>
                        <TextInput
                            style={[styles.input, titleError && { borderColor: "red", borderWidth: 2 }]}
                            placeholder="Write new title..."
                            value={title}
                            onChangeText={(text) => {
                                    setTitle(text);
                                    if (text.trim().length > 0) setTitleError(false);
                                }}
                            maxLength={35}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Write new description..."
                            value={description}
                            onChangeText={setDescription}
                            maxLength={120}
                        />

                        <Button mode="contained" onPress={handleUpdateDeck} style={styles.saveButton}>
                            Update Deck
                        </Button>
                    </View>
                </LinearGradient>
            </View >
        </Modal >
     </>
    );
}
