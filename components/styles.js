import { StyleSheet } from "react-native";

export default StyleSheet.create({

    container: {
        backgroundColor: '#d6d3d8',
        flex: 1,
        position: 'relative',
    },
    flashcardContainer: {
        flex: 1,
        backgroundColor: '#d6d3d8',
        alignItems: 'center',
        justifyContent: 'center',

    },
    input: {
        height: 50,
        borderColor: '#c56ff0',
        borderWidth: 2,
        marginTop: 20,
        width: '70%',
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
        color: '#333',
    },
    deck: {
        backgroundColor: '#ac5fdb',
        padding: 15,
        marginVertical: 12,
        marginHorizontal: 12,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
        height: 150,
        width: "80%",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",

    },
    cardTitle: {
        position: "absolute",
        textAlign: "center",
        fontSize: 20,

    },

    notifyText: {
        flex: 1,
        alignItems: "center",
        textAlign: "center",
        fontSize: 15,
        paddingTop: 30,

    },
    deckDescription: {
        fontSize: 15,
        padding: 13,
        alignSelf: 'center',
    },

    deckModal: {
        width: '90%',
        height: 350,
        backgroundColor: '#c79bd0',
        borderColor: '#57355e',
        borderWidth: 3,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,

    },
    modalHeader: {
        fontSize: 20,
        margin: 10,
    },

    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    buttonLabel: {
        fontSize: 15,
        color: 'black',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 90,
        height: 40,
        backgroundColor: '#fef7fc',
        borderRadius: 10,
        elevation: 5,
        borderColor: 'black',
    },
    defaultButton: {
        width: 90,
        height: 40,
        backgroundColor: '#fef7fc',
        borderRadius: 10,
        elevation: 5,
        borderColor: 'black',
    },

    deleteButton: {
        position: 'absolute',
        width: "30%",
        height: 45,
        backgroundColor: "red",
        alignSelf: "flex-end",
        bottom: 20,
        right: 20


    },
    saveButton: {
        backgroundColor: "#C55FFC",
        margin: 3,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "black"
    },
    cancelButton: {
        backgroundColor: '#808080',
        margin: 3,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "black",
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: 'center',
        width: "100%",
        marginTop: 20,
    },
    choiceButton: {
        padding: 12,
        borderRadius: 10,
        marginVertical: 6,
        width: 250,
        backgroundColor: "#333",
        justifyContent: "center",
        alignItems: "center",
    },

    choiceText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
    },
})