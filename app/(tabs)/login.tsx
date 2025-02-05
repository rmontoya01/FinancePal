import { Text, View, StyleSheet, KeyboardAvoidingView, TextInput } from 'react-native';

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Screen Page</Text>

      <View >
        <Text style={styles.text}>Login</Text>
        <View>
          <Text placeholder="Enter Email"
          />
        </View>
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
});
