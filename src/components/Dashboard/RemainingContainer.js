import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { WarningSvgIcon } from '../../assets/svg/BasicIcons';
import { navigate } from '../../route/RootNavigation';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/CommonStyling';
import { screenWidth } from '../../styles/ResponsiveLayout';
import { HeadingText } from '../../utility/TextUtility';



const RemainingContainer = ({ screenSpace = 60, data = {} }) => {
    const maxScreenWidth = 450;
    const cardWidth = screenWidth < maxScreenWidth ? (((screenWidth - screenSpace) / 2)) : 200;

    const arr = [
        {
            beforeTxt: "You have",
            value: data.pendingHbTest ? data.pendingHbTest : 0,
            afterTxt: "Remaining HB Test",
            key: "test"
        },
        {
            beforeTxt: "You have",
            value: data.pendingTreatment ? data.pendingTreatment : 0,
            afterTxt: "Remaining treatments",
            key: "treatment"
        }
    ]


    const onPress = (item) => {
        if (!item.value || item.value == 0) {
            return;
        }
        navigate("dueTreatment", { dueType: item.key });
    }

    return (
        <View style={styles.container}>
            {arr.map((item, index) => {
                return (
                    <TouchableOpacity key={String(index)}
                        style={[styles.card, {
                            width: cardWidth,
                            height: 80,
                        }]}
                        activeOpacity={0.8}
                        onPress={() => onPress(item)}
                    >
                        <View style={{}}>
                            <WarningSvgIcon />
                        </View>
                        <Text style={{ marginLeft: 10, flex: 1 }}>
                            <HeadingText
                                text={item.beforeTxt + " "}
                                size={13}
                            // color={colors.darkGrey}
                            />
                            <HeadingText
                                text={item.value}
                                size={15}
                                style={{ fontFamily: fonts.bold }}
                            />
                            <HeadingText
                                text={" " + item.afterTxt}
                                size={13}
                            // color={colors.darkGrey}
                            />
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}


const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: colors.grey,
        maxHeight: 120,
        marginHorizontal: 10,
        borderRadius: 10,
        alignItems: "center",
        // justifyContent: "center",
        backgroundColor: "#F8E4CC",
        flexDirection: "row",
        paddingHorizontal: 5,
        paddingLeft: 10
    },
    container: {
        flexDirection: "row",
        alignSelf: "center",
        marginVertical: 10
    }
});

export default RemainingContainer