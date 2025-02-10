import { Text, View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-reanimated/lib/typescript/Animated';

export default function History() {

  const DATA = [
    {
      title: "First Item",
    },
    {
      title: "Second Item",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>History Screen Page</Text>
      <View style={styles.containerText}>
        {/* <FlashList
          data={DATA}
          renderItem={({ item }) => <Text style={styles.listText}>{item.title}</Text>}
          keyExtractor={(item, index) => index.toString()}
        >
          
        </FlashList> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
  containerText: {
    backgroundColor: 'lightblue',
    padding: 50,
    height: 50,
    width: 50,
    marginBlockStart: "10%",
  },
  listText: {
    backgroundColor: "red",
    fontSize: 20,
    fontStyle: 'italic',
  },
});
