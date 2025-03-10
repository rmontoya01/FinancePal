import React from "react";
import { View, StyleSheet, Text, Dimensions, Image } from 'react-native';

type headerTitle = {
    title: string;
};

const Title = (props: headerTitle) => {
    return (
        <Text style={styles.labelStyle}>{props.title}</Text>

    )
}

const Header = () => {
    return (
        <View style={styles.container}>
            <Title title="Stats"></Title>
            <Image
                style={styles.imageStyle}
                source={require('../assets/images/Designer01.jpeg')}
            />
        </View>
    )
};

const deviceWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    container: {
        width: deviceWidth,
        height: 90,
        // flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'lightblue',
        alignItems: 'center',
        paddingBottom: 10,
        // justifyContent: 'center',
    },
    labelStyle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black',
        // textAlign: 'center',
    },
    imageStyle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        position: 'absolute',
        alignItems: 'flex-end',
        right: 10,
    }
});

export default Header;