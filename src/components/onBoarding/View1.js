import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Promotion1Svg } from '../../assets/svg/PromotionsSvg'
import { colors } from '../../styles/colors'
import { fonts, screenStyle, spacer } from '../../styles/CommonStyling'
import { screenWidth } from '../../styles/ResponsiveLayout'
import { AppText, HeadingText } from '../../utility/TextUtility'


const View1 = () => {


    return (
        <View style={styles.component}>
            <View style={{ flex: 1, justifyContent: "center", }}>
                {/* <Promotion1Svg scale={0.8} /> */}
                <Image source={require("../../assets/images/GirlsInDrop.png")} style={styles.img} />
            </View>
            <View style={{ marginHorizontal: 0, alignItems: "center", marginBottom: 20 }}>
                <HeadingText
                    text={"Mission against Anemia"}
                    color={colors.white}
                    size={20}
                    style={{ fontFamily: fonts.bold, marginBottom: 20 }}
                />
                <AppText
                    text={"T3 Camp, Test"}
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
        backgroundColor: colors.red
    },
    img: {
        height: 500,
        width: 300,
        resizeMode: "contain",
        // alignSelf: "flex-start"
        position: "absolute",
        right: "-27%"
    }
})

export default View1