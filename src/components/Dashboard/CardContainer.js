import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { HeadingText } from '../../utility/TextUtility'
import { colors } from '../../styles/colors'
import { screenWidth } from '../../styles/ResponsiveLayout'
import LinearGradient from 'react-native-linear-gradient'


export const defaultColorGradient = ["#FFF1C0", "#FDE181"]

const CardContainer = ({ options = [], onPress = () => { }, screenSpace = 60, colors = defaultColorGradient }) => {
    const maxScreenWidth = 450;
    const cardWidth = screenWidth < maxScreenWidth ? (((screenWidth - screenSpace) / 2)) : 200;

    return (
        <View style={styles.cardContainer}>
            {options.map((item, index) => {
                return (
                    <TouchableOpacity
                        key={String(index)}
                        onPress={() => onPress(item)}
                        style={{ alignItems: "center" }}
                    >
                        <LinearGradient
                            colors={colors}
                            style={[styles.card, {
                                width: cardWidth,
                                height: cardWidth - 35,
                            }]}
                        >
                            <TouchableOpacity
                                onPress={() => onPress(item)}
                                style={{ alignItems: "center" }}
                            >
                                <View>
                                    {item.icon}
                                </View>
                                <HeadingText
                                    text={item.title}
                                    size={13}
                                    style={{ marginTop: 8, textAlign: "center" }}
                                />
                            </TouchableOpacity>
                        </LinearGradient>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}


const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        margin: 10,
        marginBottom: 90
        // justifyContent:""
    },
    card: {
        borderWidth: 1,
        borderColor: colors.yellow,
        maxHeight: 200,
        marginHorizontal: 10,
        marginBottom: 20,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: colors.off_white
    }
})

export default CardContainer