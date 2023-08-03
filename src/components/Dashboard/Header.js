import { Alert, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../styles/colors';
import { shadows } from '../../styles/shadow';
import { adminBlockWiseRole, adminRole, noImage } from '../../constants/AppConst';
import { AppText, HeadingText } from '../../utility/TextUtility';
import { flexRow, fonts } from '../../styles/CommonStyling';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '../../route/RootNavigation';
import { userLogout } from '../../store/actions/UserAction';
import { roleTitle } from '../../constants/StaticData';



export const HomeHeader = () => {
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    // console.log("user: ", user);

    const logoutPress = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Logout",
                    onPress: () => dispatch(userLogout()),
                    style: "destructive"
                }
            ]
        );
        return;
    }

    const profilePress = () => {
        if (user?.role == adminRole) {
            return;
        }
        navigate("profile")
    }

    return (
        <View style={Platform.OS == "android" ? styles.homeHeader : [styles.homeHeader, styles.ios]}>
            <View style={styles.user}>
                <TouchableOpacity onPress={() => profilePress()}>
                    <Image source={{ uri: noImage }} style={styles.userImg} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <AppText text={user?.fullName} style={{ fontFamily: fonts.semiBold }} />
                    <AppText text={roleTitle[user?.role]} size={12} />
                </View>
            </View>
            {(user?.role == adminRole || user.role == adminBlockWiseRole) &&
                <TouchableOpacity style={{ padding: 10 }} onPress={() => logoutPress()}>
                    <HeadingText
                        text='Logout'
                        size={15}
                        color={colors.red}
                        style={{ fontFamily: fonts.semiBold }}
                    />
                </TouchableOpacity>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    homeHeader: {
        height: 50,
        backgroundColor: colors.skyBlue,
        // ...shadows[1],
        justifyContent: "center",
        paddingHorizontal: 10,
        // borderBottomWidth: 1,
        // borderBottomColor: colors.grey,
        ...flexRow
    },
    ios: {
        // height: 85,
        // justifyContent: "flex-end",
        // paddingBottom: 10
    },
    user: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1
        // backgroundColor: "red",
        // alignSelf: "flex-start"
    },
    userImg: {
        height: 35,
        width: 35,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: colors.primary,
        marginRight: 10
    }
});
