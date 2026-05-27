import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { fetchCards } from "../database/dbFunctions";
import { View, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import styles from "./styles";

export default function FlashCardScreen({ route }) {
    const { deck } = route.params;
    const db = useSQLiteContext();

    const [gameCards, setGameCards] = useState([]);
    const [gameFinished, setGameFinished] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState({ correct: 0, incorrect: 0 });

    //fetching cards from db
    useEffect(() => {
        const load = async () => {
            const cards = await fetchCards(db, deck.id);
            setGameCards(cards);
        };
        load();
    }, []);

    //Sets showAnswer true
    const toggleCard = () => setShowAnswer(!showAnswer)

    //Moves to next card or finishes the game
    const nextCard = () => {
        if (currentIndex < gameCards.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setShowAnswer(false)
        } else {
            setGameFinished(true)
        }
    }

    //Marks answer correct and moves to next card
    const markCorrect = () => {
        setScore(prev => ({
            ...prev, correct: prev.correct + 1
        }));
        nextCard();
    }

    //Marks answer incorrect and moves to next card
    const markIncorrect = () => {
        setScore(prev => ({
            ...prev, incorrect: prev.incorrect + 1,
        }));
        nextCard();
    }

    const resetGame = () => {
        setGameFinished(false);
        setCurrentIndex(0);
        setShowAnswer(false);
        setScore({ correct: 0, incorrect: 0 })
    }

    return (
        <View style={styles.flashcardContainer}>

            <Text style={styles.modalHeader}>{deck.title}</Text>
            
            {!gameFinished ? (
                <>
                    <Text style={{ fontSize: 15 }}>
                        Press the card to turn it around!
                    </Text>
                    <TouchableOpacity onPress={toggleCard} style={styles.deck}>
                        <Text style={styles.cardTitle}>
                            {showAnswer
                                ? gameCards[currentIndex]?.answer
                                : gameCards[currentIndex]?.question
                            }
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.buttonRow}>
                        <Button mode="contained" onPress={markIncorrect} style={{ marginRight: 10 }}>
                            Wrong ❌
                        </Button>

                        <Button mode="contained" onPress={markCorrect}>
                            Right ✅
                        </Button>
                    </View>
                </>

            ) : (
                <View style={{ alignItems: 'center' }}>
                    <Text>Game over!</Text>
                    <Text>Correct: {score.correct}</Text>
                    <Text>incorrect:{score.incorrect}</Text>
                    <Button onPress={resetGame} mode="outlined" style={{ margin: 10 }}>Try again!</Button>
                </View>
            )}

        </View>
    );
}