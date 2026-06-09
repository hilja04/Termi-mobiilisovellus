import { StyleSheet } from "react-native";

export default StyleSheet.create({

    container: {
        backgroundColor: '#b87fde',
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
        backgroundColor: '#9e4ec6', // hieman kirkkaampi, mutta lähes sama sävy
        padding: 15,
        marginVertical: 12,
        marginHorizontal: 12,
        borderRadius: 15,
        shadowColor: '#000000',
        elevation: 12,
        borderWidth: 3,
        borderColor: '#974cbc',
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
        fontWeight:500,

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
        marginTop: 10,
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
        fontSize:15,
        fontWeight:"bold", 
        color:"#412554"
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 10,
        height: 40,
        backgroundColor: '#b87fde',
        borderRadius: 10,
        elevation: 5,
        borderColor: '#8a40bc',
        borderWidth:2,
        opacity:0.9,
        zIndex: 999,

    },
    defaultButton: {
        width: 90,
        height: 40,
        backgroundColor: '#fef7fc',
        borderRadius: 10,
        elevation: 5,
        borderColor: 'black',
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
    options: {
        borderWidth: 2,
        borderColor: "#918888",
        borderRadius: 6,
        marginHorizontal: 8,
        marginVertical: 3,
    }
})