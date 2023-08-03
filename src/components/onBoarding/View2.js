import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Promotion2Svg } from '../../assets/svg/PromotionsSvg'
import { colors } from '../../styles/colors'
import { fonts, screenStyle, spacer } from '../../styles/CommonStyling'
import { screenHeight, screenWidth } from '../../styles/ResponsiveLayout'
import { AppText, HeadingText } from '../../utility/TextUtility'


const View2 = () => {

    return (
        <View style={styles.component}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Image source={require("../../assets/images/onBoarding2.png")} style={styles.img} />
            </View>
            <View style={{ marginHorizontal: spacer, alignItems: "center", marginBottom: 20 }}>
                <HeadingText
                    text={"Mission against Anemia"}
                    color={colors.white}
                    size={20}
                    style={{ fontFamily: fonts.bold, marginBottom: 20 }}
                />
                <AppText
                    text='Treat, Talk'
                    color={colors.white}
                    size={16}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    component: {
        ...screenStyle,
        width: screenWidth,
        alignItems: "center",
        backgroundColor: colors.irisBlue
    },
    img: {
        resizeMode: "contain",
        width: screenWidth,
        height: screenHeight / 1.5,
        left: 10
    }
})

export default View2;