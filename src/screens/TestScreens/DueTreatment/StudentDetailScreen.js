import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux';
import { GirlIconSvg } from '../../../assets/svg/BasicIcons';
import { Button, CustomBackButton } from '../../../components/Custom/CustomFields';
import HbTestHistory from '../../../components/Student/HbTestHistory';
import { adminRole, AppConst, getAge } from '../../../constants/AppConst';
import { getHbTestCondition, hbTestValue } from '../../../constants/OtherConst';
import { navigate } from '../../../route/RootNavigation';
import { getPendingHbTestStudents, getStudentDetail } from '../../../store/actions/TreatmentAction';
import { colors } from '../../../styles/colors';
import { flexRow, fonts, screenStyle } from '../../../styles/CommonStyling'
import { screenWidth } from '../../../styles/ResponsiveLayout';
import { AppText, HeadingText } from '../../../utility/TextUtility';


const StudentDetailScreen = ({ route, navigation }) => {
    const st = route.params?.st;
    const type = route.params?.type;
    const profile = useSelector(state => state.user.user);
    const [detail, setDetail] = useState(null);

    useEffect(() => {
        // console.log('object ====', st.student_id)
        navigation.addListener("focus", () => {
            // if (type == 'test1') {
            //     getPendingHbTestStudents()
            // } else {
            getStudentDetail(st.student_id).then(res => {
                // AppConst.showConsoleLog("student detail: ", res);
                if (res?.status) {
                    // console.log('res', res.data);
                    setDetail(res?.data);
                }
            })
            // }
        })
    }, [navigation]);

    useEffect(() => {
        if (detail) {
            navigation.setOptions({
                // header: () => <Header />,
                headerStyle: { backgroundColor: hbTestValue[getHbTestCondition(detail?.hb_value)].color }
            })
        }
    }, [navigation, detail]);
    AppConst.showConsoleLog("type: ", type);

    const Header = () => {
        if (!detail) {
            return null
        }
        let condition = hbTestValue[getHbTestCondition(detail?.hb_value)]
        AppConst.showConsoleLog(detail?.hb_value, condition)
        return (
            <View style={[styles.header, { backgroundColor: condition.color }]}>
                {/* <CustomBackButton /> */}
                <View style={{ alignItems: "center" }}>
                    <View style={{ backgroundColor: colors.white, borderRadius: 30, height: 55, width: 55, alignItems: "center" }}>
                        <GirlIconSvg scale={0.7} />
                    </View>
                    <AppText
                        text={st.name}
                        size={15}
                        style={{ fontFamily: fonts.semiBold, marginVertical: 5 }}
                    />
                    {<AppText
                        text={st.dob ? getAge(st.dob) + " years" : ""}
                        // size={15}
                        style={{}}
                    />}
                </View>
                {detail.hb_value && <HeadingText
                    text={condition.title + " - " + `${detail.hb_value}`}
                    style={{ textAlign: "center", top: 5, fontFamily: fonts.semiBold }}
                    size={16}
                    color={condition.fontColor}
                />}
            </View>
        )
    }


    // AppConst.showConsoleLog(":::", ((detail && detail.hb_test_id && detail.hbTestInfo?.length > 0 && detail.hbTestInfo[0].hb_value <= 10 && (profile && profile.role !== adminRole)) || type == "test"))

    if (!detail) {
        return <View style={screenStyle} />
    }
    return (
        <View style={screenStyle}>
            <ScrollView style={{ flex: 1 }}>
                <Header />
                <View style={{ margin: 20 }}>
                    <HeadingText
                        text='Basic detail'
                        size={16}
                        style={styles.headingTxt}
                    />
                    <View style={{ marginVertical: 10 }}>
                        <View style={styles.flexRow}>
                            <AppText
                                text={"School"}
                                style={styles.keyTxt}
                            />
                            <AppText
                                text={detail?.institute.name}
                                style={styles.valueTxt}
                            />
                        </View>
                        <View style={styles.flexRow}>
                            <AppText
                                text={"Guardian name"}
                                style={styles.keyTxt}
                            />
                            <AppText
                                text={detail?.guardian_name}
                                style={styles.valueTxt}
                            />
                        </View>
                        <View style={styles.flexRow}>
                            <AppText
                                text={"Block"}
                                style={styles.keyTxt}
                            />
                            <AppText
                                text={detail?.block.name}
                                style={styles.valueTxt}
                            />
                        </View>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <HeadingText
                            text='Treatment history'
                            size={16}
                            style={styles.headingTxt}
                        />
                        <View style={{ paddingVertical: 10, paddingBottom: 50 }}>
                            {detail &&
                                <HbTestHistory
                                    detail={detail}
                                />
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>

            {((detail && detail.hb_test_id && detail.hbTestInfo?.length > 0 && detail.hbTestInfo[0].hb_value <= 10 && (profile && profile.role !== adminRole))) ?
                ((detail?.hb_treatment_expiry_date && (new Date().getTime() >= new Date(moment(detail?.hb_treatment_expiry_date))?.getTime())) || type == "test") ?
                    <View style={{ width: "70%", alignSelf: "center", position: "absolute", bottom: 20 }}>
                        <Button
                            title='New HB Test'
                            onPress={() => {
                                console.log('name', detail?.institute)
                                navigate("newHbTest", { institute: detail?.institute, student: detail })
                            }}
                        />
                    </View> :
                    // detail.hbTestInfo?.length > 0 && detail.hbTestInfo[0].hb_value <= 10 ?
                    !detail.hbTestInfo[0].date_of_treatment ?
                        <View style={{ width: "70%", alignSelf: "center", position: "absolute", bottom: 20 }}>
                            <Button
                                title='New Treatment'
                                onPress={() => navigate("newTreatment", { detail: { ...detail, hbTest: detail.hbTestInfo[0] } })}
                            />
                        </View>
                        // :
                        // <View style={{ width: "70%", alignSelf: "center", position: "absolute", bottom: 20 }}>
                        //     <Button
                        //         title='New HB Test'
                        //         onPress={() => navigate("newTreatment", { detail: { ...detail, hbTest: detail.hbTestInfo[0] } })}
                        //     />
                        // </View>
                        : null
                : null
            }
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        height: 150,
        width: screenWidth,
        backgroundColor: "#F1F5E4",
        paddingVertical: 10,
        // paddingTop:
    },
    headingTxt: {
        paddingBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.grey,
        fontFamily: fonts.semiBold
    },
    keyTxt: {
        width: "42%",
        fontFamily: fonts.medium,
        fontSize: 14
    },
    valueTxt: {
        flex: 1,
        color: colors.darkGrey
    },
    flexRow: {
        marginVertical: 10,
        ...flexRow
    },
    testCard: {
        padding: 20,
        backgroundColor: colors.off_white, // "#D8D8D8", //colors.off_white,
        borderRadius: 20,
        marginBottom: 15
    }
})

export default StudentDetailScreen