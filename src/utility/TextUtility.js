import React from "react"
import { Text } from "react-native"
import { colors } from "../styles/colors"
import { fontSize, largeMediumStyle, LargeTextStyle, normalTextStyle } from "../styles/CommonStyling"






export const HeadingText = ({ text = "", style = {}, color = colors.black, size = fontSize.medium }) => {
    return <Text allowFontScaling={false} style={[largeMediumStyle, { color, fontSize: size }, style]}>{text ? text : ""}</Text>
}


export const AppText = ({ text = "", style = {}, color = colors.black, size = fontSize.normal }) => {
    return <Text allowFontScaling={false} style={[normalTextStyle, { color, fontSize: size }, style]}>{text ? text : ""}</Text>
}