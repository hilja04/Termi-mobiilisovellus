import { StyleSheet } from "react-native";

export default StyleSheet.create({

    container: {
        backgroundColor: '#d3d2d3',
        flex: 1,
        
    },
    flashcardContainer: {
        flex: 1,
        backgroundColor: '#d6d3d8',
        justifyContent: 'center',

    },
    multipleContainer: {
        flex: 1,
        backgroundColor: '#d6d3d8',
        justifyContent: 'center',
        alignItems:"center"

    },
    input: {
        height: 50,
        borderColor: '#686868',
        borderWidth: 2,
        marginTop: 20,
        width: '75%',
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#f4f3f3',
        color: '#333',
        boxShadow: "10px 10px 17px -17px rgba(74, 73, 73, 0.75)",
    },
    deck: {
        padding: 15,
        marginVertical: 12,
        marginHorizontal: 12,
        borderRadius:10,
        boxShadow: "10px 10px 17px -12px rgba(0,0,0,0.75)",
        elevation: 8,
        height: 160,   
        width: "75%", 
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
       
    },
    leftFill: {
        position: "absolute",
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        left: 0,
        top: 0,
        bottom: 0,
        width: 30,               
    },
    centerLine: {
        position: "absolute",
        top: 0,
        bottom: 0,
        width: 2,
        backgroundColor: "rgba(255,255,255,0.4)", 
        left: "17%",
        transform: [{ translateX: -1 }],
    },

    centerToLeftLine: {
        position: "absolute",
        bottom: "35%",
        width: "90%",
        height: 2,
        backgroundColor: "rgba(255,255,255,0.4)",
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
        width: '85%',
        height: 330,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        boxShadow: "10px 10px 17px -12px rgba(0, 0, 0, 0.75)",
    },
    
    modalHeader: {
        fontSize: 20,
        fontWeight:500,
        alignSelf:"center"
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(81, 60, 87, 0.6)',
    },
    buttonLabel: {
        fontSize:15,
        color:"#000000"
    },
    addButton: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        borderWidth:3,
        borderColor:"#424143",
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
        backgroundColor: "#9b9b9b",
        marginTop: 15,
        borderRadius: 5,
        borderWidth: 2.5,
        borderColor: "#605f5f",
        boxShadow: "10px 10px 17px -12px rgba(73, 38, 83, 0.75)",
        
    },
    cancelButton: {
        position:"absolute",
        top:10,
        right:10
    },
   
    choiceButton: {
        padding: 12,
        borderRadius: 10,
        borderColor:"#9051a5",
        borderWidth:2,
        marginVertical: 6,
        width: "60%",
        backgroundColor: "#ae60c8",
        justifyContent: "center",
        alignItems: "center",
    },

    choiceText: {
        color: "black",
        fontSize: 16,
        fontWeight:500,
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