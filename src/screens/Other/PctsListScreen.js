import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { fonts, screenStyle } from '../../styles/CommonStyling';
import { colors } from '../../styles/colors';
import { pctsTypesArr } from '../../constants/StaticData';
import { AppText, HeadingText } from '../../utility/TextUtility';
import { getPctsListAction, getPctsListByMinMaxAction, getPendingPctsHbTest, getPendingPctsTreatment } from '../../store/actions/TreatmentAction';
import { AppConst } from '../../constants/AppConst';
import { screenWidth } from '../../styles/ResponsiveLayout';
import { navigate } from '../../route/RootNavigation';
import { InputField } from '../../components/Custom/CustomFields';
import AntDesign from 'react-native-vector-icons/AntDesign';


const PctsListScreen = ({ route, navigation }) => {
    const paramData = route?.params;
    const ref = useRef();
    const [activeType, setActiveType] = useState('moderate');
    // const [healthyList, setHealthyList] = useState(null);
    // const [moderateList, setModerateList] = useState(null);
    // const [severeList, setSevereList] = useState(null);
    const [pctsList, setPctsList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");


    useEffect(() => {
        // if (paramData?.type) {
        //     AppConst.showConsoleLog("params: ", paramData);

        //     getPendingList();
        // } else {
        // getModerateList(true).then(() => {
        //     getHealtyList().then(() => getSevereList());
        // });
        getPcstsList(true);
        // }
    }, []);

    // AppConst.showConsoleLog("param data: ", paramData);


    const getPendingList = async () => {
        let res = null;
        if (paramData.type == "treatment") {
            navigation.setOptions({
                headerTitle: "Due PCTS Treatment"
            })
            res = await getPendingPctsTreatment();
        } else {
            navigation.setOptions({
                headerTitle: "Due PCTS Test"
            })
            res = await getPendingPctsHbTest();
        }
        AppConst.showConsoleLog("pending res: ", res)
        if (res?.status) {
            setPctsList(res?.list);
        }
    }


    const getPcstsList = async (load = false) => {
        // getPctsListByMinMaxAction(load, search).then(res => {
        //     setLoading(false)
        //     //console.log('res', JSON.stringify(res?.list?.rows));
        //     if (res?.status) {
        //         setPctsList(res?.list?.rows);
        //     }
        //     return res;
        // })
        console.log('paramdatype',paramData.type);
        if (paramData.type == "treatment") {
            getPendingPctsTreatment(0).then(res => {
                setLoading(false)
                //console.log('result', JSON.stringify(res));
                if (res?.status) {
                    setPctsList(res?.list);
                }
                return res;
            })
        } else if (paramData.type == "test") {
            getPendingPctsHbTest(0).then(res => {
                setLoading(false)
                //console.log('result', JSON.stringify(res));
                if (res?.status) {
                    setPctsList(res?.list);
                }
                return res;
            })
        } else {
            getPctsListByMinMaxAction(load, search).then(res => {
                setLoading(false)
                //console.log('res', JSON.stringify(res?.list?.rows));
                if (res?.status) {
                    setPctsList(res?.list?.rows);
                }
                return res;
            })
        }
    }

    const getHbValue = (item) => {
        let key = "ANC" + item?.CountofANCServices + "HBLevel";
        return item[key];
    }

    // const getActiveArr = () => {
    //     switch (activeType) {
    //         case "moderate":
    //             return moderateList?.rows ? moderateList.rows : moderateList
    //         case "healthy":
    //             return healthyList?.rows ? healthyList.rows : healthyList
    //         case "severe":
    //             return severeList?.rows ? severeList.rows : severeList
    //         default:
    //             return [];
    //     }
    // }

    const scrollEndEvent = () => {
        // alert("Helloo!!")
        if (loading) {
            return;
        }
        if (paramData) {
            return;
        }
        switch (activeType) {
            case "moderate":
                getPcstsList(true);
                break;
            case "healthy":
                getHealtyList(true);
                break;
            case "severe":
                getSevereList(true);
                break;
            default:
                getPcstsList(true);
                return;
        }
    }

    // //console.log('object', getActiveArr().length);

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };


    const apiCall = (txt) => {
        getPctsListByMinMaxAction(true, txt).then(res => {
            AppConst.showConsoleLog(res?.list?.length);
            if (res?.status) {
                setPctsList(res?.list?.rows)
            }
        })
    }

    const searchAction = txt => {
        setSearch(txt);
        if (!txt) {
            apiCall("")
        }
        if (txt.length > 1) {
            apiCall(txt)
        }
    }

    //console.log('list', pctsList);

    return (
        <View style={screenStyle}>
            {/* {(!paramData?.type) && <View style={styles.typeCont}>
                {pctsTypesArr.map((item, index) => (
                    <TouchableOpacity
                        key={String(index)}
                        style={[styles.type, activeType == item.key ? { borderBottomWidth: 2 } : null, { borderLeftWidth: index == 0 ? 0 : 0.5 }]}
                        onPress={() => onTypeChange(item.key)}
                    >
                        <AppText
                            text={item.title}
                            style={[styles.typeTxt, activeType == item.key ? { fontFamily: fonts.semiBold } : null]}
                            color={activeType == item.key ? colors.red : colors.black}
                        />
                    </TouchableOpacity>
                ))
                }
            </View>} */}

            <View>
                <InputField
                    placeholder='Search'
                    value={search}
                    onTextChange={(text) => searchAction(text)}
                    showIcon={search?.length > 0 ? <AntDesign name='close' size={22} color={colors.black} onPress={() => searchAction("")} style={{ paddingHorizontal: 10 }} /> : null}
                    style={{ borderWidth: 1, borderColor: colors.grey, borderRadius: 10 }}
                />
            </View>

            {pctsList?.length != 0 ? <FlatList
                ref={ref}
                data={pctsList}
                keyExtractor={(a, b) => String(b)}
                contentContainerStyle={{ padding: 20 }}
                onMomentumScrollEnd={({ nativeEvent }) => {
                    // AppConst.showConsoleLog("n e: ", nativeEvent)
                    if (isCloseToBottom(nativeEvent)) {
                        scrollEndEvent()
                    }
                    return;
                }}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity style={styles.item} activeOpacity={0.8} onPress={() => navigate("pctsDetail", { ...item })}>
                            <View>

                            </View>
                            <View>
                                <HeadingText
                                    text={item?.Name}
                                    size={16}
                                />
                                <AppText
                                    text={"PCTSID: " + (item?.PCTSID ? item?.PCTSID : "-")}
                                    style={{ marginVertical: 2 }}
                                />
                                <AppText
                                    text={"HB Value: " + (getHbValue(item) ? getHbValue(item) : "-")}
                                />
                            </View>
                        </TouchableOpacity>
                    )
                }}
            /> : <AppText text='No Data!' style={{ marginVertical: 70, textAlign: 'center' }} />}

            {loading &&
                <View style={styles.loader}>
                    <ActivityIndicator size={"large"} color={colors.black} />
                </View>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    typeCont: {
        backgroundColor: colors.off_white,
        flexDirection: "row",
        height: 50,
        paddingHorizontal: 10,
    },
    type: {
        width: screenWidth / 3,
        alignItems: "center",
        height: 50,
        justifyContent: "center",
        borderColor: colors.grey,
        borderBottomColor: colors.red
    },
    typeTxt: {
        fontFamily: fonts.medium,
        fontSize: 16
    },
    item: {
        padding: 20,
        backgroundColor: colors.white,
        marginBottom: 10,
        borderRadius: 10
    },
    loader: {
        position: "absolute",
        bottom: 20,
        alignSelf: "center"
    }
});

export default PctsListScreen