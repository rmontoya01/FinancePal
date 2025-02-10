import React from "react";
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';

import Header from '../../components/Header';

const index = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Text >Welcome to FinancePal</Text>
      <View>
        <Image
        style={styles.imageStyle}
        source={require('../../assets/images/Designer01.jpeg')}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cadb9c',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    padding: 100,
    margin: 100,
    justifyContent: 'center',
}
});

export default index;