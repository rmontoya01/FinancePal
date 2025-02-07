import { Text, View, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react'

// export default function login() {

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior='padding'
    >
      <View style={styles.inputContainer}>
        <TextInput
        placeholder='Email'
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
        />
        <TextInput
        placeholder='Password'
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
        secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
        onPress={() => { }}
        style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => { }}
        style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
}

export default Login;

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
  inputContainer: {
    width: '75%',
  }, 
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 10,
  }, 
  buttonContainer: {
    width: '65%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 45,
  }, 
  button: {
    backgroundColor: 'lightblue',
    width: '95%',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center'
  }, 
  buttonOutline: {
    backgroundColor: "lightgray",
    marginTop: 30,
    borderColor: "lightblue",
    borderWidth: 6,
  }, 
  buttonText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 20,
  },
  buttonOutlineText: {
    color: 'royalblue',
    fontWeight: '800',
    fontSize: 20,
  },
});
