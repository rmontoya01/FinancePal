import { View, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { useIsFocused, useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, spacingY } from '@/constants/themes';
import { verticalScale } from '@/utils/styling';
import Ionicons from '@expo/vector-icons/Ionicons';

export function TabBarCustomize({ state, descriptors, navigation }: BottomTabBarProps) {

    const tabsIcons: any = {
        index: (focused: boolean) => <Ionicons name="home" size={24} color={focused ? colors.primary : colors.neutral100} />,
        budget: (focused: boolean) => <Ionicons name="cash" size={24} color={focused ? colors.primary : colors.neutral100} />,
        history: (focused: boolean) => <Ionicons name="time" size={24} color={focused ? colors.primary : colors.neutral100} />,
        stats: (focused: boolean) => <Ionicons name="bar-chart" size={24} color={focused ? colors.primary : colors.neutral100} />,
        converter: (focused: boolean) => <Ionicons name="calculator" size={24} color={focused ? colors.primary : colors.neutral100} />,
    }

    return (
        <View style={styles.tabs}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label: any =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        // href={buildHref(route.name, route.params)}
                        key={route.key}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabsObjs}
                    >

                        {/* TAB TEXT */}
                        {<Text style={{ color: isFocused ? colors.primary : colors.neutral100 }}>
                            {label}
                        </Text>}

                        {/* TAB ICONS */}
                        {
                            tabsIcons[route.name] && tabsIcons[route.name](isFocused)
                        }

                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        width: "100%",
        height: Platform.OS == "ios" ? verticalScale(70) : verticalScale(50),
        backgroundColor: colors.neutral800,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopColor: colors.neutral700,
        borderTopWidth: 4,
    },
    tabsObjs: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Platform.OS == "ios" ? spacingY._12 : spacingY._7,
    }
}
);