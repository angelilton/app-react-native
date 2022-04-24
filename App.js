import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Deck from './src/Deck';

const DATA = [
  {
    id: 1,
    text: 'Card #1',
    uri: 'https://www.istoedinheiro.com.br/wp-content/uploads/sites/17/2022/03/batman-reproducao-warner-418x235.jpg',
  },
  {
    id: 2,
    text: 'Card #2',
    uri: 'https://source.unsplash.com/300x300',
  },
  {
    id: 3,
    text: 'Card #3',
    uri: 'https://source.unsplash.com/300x300',
  },
  {
    id: 4,
    text: 'Card #4',
    uri: 'https://www.istoedinheiro.com.br/wp-content/uploads/sites/17/2022/03/batman-reproducao-warner-418x235.jpg',
  },
  {
    id: 5,
    text: 'Card #5',
    uri: 'https://source.unsplash.com/300x300',
  },
  {
    id: 6,
    text: 'Card #6',
    uri: 'https://source.unsplash.com/300x300',
  },
  {
    id: 7,
    text: 'Card #7',
    uri: 'https://source.unsplash.com/300x300',
  },
  {
    id: 8,
    text: 'Card #8',
    uri: 'https://source.unsplash.com/300x300',
  },
];

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Deck data={DATA} />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20
  },
});
