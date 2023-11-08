import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { flexRow, fonts, screenStyle } from '../../styles/CommonStyling'
import { getPctsDetailAction } from '../../store/actions/TreatmentAction';
import { AppConst } from '../../constants/AppConst';
import { colors } from '../../styles/colors';
import { AppText, HeadingText } from '../../utility/TextUtility';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';
import { Button } from '../../components/Custom/CustomFields';
import { navigate } from '../../route/RootNavigation';


const PctsDetailScreen = ({ route, navigation }) => {
    const paramData = route?.params;
    const [pctsDetail, setPctsDetail] = useState({ ...paramData });


    useEffect(() => {
        navigation.addListener("focus", () => {
            getDetail()
        })
    }, [navigation]);

    function getDetail() {
        getPctsDetailAction(paramData.id).then(res => {
            AppConst.showConsoleLog("res: ", res);
            if (res?.status) {
                setPctsDetail({ ...paramData, hbTestHistory: res?.data });
            }
        })
    }

    // AppConst.showConsoleLog("exp: ", (moment().isSameOrAfter(null) && pctsDetail?.hbTestHistory?.length > 0));
    // AppConst.showConsoleLog(!pctsDetail?.hb_treatment_expiry_date)
    // AppConst.showConsoleLog((moment().isSameOrAfter(pctsDetail?.hb_treatment_expiry_date)));
    AppConst.showConsoleLog(pctsDetail?.hbTestHistory);


    return (
        <View style={screenStyle}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ margin: 20, flex: 1 }}>
                        <View style={{}}>
                            <View style={styles.flexRow}>
                                <AppText
                                    text={"Name"}
                                    style={styles.keyTxt}
                                />
                                <AppText
                                    text={pctsDetail?.Name}
                                    style={styles.valueTxt}
                                />
                            </View>
                            {pctsDetail?.HusbandName ? <View style={styles.flexRow}>
                                <AppText
                                    text={"Husband name"}
                                    style={styles.keyTxt}
                                />
                                <AppText
                                    text={pctsDetail?.HusbandName}
                                    style={styles.valueTxt}
                                />
                            </View> : null}
                            {pctsDetail?.FatherName ? <View style={styles.flexRow}>
                                <AppText
                                    text={"Father name"}
                                    style={styles.keyTxt}
                                />
                                <AppText
                                    text={pctsDetail?.FatherName}
                                    style={styles.valueTxt}
                                />
                            </View> : null}
                            <View style={styles.flexRow}>
                                <AppText
                                    text={"Mobile Number"}
                                    style={styles.keyTxt}
                                />
                                <AppText
                                    text={pctsDetail?.Mobileno}
                                    style={styles.valueTxt}
                                />
                            </View>
                            <View style={styles.flexRow}>
                                <AppText
                                    text={"LMP Date"}
                                    style={styles.keyTxt}
                                />
                                <AppText
                                    text={pctsDetail?.LMP_Date}
                                    style={styles.valueTxt}
                                />
                            </View>
                            <View style={styles.flexRow}>
                                <AppText
                                    text={"Health Centre"}
                                    style={styles.keyTxt}
                                />
                                <AppText
                                    text={pctsDetail?.chcphc}
                                    style={styles.valueTxt}
                                />
                            </View>
                            <View style={styles.flexRow}>
                                <AppText
                                    text={"Address"}
                                    style={styles.keyTxt}
                                />
                                <AppText
                                    text={pctsDetail?.Village}
                                    style={styles.valueTxt}
                                />
                            </View>
                            <View style={styles.flexRow}>
                                <AppText
                                    text={"Pcts Id"}
                                    style={styles.keyTxt}
                                />
                                <AppText
                                    text={pctsDetail?.PCTSID}
                                    style={styles.valueTxt}
                                />
                            </View>
                            {pctsDetail?.ANC1HBLevel && <View style={styles.flexRow}>
                                <AppText
                                    text={"ANC 1"}
                                    style={styles.keyTxt}
                                />
                                <AppText
                                    text={pctsDetail?.ANC1HBLevel}
                                    style={styles.valueTxt}
                                />
                            </View>}
                            {pctsDetail?.ANC2HBLevel && <View style={styles.flexRow}>
                                <AppText
                                    text={"ANC 2"}
                                    style={styles.keyTxt}
                                />
                                <AppText
                                    text={pctsDetail?.ANC2HBLevel}
                                    style={styles.valueTxt}
                                />
                            </View>}
                            {pctsDetail?.ANC3HBLevel && <View style={styles.flexRow}>
                                <AppText
                                    text={"ANC 3"}
                                    style={styles.keyTxt}
                                />
                                <AppText
                                    text={pctsDetail?.ANC3HBLevel}
                                    style={styles.valueTxt}
                                />
                            </View>}
                            {pctsDetail?.ANC4HBLevel && <View style={styles.flexRow}>
                                <AppText
                                    text={"ANC 4"}
                                    style={styles.keyTxt}
                                />
                                <AppText
                                    text={pctsDetail?.ANC4HBLevel}
                                    style={styles.valueTxt}
                                />
                            </View>}
                            <View style={styles.flexRow}>
                                <AppText
                                    text={`${pctsDetail?.DeliveryDate ? "Expected " : "Expected "}Delivery Date`}
                                    style={styles.keyTxt}
                                />
                                <AppText
                                    text={pctsDetail?.DeliveryDate ? pctsDetail?.DeliveryDate : pctsDetail?.ExpectedDeliveryDate}
                                    style={styles.valueTxt}
                                />
                            </View>
                        </View>

                        <View style={{ marginTop: 20, flex: 1, marginBottom: 60 }}>
                            <HeadingText
                                text='Treatment history'
                                size={16}
                                style={styles.headingTxt}
                            />
                            <View style={{ paddingBottom: 60 }}>
                                {pctsDetail?.hbTestHistory &&
                                    <HbTestList
                                        list={pctsDetail?.hbTestHistory}
                                    />
                                }
                            </View>
                        </View>

                    </View>
                </View>
            </ScrollView>

            {/* {!pctsDetail?.hb_treatment_expiry_date ? */}

            {((moment().isSameOrAfter(pctsDetail?.hb_treatment_expiry_date) || !pctsDetail?.hb_treatment_expiry_date) && (!pctsDetail?.hbTestHistory?.length > 0)) ?
                <View View style={styles.floatView}>
                    <Button
                        title='New Treatment'
                        onPress={() => {
                            navigate("newTreatment", { detail: { ...paramData, hbTest: pctsDetail?.hbTestHistory[0], isPcts: true } });

                        }}
                    />
                </View>
                :
                (
                    (!pctsDetail?.hbTestInfo) ?
                        <View style={styles.floatView}>
                            <Button
                                title='New Hb Test'
                                onPress={() => {
                                    navigate("newHbTest", { title: 'pcts', key: 'PCTS', pctsName: pctsDetail?.Name, pctsDetail: { pctsDetail } })
                                }}
                            />
                        </View>
                        : null
                )
            }

        </View >
    )
}


