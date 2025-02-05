import { Text, View, StyleSheet } from 'react-native';

import Chart from '../../components/Chart';

export default function Income() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Income Screen Page</Text>

      <View style={styles.ChartContainer}>
        <Chart />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  ChartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
