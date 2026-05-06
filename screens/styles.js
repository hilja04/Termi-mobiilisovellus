import { StyleSheet } from "react-native";

export default StyleSheet.create({
    input: {
        height: 50,
        borderColor: '#B27ACF',
        borderWidth: 2,
        marginTop: 20,
        width: '70%',
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
        color: '#333',
    },
    deck: {
        backgroundColor: '#ffffff',
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
        width: "90%",
        alignSelf: "center"

    },
    deckTitle: {

    },
    deckDescription: {

    },
    deleteButton: {
        width: "30%",
        height:45,
        backgroundColor:"red",
        alignSelf:"flex-end"
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
        margin:3,
        borderWidth: 1,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "black",
    },
    addDeckModal:{
        width: '90%',
        height: 350,
        backgroundColor: '#c79bd0',
        borderColor: '#57355e',
        borderWidth: 3,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent:'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8},
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
        
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    buttonRow: {
        flexDirection: "row",  
        justifyContent: 'center',
        width: "100%",              
        marginTop: 20,
    },
})