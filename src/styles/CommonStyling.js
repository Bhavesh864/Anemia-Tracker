import { colors } from "./colors";



export const fonts = {
    thin: 'Montserrat-Thin',
    light: 'Montserrat-Light',
    regular: 'Montserrat-Regular',
    italic: 'Montserrat-Italic',
    medium: 'Montserrat-Medium',
    bold: 'Montserrat-Bold',
    semiBold: "Montserrat-SemiBold",
};


export const statusBar = {
    dark: 'dark-content',
    light: 'light-content',
    default: 'default'
};

export const spacer = 20;

export const flexCenter = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
}

export const flexRow = {
    flexDirection: 'row',
    alignItems: 'center',
}

export const Center = {
    justifyContent: 'center',
    alignItems: 'center'
}

export const flexSpaceAround = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
}

export const screenStyle = {
    flex: 1,
    backgroundColor: colors.skyBlue,
}

export const fontSize = {
    large: 22,
    normal: 14,
    small: 12,
    verySmall: 10,
    medium: 18,
    largeMedium: 20,
    veryLarge: 30
}

export const normalTextStyle = {
    fontSize: fontSize.normal,
    fontFamily: fonts.regular,
    color: colors.black,
    lineHeight: 18
}

export const smallTextSize = {
    fontSize: fontSize.small,
    fontFamily: fonts.regular,
    color: colors.primary
}



export const MediumTextStyle = {
    fontSize: fontSize.medium,
    fontFamily: fonts.medium,
    color: colors.black
}

export const largeMediumStyle = {
    fontSize: fontSize.largeMedium,
    fontFamily: fonts.medium,
    color: colors.primary
}

export const LargeTextStyle = {
    fontSize: fontSize.large,
    fontFamily: fonts.medium,
    color: colors.primary,
    // fontWeight: "bold",
}


export const HeavyTextStyle = {
    fontSize: fontSize.veryLarge,
    fontFamily: fonts.medium,
    color: colors.black,
    // fontWeight: "600"
}