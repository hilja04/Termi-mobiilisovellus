import  { View, Text} from 'react-native'

export default function DeckScreen({route}){
    const { deck } = route.params;

     return (
    <View>
      <Text>Deck:  {deck.description}</Text>
    </View>
  );
}