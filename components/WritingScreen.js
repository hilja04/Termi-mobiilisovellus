import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { View, Text, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { fetchCards, saveTestResult } from "../database/dbFunctions";
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
    };

    const next = async () => {
        if (index + 1 < cards.length) {
            setIndex(index + 1);
            setAnswer("");
            setChecked(false);
            setCorrect(null);
        } else {
            setFinished(true);
            await saveTestResult(db, deck.id, score.correct, cards.length, "Written");
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


                {!finished ? (
                    <>
                        <Text style={styles.headerStyle}>{deck.title}</Text>
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
                            <Button mode="contained" style={styles.defaultButton} onPress={check}>
                                Check
                            </Button>
                        )}

                        {checked && (
                            <>
                                {correct ? (
                                    <Text style={{ color: "green", marginTop: 20 }}>Correct!</Text>
                                ) : (
                                    <Text style={{ color: "red", textAlign:"center", paddingHorizontal:20, marginTop: 20 }}>
                                        Wrong! The right answer was:{" "}
                                        <Text style={{ fontWeight: "bold" }}>{cards[index]?.answer}</Text>
                                    </Text>
                                )}

                                <Button mode="contained" style={styles.defaultButton} onPress={next}>
                                    Next Card
                                </Button>
                            </>
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
                        <Text style={{ fontSize: 20 }}>Game over!</Text>
                        <Text style={{ fontSize: 20, marginTop: 15 }}>Score: {score.correct} / {cards.length}</Text>

                        <Button
                            onPress={reset}
                            mode="outlined"
                            style={{ marginTop: 15, borderWidth: 2, borderColor: "#74488a", borderRadius: 15 }}
                            labelStyle={{ color: "white" }}
                        >
                            Try again!
                        </Button>
                    </LinearGradient>
                )}
            </View>
        </KeyboardAvoidingView>
    );
}