const HbTestList = ({ list = [] }) => {

    const [activeTab, setActiveTab] = useState([]);


    const TestView = ({ item }) => {
        return (
            <View style={{ padding: 20 }}>
                <View style={styles.flexRow}>
                    <AppText
                        text='Test result'
                        style={styles.keyTestTxt}
                    />
                    <AppText
                        text='-'
                        style={styles.dash}
                    />
                    <AppText
                        text={item.hb_value}
                        style={styles.valueTestTxt}
                    />
                </View>
                <View style={styles.flexRow}>
                    <AppText
                        text='Test date'
                        style={styles.keyTestTxt}
                    />
                    <AppText
                        text='-'
                        style={styles.dash}
                    />
                    <AppText
                        text={moment(item.hb_test_date).format("DD-MM-YYYY")}
                        style={styles.valueTestTxt}
                    />
                </View>
            </View>
        )
    }


    const TreatmentView = ({ item }) => {
        return (
            <View style={{ padding: 20 }}>
                <View style={{ marginBottom: 10 }}>
                    <AppText
                        text='Treatment Date'
                        style={{ fontFamily: fonts.semiBold, fontSize: 15 }}
                    />
                    <View style={{ marginVertical: 10 }}>
                        <AppText
                            text={moment(item.date_of_treatment).format("DD-MM-YYYY")}
                            style={{ fontSize: 15 }}
                        />
                    </View>
                </View>
                <View>
                    <AppText
                        text='Medicine'
                        style={{ fontFamily: fonts.semiBold, fontSize: 15 }}
                    />
                    <View style={{ marginVertical: 10 }}>
                        {item.medicine_pctsHbtests?.map((it, ind) => {
                            return (
                                <View key={String(ind)} style={{ marginVertical: 5 }}>
                                    <AppText
                                        text={it?.medicine?.name}
                                    />
                                </View>
                            )
                        })}
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <AppText
                        text='Diseases'
                        style={{ fontFamily: fonts.semiBold, fontSize: 15 }}
                    />
                    <View style={{ marginVertical: 10 }}>
                        {item.is_pregnant && <AppText
                            text={"Pregnant"}
                            style={{ marginVertical: 5 }}
                        />}
                        {item.is_lactating_mother && <AppText
                            text={"Lactating mother"}
                            style={{ marginVertical: 5 }}
                        />}
                        {item.is_animatic && <AppText
                            text={"Animatic"}
                            style={{ marginVertical: 5 }}
                        />}
                        {item.malnutrition && <AppText
                            text={"Malnutrition"}
                            style={{ marginVertical: 5 }}
                        />}

                        {!item.is_pregnant && !item.is_lactating_mother && !item.is_animatic && !item.malnutrition &&
                            <AppText
                                text={"No Diseases"}
                                style={{ marginVertical: 2 }}
                            />
                        }
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={{}}>
            {list && list?.map((item, index) => {
                return (
                    <View key={String(index)} style={styles.testCard}>
                        <View style={{ height: 55, paddingHorizontal: 20, justifyContent: "center" }}>
                            <HeadingText
                                text={moment(item.hb_test_date).format("DD-MM-YYYY")}
                                size={16}
                                style={{ fontFamily: fonts.semiBold }}
                            />
                        </View>
                        <View style={styles.optnsView}>
                            <TouchableOpacity
                                onPress={() => setActiveTab(activeTab.filter(i => i !== item.id))}
                                style={[styles.optn, !activeTab.includes(item.id) ? { borderBottomWidth: 2 } : null, { width: item.date_of_treatment ? "50%" : "100%" }]}
                            >
                                <HeadingText
                                    text='HB Test'
                                    size={16}
                                    style={{ textAlign: "center" }}
                                />
                            </TouchableOpacity>
                            {item.date_of_treatment ?
                                <TouchableOpacity
                                    onPress={() => activeTab.includes(item.id) ? null : setActiveTab([...activeTab, item.id])}
                                    style={[styles.optn, activeTab.includes(item.id) ? { borderBottomWidth: 2 } : null]}
                                >
                                    <HeadingText
                                        text='Treatment'
                                        size={16}
                                        style={{ textAlign: "center" }}
                                    />
                                </TouchableOpacity>
                                : null
                            }
                        </View>

                        {!activeTab.includes(item.id) ?
                            <TestView item={item} />
                            :
                            <TreatmentView item={item} />
                        }

                    </View>
                )
            })}

            {list?.length == 0 &&
                <HeadingText
                    text='No treatment'
                    color={colors.grey}
                    style={{ alignSelf: "center", marginTop: "45%" }}
                />
            }
        </View>
    )
}


const styles = StyleSheet.create({
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
        color: colors.darkGrey,
        marginLeft: 10
    },
    flexRow: {
        marginVertical: 10,
        flexDirection: "row"
    },

    keyTestTxt: {
        width: "40%",
    },
    valueTestTxt: {
        width: "40%",
    },
    dash: {
        width: "15%"
    },
    flexRow: {
        marginVertical: 10,
        ...flexRow
    },
    testCard: {
        // padding: 20,
        backgroundColor: colors.white, //"#DDF3FF", // "#D8D8D8", //
        borderRadius: 20,
        marginBottom: 15,
        // height: 100
    },
    optnsView: {
        backgroundColor: colors.lightGrey,
        paddingHorizontal: 20,
        flexDirection: "row",
        height: 50,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.grey
    },
    optn: {
        height: 50,
        justifyContent: "center",
        width: "50%",
        borderColor: colors.red
    },
    floatView: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20
    }
})

export default PctsDetailScreen