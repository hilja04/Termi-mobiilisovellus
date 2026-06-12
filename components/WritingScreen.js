import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { View, Text, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { fetchCards, saveTestResult} from "../database/dbFunctions";
import styles from "./styles";

export default function WritingScreen({ route }) {
    const { deck } = route.params;
    const db = useSQLiteContext();
    const [cards, setCards] = useState([]);
    const [index, setIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [checked, setChecked] = useState(false);
    const [correct, setCorrect] = useState(null);
    const [score, setScore] = useState({ correct: 0, incorrect: 0 });
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        const load = async () => {
            const data = await fetchCards(db, deck.id);
            const shuffled = data.sort(() => Math.random() - 0.5); //shuffles cards before game starts
            setCards(shuffled);
        };
        load();
    }, []);

    //Checks if answer is correct
    const check = async () => {
        if (checked) return;

        const ok =
            answer.trim().toLowerCase() === cards[index]?.answer.trim().toLowerCase();

        setCorrect(ok);
        setChecked(true);

        const newCorrect = ok ? score.correct + 1 : score.correct;
        const newIncorrect = ok ? score.incorrect : score.incorrect + 1;

        setScore({ correct: newCorrect, incorrect: newIncorrect });
        //If last card, end game and save test results
        if (index === cards.length - 1) {
            setFinished(true);
            await saveTestResult(db, deck.id, newCorrect, cards.length, "Written");
        }
    };

    const next = () => {
        if (index + 1 < cards.length) {
            setIndex(index + 1);
            setAnswer("");
            setChecked(false);
            setCorrect(null);
        } else {
            setFinished(true);
        }
    };

    const reset = () => {
        setFinished(false);
        setIndex(0);
        setAnswer("");
        setChecked(false);
        setCorrect(null);
        setScore({ correct: 0, incorrect: 0 });
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.multipleContainer}>
                <Text style={styles.modalHeader}>{deck.title}</Text>

                {!finished ? (
                    <>
                        <Text>Write the correct answer</Text>
                        <LinearGradient 
                             colors={['#f3e4fe', '#c176e7', '#7a3cad']}
                            start={{ x: 1.1, y: 1 }}
                            end={{ x: 0, y: 0 }}
                            style={styles.deck}>
                            <Text style={styles.cardTitle}>{cards[index]?.question}</Text>
                        </LinearGradient>

                        <TextInput
                            style={styles.input}
                            placeholder="Type your answer..."
                            value={answer}
                            onChangeText={setAnswer}
                            editable={!checked}
                        />

                        {!checked && (
                            <Button mode="contained" style={{ marginTop: 20 }} onPress={check}>
                                Check
                            </Button>
                        )}

                        {checked && (
                            <>
                                {correct ? (
                                    <Text style={{ color: "green", marginTop: 20 }}>Correct!</Text>
                                ) : (
                                    <Text style={{ color: "red", marginTop: 20 }}>
                                        Wrong! The right answer was:{" "}
                                        <Text style={{ fontWeight: "bold" }}>{cards[index]?.answer}</Text>
                                    </Text>
                                )}

                                <Button mode="contained" style={{ marginTop: 20 }} onPress={next}>
                                    Next Card
                                </Button>
                            </>
                        )}
                    </>
                ) : (
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 15 }}>Game over!</Text>
                        <Text>Correct: {score.correct}</Text>
                        <Text>Incorrect: {score.incorrect}</Text>

                        <Button mode="outlined" style={{ marginTop: 20 }} onPress={reset}>
                            Try again
                        </Button>
                    </View>
                )}
            </View>
        </KeyboardAvoidingView>
    );
}
