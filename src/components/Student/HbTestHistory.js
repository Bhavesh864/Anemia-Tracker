import moment from 'moment'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../../styles/colors'
import { flexRow, fonts } from '../../styles/CommonStyling'
import { AppText, HeadingText } from '../../utility/TextUtility'
import { Button } from '../Custom/CustomFields'
import { navigate } from '../../route/RootNavigation'


const HbTestHistory = ({ detail }) => {
    const [activeTab, setActiveTab] = useState([]);

    const TestView = ({ item }) => {
        return (
            <View style={{ padding: 20 }}>
                <View style={styles.flexRow}>
                    <AppText
                        text='Test result'
                        style={styles.keyTxt}
                    />
                    <AppText
                        text='-'
                        style={styles.dash}
                    />
                    <AppText
                        text={item.hb_value}
                        style={styles.valueTxt}
                    />
                </View>
                <View style={styles.flexRow}>
                    <AppText
                        text='Test date'
                        style={styles.keyTxt}
                    />
                    <AppText
                        text='-'
                        style={styles.dash}
                    />
                    <AppText
                        text={moment(item.hb_test_date).format("DD-MM-YYYY")}
                        style={styles.valueTxt}
                    />
                </View>
            </View>
        )
    }


    const TreatmentView = ({ item, detail, index }) => {
        return (
            item.date_of_treatment ? <View style={{ padding: 20 }}>
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
                        {item.medicines.map((it, ind) => {
                            return (
                                <View key={String(ind)} style={{ marginVertical: 5 }}>
                                    <AppText
                                        text={it.name}
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
                        {item.is_pregnant == "1" && <AppText
                            text={"Pregnant"}
                            style={{ marginVertical: 5 }}
                        />}
                        {item.is_lactating_mother == "1" && <AppText
                            text={"Lactating mother"}
                            style={{ marginVertical: 5 }}
                        />}
                        {item.is_animatic == "1" && <AppText
                            text={"Animatic"}
                            style={{ marginVertical: 5 }}
                        />}
                        {item.malnutrition == "1" && <AppText
                            text={"Malnutrition"}
                            style={{ marginVertical: 5 }}
                        />}

                        {item.is_pregnant == "0" && item.is_lactating_mother == "0" && item.is_animatic == "0" && item.malnutrition == "0" &&
                            <AppText
                                text={"No Diseases"}
                                style={{ marginVertical: 2 }}
                            />
                        }
                    </View>
                </View>
            </View> : <Button
                title='New Treatment'
                onPress={() => navigate("newTreatment", { detail: { ...detail, hbTest: detail.hbTestInfo[index] }, hbTestDate: item.hb_test_date })}
                style={{ width: '60%' }}
            />
        )
    }

    return (
        <View style={{ flex: 1 }}>
            {detail && detail.hbTestInfo?.map((item, index) => {
                //console.log('item.hb_value', item.hb_value)
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
                                style={[styles.optn, !activeTab.includes(item.id) ? { borderBottomWidth: 2 } : null, { width: item.hb_value < 11 ? "50%" : "100%" }]}
                            >
                                <HeadingText
                                    text='HB Test'
                                    size={16}
                                    style={{ textAlign: "center" }}
                                />
                            </TouchableOpacity>
                            {/* {item.date_of_treatment ? */}
                            {item.hb_value < 11 ? <TouchableOpacity
                                onPress={() => activeTab.includes(item.id) ? null : setActiveTab([...activeTab, item.id])}
                                style={[styles.optn, activeTab.includes(item.id) ? { borderBottomWidth: 2 } : null]}
                            >
                                <HeadingText
                                    text='Treatment'
                                    size={16}
                                    style={{ textAlign: "center", color: item.date_of_treatment ? null : colors.primary }}
                                />
                            </TouchableOpacity> : <View></View>}
                            {/* : <TouchableOpacity
                                    onPress={() => activeTab.includes(item.id) ? null : setActiveTab([...activeTab, item.id])}
                                    style={[styles.optn, activeTab.includes(item.id) ? { borderBottomWidth: 2 } : null]}
                                >
                                    <HeadingText
                                        text='Treatment'
                                        size={16}
                                        style={{ textAlign: "center", color: colors.primary }}
                                    />
                                </TouchableOpacity> */}
                            {/* } */}
                        </View>

                        {!activeTab.includes(item.id) ?
                            <TestView item={item} />
                            :
                            <TreatmentView item={item} detail={detail} index={index} />

                        }

                    </View>
                )
            })}

            {detail && detail.hbTestInfo?.length == 0 &&
                <HeadingText
                    text='No treatment'
                    style={{ alignSelf: "center", marginTop: "10%" }}
                />
            }
        </View>
    )
}


const styles = StyleSheet.create({
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
    keyTxt: {
        width: "40%",
    },
    valueTxt: {
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
        marginBottom: 15
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
    }
})

export default HbTestHistory