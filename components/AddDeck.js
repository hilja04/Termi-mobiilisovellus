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
    const [titleError,setTitleError] = useState(false);

    const handleSaveDeck = async () => {

        if (title.trim().length === 0) { //checks that title not empty
            setTitleError(true)
            return;
        }

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
                        colors={['#e0e0e0', '#e0e0e0']}  
                        start={{ x: 1, y: 0.1 }}
                        end={{ x: 0, y: 0 }}
                        style={styles.deckModal}
                        >
                            
                        <View style={styles.modalHeaderBox}>
                            <Text style={styles.modalHeaderText}>Create a new deck</Text>

                            <IconButton
                                icon="window-close"
                                iconColor="white"
                                size={20}
                                style={styles.modalClose}
                                onPress={() => {
                                    setShowModal(false);
                                    setTitleError(false);
                                    setTitle("");
                                    setDescription("");
                                }}
                            />
                        </View>

                        <View style={{alignItems:"center", marginTop:"20"}}>
                            <TextInput
                                style={[styles.input, titleError && { borderColor: "red", borderWidth: 2 }]}
                                placeholder="Title"
                                value={title}
                                onChangeText={(text) => {
                                    setTitle(text);
                                    if (text.trim().length > 0) setTitleError(false);
                                }}
                                maxLength={35}
                        
                            />
                           
                            <TextInput
                                style={styles.input}
                                placeholder="Description"
                                value={description}
                                onChangeText={setDescription}
                                maxLength={120}
                            />
                            <Button
                                mode="contained"
                                style={styles.saveButton}
                                labelStyle={styles.buttonLabel}
                                onPress={handleSaveDeck}
                            >
                                Save deck
                            </Button>
                        </View>
                        </LinearGradient>
    
                    </View>
                
            </Modal>
        </>
    );
}
