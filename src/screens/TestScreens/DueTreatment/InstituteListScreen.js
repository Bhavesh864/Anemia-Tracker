import React, { useState } from 'react'
import { useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CollegeSvg, SchoolSvg } from '../../../assets/svg/BasicIcons';
import { InputField } from '../../../components/Custom/CustomFields';
import { instType } from '../../../components/Modals/InstituteListModal';
import ReportDownloadModal from '../../../components/Modals/ReportDownloadModal';
import { AppConst } from '../../../constants/AppConst';
import { downloadPermissionCheck } from '../../../constants/OtherConst';
import { navigate } from '../../../route/RootNavigation';
import { instituteReportUrl } from '../../../services/baseUrls';
import { getCriticalByInstitutes, getInstituteListByType, getPendingHbTestInstitutes, getPendingTreatmentInstitutes, getStudentsByInst, getUndertreatmentInstitutes } from '../../../store/actions/TreatmentAction';
import { colors } from '../../../styles/colors';
import { fonts, screenStyle } from '../../../styles/CommonStyling';
import { AppText, HeadingText } from '../../../utility/TextUtility';
import { criticalData, reportData, underTreatData } from './SelectDueTreatment';


const InstituteListScreen = ({ route, navigation }) => {
    const place = route?.params?.place;
    const type = route?.params?.type;
    const [activeType, setActiveType] = useState(instType[0].key);
    const [instituteList, setInstituteList] = useState(null);
    const [search, setSearch] = useState("");
    const [downloadAsk, setDownloadAsk] = useState(false);


    useEffect(() => {
        // console.log("place: ", type);
        navigation.setOptions({
            headerTitle: `${place.title} ${(type !== "treatment" && type !== "test") ? getTitle() : ("due " + type)}`
        });
    }, [navigation]);


    useEffect(() => {
        // console.log("type-", type)
        if (type == reportData.key) {
            criticalFunc(25);
            return
        }
        if (type == criticalData.key) {
            criticalFunc()
            return
        }
        if (type == underTreatData.key) {
            underTreatmentFunc();
            return
        }
        if (type == "treatment") {
            pendingTreatment();
            return
        }
        pendingTest();
    }, []);


    const getTitle = () => {
        switch (type) {
            case criticalData.key:
                return criticalData.title;
            case underTreatData.key:
                return underTreatData.title;
            default:
                return ""
        }
    }

    const pendingTest = () => {
        getPendingHbTestInstitutes(place.key).then(res => {
            AppConst.showConsoleLog('type', res?.list);
            if (res?.status) {
                setInstituteList(res.list);
            }
        });
    }


    const pendingTreatment = () => {
        getPendingTreatmentInstitutes(place.key).then(res => {
            // AppConst.showConsoleLog(type, res);
            if (res?.status) {
                setInstituteList(res.list);
            }
        });
    }


    const criticalFunc = (hbValue = 7) => {
        getCriticalByInstitutes(place.key, hbValue).then(res => {
            // console.log(JSON.stringify(res));
            responseFunc(res);
        })
    }

    const underTreatmentFunc = () => {
        getUndertreatmentInstitutes(place.key).then(res => {
            // console.log(JSON.stringify(res));
            responseFunc(res);
        })
    }

    const getAnmInstitutes = () => {
        getInstituteListByType(place.key, "", "").then(res => {
            responseFunc(res);
        })
    }


    const responseFunc = (res) => {
        // AppConst.showConsoleLog(type, res);
        if (res?.status) {
            setInstituteList(res.list);
        }
    }

    const searchAction = txt => {
        setSearch(txt);

        if (!txt) {
            pendingTest("");
        }

        if (txt.length > 2) {
            pendingTest(txt)
            return
        }
    }


    const onInstPress = (institute) => {
        if (type == reportData.key) {
            setDownloadAsk(institute);
            return;
        }
        navigate("studentList", { inst: institute, type })
    }



    // AppConst.showConsoleLog("instituteList?.length", place)

    return (
        <View style={screenStyle}>
            {/* <InputField
                placeholder='Search'
                value={search}
                onTextChange={txt => searchAction(txt)}
                style={{ borderWidth: 1, borderColor: colors.grey, borderRadius: 10 }}
            /> */}

            {/* <View style={styles.typeCont}>
                {instType.map((item, index) => (
                    <TouchableOpacity
                        key={String(index)}
                        style={[styles.type, activeType == item.key ? { borderBottomWidth: 2 } : null]}
                        onPress={() => onTypeChange(item.key)}
                    >
                        <AppText
                            text={item.name}
                            style={[styles.typeTxt, activeType == item.key ? { fontFamily: fonts.semiBold } : null]}
                        />
                    </TouchableOpacity>
                ))
                }
            </View> */}
            <FlatList
                data={instituteList ? instituteList : []}
                keyExtractor={(i, ind) => String(ind)}
                renderItem={({ item, index }) => {
                    console.log('item', item)
                    let institute = item.institute ? item.institute : item;
                    return (
                        <TouchableOpacity style={styles.item} onPress={() => onInstPress(institute)}>
                            <View style={{ backgroundColor: colors.lightYellow, borderRadius: 30, height: 40, width: 40, marginRight: 10 }}>
                                {place.key == "school" ?
                                    <SchoolSvg scale={0.5} style={{ right: 6, bottom: 5 }} />
                                    :
                                    <CollegeSvg scale={0.5} style={{ right: 5, bottom: 12 }} />
                                }
                            </View>
                            <View style={{ flex: 1 }}>
                                <HeadingText
                                    text={institute.name}
                                    size={14}
                                    style={{ fontFamily: fonts.semiBold }}
                                />
                                {item.totalStudents && <Text style={{ marginTop: 4 }}>
                                    <AppText
                                        text={"Pending Students: "}
                                        color={colors.darkGrey}
                                    />
                                    <AppText
                                        text={item.totalStudents}
                                        style={{ fontFamily: fonts.medium }}
                                    />
                                </Text>}
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />

            {instituteList?.length == 0 &&
                <HeadingText
                    text='No Data Found'
                    style={styles.noData}
                />
            }

            {downloadAsk &&
                <ReportDownloadModal
                    onClose={() => setDownloadAsk(false)}
                    institute={downloadAsk}
                />
            }
        </View>
    )
}


const styles = StyleSheet.create({
    item: {
        padding: 20,
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.darkGrey,
        flexDirection: "row",
        // marginVertical: 10,
        paddingHorizontal: 0
    },
    noData: {
        position: "absolute",
        top: "45%",
        alignSelf: "center"
    }
});

export default InstituteListScreen;