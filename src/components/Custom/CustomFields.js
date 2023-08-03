import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { flexRow, fonts, fontSize, normalTextStyle } from '../../styles/CommonStyling';
// import { colors } from '../styles/colors';
// import { goBack } from '../route/RootNavigation';
// import { shadows } from '../styles/shadow';
import { AppText, HeadingText } from '../../utility/TextUtility';
import { colors } from '../../styles/colors';
import { goBack } from '../../route/RootNavigation';
import { shadows } from '../../styles/shadow';





export const InputField = ({ placeholder = "Input", value, onTextChange, onFocus = () => { }, onBlur = () => { }, showIcon, isDescription = false, error, password = false, style = {}, activeBorderColor, textStyle = {}, keyboardType = "default", maxLength = 50, leftIcon, label, editable = true, mandatory = false }) => {
    const [activeField, setActiveField] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(password);

    // const inputPasswordWidth = activeField && !isDescription ? { border: 0.5, borderColor: activeBorderColor ? activeBorderColor : colors.primary } : {};
    // //console.log("editable--", secureTextEntry)
    return (
        <View style={{ marginVertical: 10 }}>
            {label && <Text style={{ marginBottom: 0, marginHorizontal: 20 }}>
                <HeadingText
                    text={label}
                    color={colors.black}
                    size={fontSize.normal + 2}
                />
                {mandatory &&
                    <HeadingText
                        text={" *"}
                        color={colors.red}
                        size={fontSize.normal + 2}
                    />}
            </Text>
            }
            <View
                style={[
                    styles.InputView,
                    // inputPasswordWidth,
                    // shadows[1],
                    isDescription ? { height: 120, } : { alignItems: "center" },
                    error ? { borderColor: colors.darkRed } : null,
                    style
                ]}
            >
                {leftIcon && leftIcon}

                <TextInput
                    value={value}
                    onChangeText={(text) => onTextChange(text)}
                    placeholder={placeholder}
                    placeholderTextColor={colors.grey}
                    maxLength={maxLength}
                    keyboardType={keyboardType}
                    editable={editable}
                    autoCapitalize="none"
                    secureTextEntry={secureTextEntry}
                    multiline={isDescription ? true : false}
                    onFocus={() => {
                        setActiveField(true)
                        onFocus()
                    }}
                    onBlur={() => {
                        setActiveField(false)
                        onBlur()
                    }}
                    style={[{
                        flex: 1,
                        // height: 50,
                        color: 'black',
                        ...normalTextStyle,
                        paddingLeft: showIcon ? 10 : 10,
                        textAlignVertical: isDescription ? "top" : "center",
                        ...textStyle
                    }]}
                />
                {showIcon && <View style={{}}>
                    {showIcon}
                </View>}
                {password && <Entypo name={secureTextEntry ? 'eye-with-line' : 'eye'} size={20} color={colors.darkGrey} style={{ padding: 5 }} onPress={() => setSecureTextEntry(!secureTextEntry)} />}
            </View>
            {error ?
                <AppText
                    text={error}
                    style={[normalTextStyle, { color: colors.darkRed, paddingHorizontal: 25, }]}
                />
                // <Text style={[normalTextStyle, { color: colors.darkRed, paddingHorizontal: 25, }]}>{error}</Text> 
                : null}
        </View>
    )
}

export const AppName = ({ scale = 1 }) => {
    return (
        <View style={{ transform: [{ scale: scale }] }}>
            {/* <AppNameSvg /> */}
        </View>
    )
}


export const Loader = ({ color = colors.white, backgroundColor = "rgba(0,0,0,0.5)" }) => {
    return (
        <View style={[styles.loader, { backgroundColor: backgroundColor }]}>
            <ActivityIndicator size={"large"} color={color} style={styles.loaderC} />
        </View>
    )
}

export const Button = ({ title = "Continue", onPress = () => { }, backgroundColor = colors.primary, textStyle = {}, icon, style = {} }) => {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: backgroundColor, ...style }]}
            onPress={() => onPress()}
        >
            {icon && icon}
            <AppText
                text={title}
                style={{ fontFamily: fonts.medium, color: colors.white, ...textStyle }}
            />
            {/* <Text style={[styles.buttonText, { ...textStyle }]}>{title}</Text> */}
        </TouchableOpacity>
    )
}


