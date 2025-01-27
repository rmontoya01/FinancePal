import React from "react";
import { StyleSheet, Text, View , StatusBar} from 'react-native';

import Header from '../../components/Header';

const index = () => {
    return (
    <View style={styles.container}>
      <Header />
      <Text >Welcome to FinancePal</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
  },
});

export default index;