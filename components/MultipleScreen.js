import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { fetchCards, saveTestResult } from "../database/dbFunctions";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "react-native-paper";
import { Icon } from "react-native-paper";
import styles from "./styles";

export default function MultipleScreen({ route }) {
    const { deck } = route.params;
    const db = useSQLiteContext();
    const [cards, setCards] = useState([]);
    const [finished, setFinished] = useState(false)
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState({ correct: 0, incorrect: 0 });
    const [choices, setChoices] = useState([]);
    const [selected, setSelected] = useState(null);
    const [checked, setChecked] = useState(false);

    //fetching cards from db
    useEffect(() => {
        const load = async () => {
            const data = await fetchCards(db, deck.id);
            const shuffled = data.sort(() => Math.random() - 0.5); //shuffles cards before game starts 
            setCards(shuffled);
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
    const nextCard = async () => {
        const next = index + 1;

        if (next < cards.length) {
            setIndex(next);
            generateChoices(cards, next);
        } else {
            setFinished(true);
            await saveTestResult(db, deck.id, score.correct, cards.length, "Multiple-choice");
        }
    };

    const handleSelect = async (choice) => {
        if (checked) return;

        setSelected(choice);
        setChecked(true);

        const correctAnswer = cards[index].answer;
        const isCorrect = choice === correctAnswer;

        const newCorrect = isCorrect ? score.correct + 1 : score.correct;
        const newIncorrect = isCorrect ? score.incorrect : score.incorrect + 1;

        setScore({ correct: newCorrect, incorrect: newIncorrect });
    };

    const resetGame = () => {
        setFinished(false);
        setIndex(0);
        setScore({ correct: 0, incorrect: 0 })
        generateChoices(cards, 0);
    }

    // Game doesn't start if less than three cards in the deck
    if (cards.length < 3) {
        return (
            <View style={styles.flashcardContainer}>
                <Text style={styles.deckDescription}>
                    Have at least 3 cards to play!
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.multipleContainer}>


            {!finished ? (
                <>
                    <Text style={styles.headerStyle}>{deck.title}</Text>
                    <Text>Choose the right answer below</Text>
                    <LinearGradient
                        colors={['#f3e4fe', '#c176e7', '#7a3cad']}
                        start={{ x: 1.1, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        style={[styles.deck, { marginBottom: 30 }]}
                    >
                        <Text style={styles.cardTitle}>{cards[index]?.question}</Text>
                    </LinearGradient>

                    {/* Choices*/}
                    {choices.map((choice, i) => (
                        <TouchableOpacity
                            key={i}
                            style={styles.choiceButton}
                            onPress={() => handleSelect(choice)}
                        >

                            <View style={styles.choiceRow}>
                                <Text style={styles.choiceText}>{choice}</Text>

                                {checked && choice === cards[index]?.answer && (
                                     <View style={{position:"absolute", right: 3}}>
                                        <Icon source="check" size={22} color="limegreen"  />
                                     </View>
                                )}

                                {checked && selected === choice && choice !== cards[index]?.answer && (
                                    <View style={{position:"absolute", right: 3}}>
                                        <Icon source="close" size={22} color="red"  />
                                    </View>
                                )}
                            </View>


                        </TouchableOpacity>
                    ))}

                    {/* Shows next button after selection */}
                    {checked && (
                        <Button
                            style={styles.defaultButton}
                            labelStyle={{ color: "white" }}
                            onPress={nextCard}
                        >
                            Next Card
                        </Button>
                    )}
                </>
            ) : (

                <LinearGradient              
                    colors={['#f3e4fe', '#b56cda', '#7a3cad']}
                    start={{ x: 1.1, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={styles.gameOverContainer}>
                        <Text style={styles.headerStyle}>{deck.title}</Text>
                        
                        <View style={styles.gameOverLine} />
                        <Text style={{fontSize:20}}>Game over!</Text>
                        <Text style={{fontSize:20,marginTop:15}}>Score: {score.correct} / {cards.length}</Text>
                       

                        <Button 
                            onPress={resetGame} 
                            mode="outlined" 
                            style={{ marginTop: 15, borderWidth:2, borderColor:"#74488a", borderRadius: 15 }}
                            labelStyle={{ color: "white" }}
                        >
                            Try again!
                        </Button>
                </LinearGradient>
            )}

        </View>
    );
}
