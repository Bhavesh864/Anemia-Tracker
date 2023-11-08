import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { fonts, screenStyle } from '../../styles/CommonStyling'
import { AnemiaMuktSvg } from '../../assets/svg/AppSvgs'
import { AppText, HeadingText } from '../../utility/TextUtility'
import { Button, InputField } from '../../components/Custom/CustomFields'
import { useDispatch } from 'react-redux'
import { ChangeAppStatus } from '../../store/actions/AppAction'
import { userLogin } from '../../store/actions/UserAction'
import { AppConst, BaseValidation } from '../../constants/AppConst'



const LoginScreen = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isPhone, setIsPhone] = useState(false);



    const onLoginPress = () => {
        if (!email.trim() || !password.trim()) {
            let err = !email.trim() ? errorTypes.emailReq : errorTypes.passReq
            setError(err)
            return;
        }

        if (password.trim().length < 6) {
            setError(errorTypes.passLength);
            return
        }

        if (!isPhone && !BaseValidation.email.test(email)) {
            setError(errorTypes.emailInvalid)
            return;
        }

        if (error) {
            setError(null);
        }
        dispatch(userLogin(email.trim(), password, isPhone ? "phone" : "email"));
    }


    const check_text = text => {
        setEmail(text);

        if (text.trim().length > 2) {
            return;
        }
        if (
            text.startsWith(1) ||
            text.startsWith(2) ||
            text.startsWith(3) ||
            text.startsWith(4) ||
            text.startsWith(5) ||
            text.startsWith(6) ||
            text.startsWith(7) ||
            text.startsWith(8) ||
            text.startsWith(9) ||
            text.startsWith(0)
        ) {
            setIsPhone(true);
        } else {
            setIsPhone(false);
        }
    };

    return (
        <View style={screenStyle}>
            <ScrollView style={screenStyle}>
                <View style={{ marginVertical: 40 }}>
                    <View style={{ alignItems: "center" }}>
                        {/* <AnemiaMuktSvg scale={0.7} /> */}
                        <Image source={require("../../assets/images/login-icon.png")} style={{ height: 150, width: 200, resizeMode: "contain", }} />
                    </View>
                    <HeadingText
                        text="Sign in with your ANM account"
                        style={{ textAlign: "center", fontFamily: fonts.semiBold, }}
                    />
                </View>
                <View style={{ flex: 1, }}>
                    <View style={{ marginVertical: "5%" }}>
                        <View style={{ marginBottom: 20 }}>
                            <HeadingText
                                text='Email address / Phone number'
                                style={{ marginHorizontal: 20 }}
                                size={16}
                            />
                            <InputField
                                placeholder='Enter email or phone'
                                value={email}
                                onTextChange={check_text}
                                keyboardType="email-address"
                                error={error && error.type == "email" ? error.error : null}
                                onFocus={() => {
                                    if (error && error.type == "email") {
                                        setError(null);
                                    }
                                }}
                            />
                        </View>
                        <View>
                            <HeadingText
                                text='Password'
                                style={{ marginHorizontal: 20 }}
                                size={16}
                            />
                            <InputField
                                placeholder='Password'
                                value={password}
                                onTextChange={setPassword}
                                password={true}
                                error={error && error.type == "password" ? error.error : null}
                                onFocus={() => {
                                    if (error && error.type == "password") {
                                        setError(null);
                                    }
                                }}
                            />
                        </View>

                        {/* <View style={{ marginVertical: 20, alignSelf: "center" }}>
                            <AppText
                                text='Forgot Password'
                            />
                        </View> */}
                    </View>
                </View>
            </ScrollView>
            <View style={{ margin: 20, marginTop: 0 }}>
                <Button
                    title='Sign in'
                    onPress={() => onLoginPress()}
                />
            </View>
        </View>
    )
}


const errorTypes = {
    emailReq: {
        type: "email",
        error: "Email is required"
    },
    emailInvalid: {
        type: "email",
        error: "Invalid email address"
    },
    passReq: {
        type: "password",
        error: "Password is required"
    },
    passLength: {
        type: "password",
        error: "Minimum password length is 6"
    },
    passInvalid: {
        type: "password",
        error: "Wrong password"
    },
}

export default LoginScreen

const styles = StyleSheet.create({})