import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { GirlModerateHbSvg, GirlNormalHbSvg, GirlSevereHbSvg } from '../../assets/svg/AppSvgs';
import { AnmSvgIcon, AshaSvgIcon, BloodShieldWithInjection, GirlIconSvg, PregnantLadySvg, TestTubeGroupSvgIcon, TestTubeSvg } from '../../assets/svg/BasicIcons';
import { AppConst } from '../../constants/AppConst';
import { navigate } from '../../route/RootNavigation';
import { colors } from '../../styles/colors';
import { flexRow, fonts } from '../../styles/CommonStyling';
import { screenWidth } from '../../styles/ResponsiveLayout';
import { AppText, HeadingText } from '../../utility/TextUtility';
import { defaultColorGradient } from './CardContainer';


const cardWidth = (screenWidth - (80)) / 3
const AdminDashContainer = ({ data }) => {

    const arr = [
        {
            title: "TOTAL",
            value: data?.total,
            key: "total"
        },
        {
            title: "SEVERE",
            value: data?.severe,
            key: "severe"
        },
        {
            title: "MODERATE",
            value: data?.moderate,
            key: "moderate"
        },
        {
            title: "NORMAL",
            value: data?.normal,
            key: "normal"
        },
        {
            title: "NO HB TEST",
            value: data?.noHbTest,
            key: "nohbtest"
        },
        {
            title: "TOTAL ASHA",
            value: data?.totalAsha,
            key: "asha"
        },
        {
            title: "TOTAL ANM",
            value: data?.totalAnm,
            key: "anm"
        },
        {
            title: "PCTS",
            value: data?.totalAnm,
            key: "anm"
        },
    ];


    const statusResult = [
        {
            title: "NORMAL",
            value: data?.normal,
            key: "normal",
            icon: <GirlNormalHbSvg />,
            color: "#8EAE1F88"
        },
        {
            title: "MODERATE",
            value: data?.moderate,
            key: "moderate",
            icon: <GirlModerateHbSvg />,
            color: "#FFEDB1"
        },
        {
            title: "SEVERE",
            value: data?.severe,
            key: "severe",
            icon: <GirlSevereHbSvg />,
            color: "#F2B1B2"
        }
    ];

    const testResult = [
        {
            title: "No HB Test",
            value: data?.noHbTest,
            key: "nohbtest",
            icon: <TestTubeGroupSvgIcon scale={0.8} />,
        },
        {
            title: "Due Treatment",
            value: data?.pendingTreatment,
            key: "pendingtreatment",
            icon: <BloodShieldWithInjection />,
        },
        {
            title: "Due Test",
            value: data?.pendingHBtest,
            key: "pendinghbtest",
            icon: <TestTubeSvg scale={0.7} />,
        }
    ];


    const testerArr = [
        {
            title: "Total ANM",
            value: data?.totalAnm,
            key: "anm",
            icon: <AnmSvgIcon scale={0.9} />,
        },
        {
            title: "Total ASHA",
            value: data?.totalAsha,
            key: "asha",
            icon: <AshaSvgIcon scale={0.9} />,
        }
    ]

    const pctsArr = [
        {
            title: "PCTS",
            value: data?.pctsRecord,
            icon: <PregnantLadySvg style={{ transform: [{ scale: 0.7 }] }} />,
            key: "pctsList"
        }
    ]



    const onOptionPress = (item) => {

        navigate("hospitalList", { type: { ...item, icon: null } });
    }



    // AppConst.showConsoleLog(cardWidth)

    return (
        <View style={{ flex: 1 }}>


            <TouchableOpacity style={styles.totalContainer} onPress={() => navigate("hospitalList", { type: { title: "TOTAL", value: data?.total, key: "total" } })}>
                <View style={{ backgroundColor: colors.lightYellow, borderRadius: 30, height: 40, width: 40, marginRight: 10, justifyContent: "center", alignItems: "center" }}>
                    <GirlIconSvg scale={0.5} />
                </View>
                <HeadingText
                    text='Total students'
                    size={16}
                    style={{ fontFamily: fonts.semiBold, flex: 1 }}
                />
                <HeadingText
                    text={data?.total}
                    size={16}
                    color={colors.red}
                    style={{ fontFamily: fonts.semiBold }}
                />
            </TouchableOpacity>

            <View>
                <HeadingText
                    text="HB Test Results"
                    style={styles.headingView}
                />
                <View style={styles.dataCont}>
                    {statusResult.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={String(index)}
                                style={[styles.data, { backgroundColor: item.color }]}
                                onPress={() => onOptionPress(item)}
                            >
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
            </View>

            <View>
                <HeadingText
                    text="HB Test Status"
                    style={styles.headingView}
                />
                <View style={styles.dataCont}>
                    {testResult.map((item, index) => {
                        return (
                            <LinearGradient
                                key={String(index)}
                                style={[styles.data, { backgroundColor: item.color }]}
                                colors={defaultColorGradient}
                            >
                                <TouchableOpacity
                                    onPress={() => onOptionPress(item)}
                                    style={{ alignItems: "center" }}
                                >
                                    {item.icon}
                                    <View style={[index == 2 ? { top: -7 } : null, { alignItems: "center" }]}>
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
                                    </View>
                                </TouchableOpacity>
                            </LinearGradient>
                        )
                    })}
                </View>
            </View>

            <View>
                <HeadingText
                    text="HB Testers"
                    style={styles.headingView}
                />
                <View style={[styles.dataCont, { justifyContent: "flex-start" }]}>
                    {testerArr.map((item, index) => {
                        return (
                            <LinearGradient
                                key={String(index)}
                                style={[styles.data, { marginLeft: index !== 0 ? 20 : 0 }]}
                                colors={defaultColorGradient}
                            >
                                <TouchableOpacity
                                    onPress={() => navigate("anmList", { anmAsha: item.key })}
                                    style={{ alignItems: "center" }}
                                >
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
                            </LinearGradient>
                        )
                    })}
                </View>
            </View>
            <View style={{ marginBottom: 20 }}>
                <HeadingText
                    text="PCTS Record"
                    style={styles.headingView}
                />
                <View style={[styles.dataCont, { justifyContent: "flex-start" }]}>
                    {pctsArr.map((item, index) => {
                        return (
                            <LinearGradient
                                key={String(index)}
                                style={[styles.data, { marginLeft: index !== 0 ? 20 : 0 }]}
                                colors={defaultColorGradient}
                            >
                                <TouchableOpacity
                                    onPress={() => navigate("pctsList", {})}
                                    style={{ alignItems: "center" }}
                                >
                                    {item.icon}
                                    <View style={{ top: -8, alignItems: "center" }}>
                                        <AppText
                                            text={item.title}
                                            size={11}
                                            color={colors.red}
                                            style={{ fontFamily: fonts.medium }}
                                        />
                                        {item?.value && <AppText
                                            text={item.value}
                                            style={{ marginTop: 0, fontFamily: fonts.semiBold }}
                                        />}
                                    </View>
                                </TouchableOpacity>
                            </LinearGradient>
                        )
                    })}
                </View>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    headingView: {
        paddingHorizontal: 20,
        backgroundColor: colors.white,
        paddingVertical: 10
    },
    item: {
        backgroundColor: colors.off_white,
        height: 80,
        width: (screenWidth - 60) / 2,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.grey,
        marginBottom: 15,
        maxWidth: 170
    },
    totalContainer: {
        padding: 15,
        margin: 20,
        backgroundColor: colors.white,
        ...flexRow,
        borderWidth: 1,
        borderColor: colors.grey,
        borderRadius: 10
    },
    data: {
        backgroundColor: colors.off_white,
        height: 110,
        width: cardWidth,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.grey,
        maxWidth: 110
    },
    dataCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20
    },
})

export default AdminDashContainer