export const TouchableTextView = ({ placeholder, label, value, onPress = () => { }, Icon, leftIcon, style = {}, touchable = true, mandatory = false }) => {
    return (
        <View style={{ marginVertical: 10, display: 'flex' }}>
            {label &&
                <Text style={{ marginBottom: 0, marginHorizontal: 20 }}>
                    <HeadingText
                        text={label}
                        // style={{ marginBottom: 0, marginHorizontal: 20 }}
                        color={colors.black}
                        size={fontSize.normal + 2}
                    />
                    {mandatory &&
                        <HeadingText
                            text={" *"}
                            color={colors.red}
                            size={fontSize.normal + 2}
                        />
                    }
                </Text>
            }
            <TouchableOpacity
                activeOpacity={touchable ? 0 : 1}
                style={[styles.InputView, { alignItems: "center" }, style]}
                onPress={() => touchable ? onPress() : null}
            >
                {Icon && Icon}
                <Text
                    style={[
                        normalTextStyle,
                        { color: value ? colors.black : colors.grey, flex: 1, paddingLeft: 10 },
                    ]}
                >{value ? value : placeholder}</Text>
                {leftIcon && leftIcon}
            </TouchableOpacity>
        </View>
    )
}

export const VerticalAlignDataFormat = ({ label, value }) => {
    return (
        <View style={{ height: 40, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <HeadingText
                text={label}
                style={{ marginBottom: 0, marginHorizontal: 10 }}
                color={colors.black}
                size={fontSize.normal + 1}
            />
            <AppText
                text={value}
                style={[
                    { color: colors.black, paddingRight: 10 },
                ]}
            />
        </View>
    )
}




export const Checkbox = ({ value = false, size = 20, backgroundColor = colors.primary, onPress = () => { }, checkText = false }) => {
    return (
        <View style={{ ...flexRow }}>
            <TouchableOpacity
                onPress={onPress}
                style={[styles.checkbox, { backgroundColor: colors.white, height: size, width: size, borderColor: value ? colors.red : colors.grey }]}
            >
                {value &&
                    <Entypo name='check' size={20} color={colors.red} />
                }
            </TouchableOpacity>
            {value && checkText &&
                <HeadingText
                    text="   Checked"
                    size={fontSize.normal}
                    color={colors.green}
                />
            }
        </View>
    )
}


export const CustomBackButton = ({ style = {}, onPress = () => goBack() }) => {
    return (
        <TouchableOpacity onPress={() => onPress()} style={[styles.headerIcon, style]}>
            <AntDesign name="arrowleft" color={colors.black} size={25} style={{}} />
        </TouchableOpacity>
    )
}


export const ModalHeader = ({ title = "", onPress = () => { } }) => {
    return (
        <View style={{ ...flexRow, ...styles.modalHeader }}>
            <HeadingText
                text={title}
                color={colors.black}
                style={{ flex: 1, textAlign: "center" }}
            />
            <TouchableOpacity style={styles.closeIcon} onPress={() => onPress()}>
                <AntDesign name="close" size={30} color={colors.black} />
            </TouchableOpacity>
        </View>
    )
}


export const RadioButton = ({ value, size = 30 }) => {
    return (
        <View style={[styles.radioView, { height: size, width: size }]}>
            {value && <View style={styles.radioValue} />}
        </View>
    )
}


const styles = StyleSheet.create({
    InputView: {
        borderColor: colors.grey,
        // marginVertical: 5,
        flexDirection: 'row',
        marginHorizontal: 20,
        alignSelf: 'center',
        height: 50,
        // backgroundColor: colors.white,
        borderBottomWidth: 1
    },
    button: {
        backgroundColor: colors.primary,
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 15,
        alignSelf: 'center',
        marginVertical: 10,
        width: "90%",
        alignItems: 'center',
        flexDirection: 'row',
        maxHeight: 50,
        justifyContent: "center",
        maxWidth: 500
    },
    buttonText: {
        ...normalTextStyle,
        color: colors.white,
        fontFamily: fonts.medium
    },
    loader: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1,
    },
    checkbox: {
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerIcon: {
        padding: 5,
        marginLeft: 20,
        borderRadius: 20,
        alignSelf: "flex-start",
        height: 35,
        width: 35,
        alignItems: "center",
        justifyContent: "center"
    },
    closeIcon: {
        padding: 5,
        alignSelf: "center",
        borderRadius: 20
    },
    loaderC: {
        padding: 10,
        borderRadius: 10
    },
    modalHeader: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
    },
    radioView: {
        height: 30,
        width: 30,
        padding: 2,
        borderWidth: 1,
        borderColor: colors.black,
        borderRadius: 20
    },
    radioValue: {
        flex: 1,
        backgroundColor: colors.black,
        borderRadius: 20
    }
})