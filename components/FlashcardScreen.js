import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { fetchCards, saveTestResult } from "../database/dbFunctions";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button, IconButton } from "react-native-paper";
import styles from "./styles";

export default function FlashCardScreen({ route }) {
    const { deck } = route.params;
    const db = useSQLiteContext();
    const [cards, setCards] = useState([]);
    const [finished, setFinished] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState({ correct: 0, incorrect: 0 });

    useEffect(() => {
        const load = async () => {
            const fetched = await fetchCards(db, deck.id);
            setCards(fetched);
        };
        load();
    }, []);

    const toggleCard = () => setShowAnswer(!showAnswer);

    //Saves test results after game is finished
    const finishGame = async (finalScore) => {
        setFinished(true);
        await saveTestResult(db, deck.id, finalScore, cards.length, "Flashcard");
    };

    const nextCard = () => {
        setCurrentIndex((i) => i + 1);
        setShowAnswer(false);
    };

    const markCorrect = async () => {
        const newScore = score.correct + 1;

        setScore(prev => ({ ...prev, correct: newScore }));
        //If last card, await finishGame
        if (currentIndex === cards.length - 1) {
            await finishGame(newScore);
        } else {
            nextCard();
        }
    };

    const markIncorrect = async () => {
        const newScore = score.correct;

        setScore(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));

        //If last card, await finishGame
        if (currentIndex === cards.length - 1) {
            await finishGame(newScore);
        } else {
            nextCard();
        }
    };

    const resetGame = () => {
        setFinished(false);
        setCurrentIndex(0);
        setShowAnswer(false);
        setScore({ correct: 0, incorrect: 0 });
    };

    return (
        <View style={styles.flashcardContainer}>
            <Text style={styles.headerStyle}>{deck.title}</Text>

            {!finished ? (
                <>
                    <Text style={{ fontSize: 15, alignSelf: "center" }}>
                        Press the card to turn it around!
                    </Text>

                    <TouchableOpacity onPress={toggleCard}>
                        <LinearGradient
                            colors={['#f3e4fe', '#c176e7', '#7a3cad']}
                            start={{ x: 1.1, y: 1 }}
                            end={{ x: 0, y: 0 }}
                            style={styles.deck}
                        >
                            <View style={styles.centerToLeftLine} />
                            <Text style={styles.cardTitle}>
                                {showAnswer
                                    ? cards[currentIndex]?.answer
                                    : cards[currentIndex]?.question}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <View style={{ flexDirection: "row", justifyContent: 'center', marginTop: 20 }}>
                        <IconButton
                            icon="close-thick"
                            iconColor="red"
                            size={35}
                            style={{ borderWidth: 2, marginRight: 40 }}
                            mode="outlined"
                            onPress={markIncorrect}
                        />
                        <IconButton
                            icon="check-bold"
                            iconColor="green"
                            size={35}
                            style={{ borderWidth: 2 }}
                            mode="outlined"
                            onPress={markCorrect}
                        />
                    </View>
                </>
            ) : (
                
                <View style={{ alignItems: 'center' }}>
                    <Text>Game over!</Text>
                    <Text>Correct: {score.correct}</Text>
                    <Text>Incorrect: {score.incorrect}</Text>
                    <Button onPress={resetGame} mode="outlined" style={{ margin: 10 }}>
                        Try again!
                    </Button>
                </View>
            )}
        </View>
    );
}
