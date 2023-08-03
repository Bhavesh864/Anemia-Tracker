import React, { useEffect } from 'react'
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { flexRow, fonts, screenStyle } from '../../styles/CommonStyling'
import { AppText, HeadingText } from '../../utility/TextUtility'
import { colors } from '../../styles/colors'
import { useDispatch, useSelector } from 'react-redux'
import { noImage } from '../../constants/AppConst'
import { getuserProfileAction, userLogout } from '../../store/actions/UserAction'
import { navigate } from '../../route/RootNavigation'
import { GirlModerateHbSvg, GirlNormalHbSvg, GirlSevereHbSvg } from '../../assets/svg/AppSvgs'
import LinearGradient from 'react-native-linear-gradient'
import { defaultColorGradient } from '../../components/Dashboard/CardContainer'



const ProfileScreen = ({ navigation }) => {
    const user = useSelector(state => state.user?.user)
    const dispatch = useDispatch();
    const options = [
        { title: "Edit Profile", key: "editProfile" },
        { title: "Change Password", key: "changePassword" },
        { title: "Logout", key: "logout" },
    ]

    useEffect(() => {
        navigation.addListener("focus", () => {
            dispatch(getuserProfileAction());
        })
    }, []);

    const ListHeader = () => (
        <View>
            <LinearGradient colors={defaultColorGradient} style={styles.header}>
                <Image
                    source={{ uri: noImage }}
                    style={{ height: 80, width: 80, borderRadius: 50, margin: 10, borderWidth: 1, borderColor: colors.red }}
                />
                <HeadingText
                    text={user?.fullName}
                    style={{ padding: 5 }}
                />
                <AppText
                    text={user?.email}
                />
                <View style={{ ...flexRow }}>
                    <AppText
                        size={18}
                        style={{ paddingTop: 15, fontWeight: 'bold' }}
                        text={'Version:  '}
                    />
                    <AppText
                        size={17}
                        style={{ paddingTop: 15 }}
                        text={'1.1.10'}
                    />
                </View>
            </LinearGradient>

            <StudentsData />
        </View>
    )


    const StudentsData = ({ profile = user }) => {
        const arr = [
            {
                title: "NORMAL",
                value: profile?.normal,
                key: "normal",
                icon: <GirlNormalHbSvg />,
                color: "#8EAE1F88"
            },
            {
                title: "MODERATE 7-10",
                value: profile?.moderate,
                key: "moderate",
                icon: <GirlModerateHbSvg />,
                color: "#FFEDB1"
            },
            {
                title: "SEVERE 1-7",
                value: profile?.servere,
                key: "severe",
                icon: <GirlSevereHbSvg />,
                color: "#F2B1B2"
            }
        ];

        return (
            <View style={styles.dataCont}>
                {arr.map((item, index) => {
                    return (
                        <TouchableOpacity key={String(index)} style={[styles.data, { backgroundColor: item.color }]} onPress={() => navigate("studentList", { hbValuetype: item.key })}>
                            {item.icon}
                            <AppText
                                text={item.title}
                                size={11}
                                color={colors.red}
                                style={{ fontFamily: fonts.medium }}
                            />
                            <AppText
                                text={item.value}
                                style={{ marginTop: 0, fontFamily: fonts.semiBold }}
                            />
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }

    const onItemPress = (key) => {
        if (!key) {
            return;
        }

        if (key == "logout") {
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

        navigate(key);
    }

    return (
        <View style={screenStyle}>
            <FlatList
                data={options}
                ListHeaderComponent={() => <ListHeader />}
                keyExtractor={(a, b) => String(b)}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity style={styles.optn} onPress={() => onItemPress(item.key)}>
                            <HeadingText
                                text={item.title}
                                size={16}
                            />
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    optn: {
        padding: 20,
        borderBottomWidth: 0.5,
        borderColor: colors.off_white,
        marginHorizontal: 10,
        ...flexRow
    },
    header: {
        padding: 20,
        alignItems: "center",
        backgroundColor: "#F1F5E4",
    },
    dataCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20
    },
    data: {
        backgroundColor: colors.off_white,
        height: 100,
        width: 100,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.grey
    }
});

export default ProfileScreen;