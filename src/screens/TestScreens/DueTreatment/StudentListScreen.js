import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GirlIconSvg } from '../../../assets/svg/BasicIcons';
import AntDesign from "react-native-vector-icons/AntDesign";
import { InputField } from '../../../components/Custom/CustomFields';
import { AppConst } from '../../../constants/AppConst';
import { navigate } from '../../../route/RootNavigation';
import { getCriticalByStudents, getPendingHbTestStudents, getPendingTreatmentStudents, getStudentsByInst, getStudentsListByHbType, getUndertreatmentStudents } from '../../../store/actions/TreatmentAction';
import { colors } from '../../../styles/colors';
import { fonts, screenStyle } from '../../../styles/CommonStyling';
import { AppText, HeadingText } from '../../../utility/TextUtility';
import { criticalData, underTreatData } from './SelectDueTreatment';


const StudentListScreen = ({ route, navigation }) => {
    const inst = route?.params?.inst;
    const type = route?.params?.type;
    const hbValueType = route?.params?.hbValuetype;
    const [students, setStudents] = useState(null);
    const [search, setSearch] = useState("");
    const [lastIndex, setlastIndex] = useState(null);


    useEffect(() => {
        AppConst.showConsoleLog("Hb Value type--", inst);

        callApis();

    }, []);


    useEffect(() => {
        // console.log('inst', inst);
        navigation.setOptions({
            headerTitle: inst?.name ? inst.name : "Students"
        })
    }, [navigation])


    const callApis = (search = "", hbValue = 7) => {
        if (hbValueType) {
            studentsByHbType(search);
            return;
        }
        if (type == criticalData.key) {
            criticalFunc(7, search)
            return
        }
        else if (type == underTreatData.key) {
            undertreatmentFunc(search)
            return
        }
        else if (type == "treatment") {
            treatmentStudents(search)
            return;
        } else {
            testStudents(search)
        }

    }

    const studentsByHbType = (txt) => {
        getStudentsListByHbType(hbValueType, txt).then(res => {
            AppConst.showConsoleLog("hb value type func", res)
            responseFunc(res);
        })
    }

    const treatmentStudents = (txt = "") => {
        getPendingTreatmentStudents(inst.id, txt).then(res => {
            if (res?.status) {
                setStudents(res?.list)
            }
        })
    }


    const testStudents = (txt) => {
        AppConst.showConsoleLog("type--", inst?.id);

        getPendingHbTestStudents(inst?.id, txt).then(res => {
            if (res?.status) {
                setStudents(res?.list)
            }
        })
    }


    const criticalFunc = (hbValue = 7, search = "") => {
        getCriticalByStudents(inst.id, hbValue, search).then(res => {
            AppConst.showConsoleLog("critical func", res)
            responseFunc(res);
        })
    }

    // http://139.59.0.129:5432/v1/student/pendingHBTestsByInstitutesType?institute_type=school&limit=100
    // http://139.59.0.129:5432/v1/student/pendingHBTestsStudentsByInstitutesId?institute_id=339&search=

    const undertreatmentFunc = (search = "") => {
        getUndertreatmentStudents(inst.id, search).then(res => {
            AppConst.showConsoleLog("critical func", res)
            responseFunc(res);
        })
    }


    const responseFunc = res => {
        if (res?.status) {
            setStudents(res?.list)
        }
    }


    const searchAction = txt => {
        setSearch(txt);

        if (!txt) {
            callApis("")
        }
        if (txt.length > 1) {
            callApis(txt)
        }
    }

    const renderLoader = () => {
        if (!lastIndex) {
            return (
                < View style={styles.loaderStyle} >
                    <ActivityIndicator size={'large'} color={'#aaa'} />
                </ View>
            )
        } else {
            return <View></View>
        }
    }

    const loadMoreItem = () => {
        console.log('end reached');
        setlastIndex(true);
    }

    return (
        <View style={screenStyle}>
            {
                // type == underTreatData.key && 
                <View>
                    <InputField
                        placeholder='Search'
                        value={search}
                        onTextChange={searchAction}
                        showIcon={search?.length > 0 ? <AntDesign name='close' size={22} color={colors.black} onPress={() => searchAction("")} style={{ paddingHorizontal: 10 }} /> : null}
                        style={{ borderWidth: 1, borderColor: colors.grey, borderRadius: 10 }}
                    />
                </View>}
            <FlatList
                data={students ? students : []}
                keyExtractor={(i, j) => String(j)}
                ListFooterComponent={renderLoader}
                onEndReached={loadMoreItem}
                windowSize={3}
                // onEndReachedThreshold={0}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity style={styles.item} onPress={() => navigate("studentDetail", { st: item, type })}>
                            <View style={{ backgroundColor: colors.lightYellow, borderRadius: 30, height: 40, width: 40, marginRight: 10, justifyContent: "center", alignItems: "center" }}>
                                <GirlIconSvg scale={0.5} />
                            </View>
                            <View>
                                <HeadingText
                                    text={item.name}
                                    size={16}
                                    style={{ fontFamily: fonts.semiBold }}
                                />
                                <Text style={{ marginTop: 4 }}>
                                    <AppText
                                        text={"HB value: "}
                                        color={colors.darkGrey}
                                    />
                                    <AppText
                                        text={item.hb_value ? item.hb_value : "-"}
                                        style={{ fontFamily: fonts.medium }}
                                    />
                                </Text>
                                <Text style={{ marginTop: 4 }}>
                                    <AppText
                                        text={"Guardian Name: "}
                                        color={colors.darkGrey}
                                    />
                                    <AppText
                                        text={item.guardian_name ? item.guardian_name : "-"}
                                        style={{ fontFamily: fonts.medium }}
                                    />
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />

            {students?.length == 0 &&
                <HeadingText
                    text='No Data Found'
                    style={styles.noData}
                />
            }

        </View>
    )
}


const styles = StyleSheet.create({
    item: {
        padding: 20,
        marginHorizontal: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.darkGrey,
        flexDirection: "row",
        // marginVertical: 10,
        paddingHorizontal: 0
    },
    noData: {
        position: "absolute",
        top: "45%",
        alignSelf: "center"
    },
    loaderStyle: {
        marginVertical: 16,
        alignItems: 'center'
    }
});

export default StudentListScreen