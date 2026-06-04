import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { fetchCards } from "../database/dbFunctions";
import { View, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import styles from "./styles";

export default function MultipleScreen({ route }) {
    const { deck } = route.params;
    const db = useSQLiteContext();

    const [gameCards, setGameCards] = useState([]);
    const [gameFinished, setGameFinished] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState({ correct: 0, incorrect: 0 });
    const [choices, setChoices] = useState([]);
    const [selected, setSelected] = useState(null);
    const [checked, setChecked] = useState(false);

    //fetching cards from db
    useEffect(() => {
        const load = async () => {
            const cards = await fetchCards(db, deck.id);
            const shuffled = cards.sort(() => Math.random() - 0.5); //shuffles cards before game starts
            setGameCards(shuffled);
            generateChoices(shuffled, 0) 
        };
        load();
    }, []);

    
    const generateChoices = (cards, index) => { 
        const current = cards[index];

        //Sets wrong answers from other cards
        const wrong = cards
            .filter(c => c.id !== current.id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 2)
            .map(c => c.answer);

        const all = [...wrong, current.answer].sort(() => Math.random() - 0.5);

        setChoices(all);
        setSelected(null);
        setChecked(false);
    }

    //Moves to next card or finishes the game
    const nextCard = () => {
        const next = currentIndex + 1;

        if (next < gameCards.length) {
            setCurrentIndex(next);
            generateChoices(gameCards, next);
        } else {
            setGameFinished(true);
        }
    };

    const handleSelect = (choice) => {
        if (checked) return; // Cant select again 

        setSelected(choice);
        setChecked(true);

        const correct = gameCards[currentIndex].answer;

        if (choice === correct) {
            setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
        } else {
            setScore(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
        }
    };

    const resetGame = () => {
        setGameFinished(false);
        setCurrentIndex(0);
        setScore({ correct: 0, incorrect: 0 })
        generateChoices(gameCards, 0);
    }

    // Game doesn't start if less than three cards in the deck
    if (gameCards.length < 3) {
        return (
            <View style={styles.flashcardContainer}>
                <Text style={styles.deckDescription}>
                    Have at least 3 cards to play!
                </Text>
            </View>
        );
    }
    const current = gameCards[currentIndex];

    return (
        <View style={styles.flashcardContainer}>

            <Text style={styles.modalHeader}>{deck.title}</Text>
            <Text>Choose the right answer below</Text>

            {!gameFinished ? (
                <>
                    <TouchableOpacity style={styles.deck}>
                        <Text style={styles.cardTitle}>{current.question}</Text>
                    </TouchableOpacity>

                    {/* Choices*/}
                    {choices.map((choice, i) => (
                        <TouchableOpacity
                            key={i}
                            style={[styles.choiceButton,
                            //Logic for turning answer either green or red
                            checked && choice === current.answer && { backgroundColor: "green" },
                            checked && selected === choice && choice !== current.answer && { backgroundColor: "red" },
                            ]}
                            onPress={() => handleSelect(choice)}>

                            <Text style={styles.choiceText}>
                                {choice}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    
                    {/* Shows next button after selection */}
                    {checked && (
                        <Button
                            mode="contained"
                            style={{ marginTop: 20 }}
                            onPress={nextCard}
                        >
                            Next Card
                        </Button>
                    )}
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
