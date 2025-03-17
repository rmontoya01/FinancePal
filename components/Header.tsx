import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Typo from './Typo'
import { HeaderProps } from '@/types'

const Header = ({ title = "", rightIcon, style }: HeaderProps) => {
    return (
        <View style={[styles.container, style]}>
            {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
            {
                title && (
                    <Typo style={{ textAlign: "center", width: rightIcon ? "80%" : "95%", }} size={28} fontWeight={"700"}>

                        {title}

                    </Typo>
                )
            }
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
    },
    rightIcon: {
        alignSelf: "flex-end"
    },
});
