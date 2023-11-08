import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign";
import { getAllAnmAshaByType, getAnmByHospital } from '../../store/actions/TreatmentAction';
import { screenStyle } from '../../styles/CommonStyling';
import { InputField } from '../../components/Custom/CustomFields';
import { colors } from '../../styles/colors';
import { navigate } from '../../route/RootNavigation';
import { AppText, HeadingText } from '../../utility/TextUtility';
import { roleTitle } from '../../constants/StaticData';
import { AppConst } from '../../constants/AppConst';



const AnmListScreen = ({ route, navigation }) => {
    const hospital = route.params?.hospital;
    const type = route.params?.type;
    const anmAsha = route.params?.anmAsha;
    const [list, setList] = useState(null);
    const [search, setSearch] = useState("");


    useEffect(() => {
        if (anmAsha) {
            getAshaAnm("")
        } else {
            apiCall("")
        }
    }, []);



    useEffect(() => {
        navigation.setOptions({
            title: anmAsha ? `All ${anmAsha}` : "ANM / ASHA"
        })
    }, [navigation])


    const apiCall = (txt) => {
        AppConst.showConsoleLog("type--", type)
        getAnmByHospital(type.key, hospital.id, txt).then(res => {
            if (res?.status) {
                setList(res?.list)
            }
        })
    }


    const getAshaAnm = (txt) => {
        getAllAnmAshaByType(anmAsha, txt).then(res => {
            if (res?.status) {
                setList(res?.list)
            }
        })
    }


    const searchAction = txt => {
        setSearch(txt);

        if (!txt) {
            anmAsha ? getAshaAnm("") : apiCall("")
        }
        if (txt.length > 1) {
            anmAsha ? getAshaAnm(txt) : apiCall(txt)
        }
    }



    const itemPress = (item) => {
        console.log("anm-asha", type)
        if (anmAsha) {
            navigate("instByHospital", { type: { "key": "total", "title": "TOTAL" }, anm: item })

        } else {
            navigate("instByHospital", { anm: item, type })
        }
    }

    return (
        <View style={screenStyle}>
            <View>
                <InputField
                    placeholder='Search'
                    value={search}
                    onTextChange={searchAction}
                    showIcon={search?.length > 0 ? <AntDesign name='close' size={22} color={colors.black} onPress={() => searchAction("")} style={{ paddingHorizontal: 10 }} /> : null}
                    style={{ borderWidth: 1, borderColor: colors.grey, borderRadius: 10 }}
                />
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={list ? list : []}
                    keyExtractor={(a, b) => String(b)}
                    contentContainerStyle={{ paddingVertical: 10 }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.item} onPress={() => itemPress(item)}>
                                <>
                                    <HeadingText
                                        text={item.fullName}
                                        size={15}
                                    />
                                    <AppText
                                        text={` Email: ${item.email ? item.email : "-"}`}
                                        size={13}
                                        color={colors.darkGrey}
                                        style={{ marginVertical: 5 }}
                                    />
                                    <AppText
                                        text={` Type: ${item.role ? roleTitle[item.role] : "-"}`}
                                        size={13}
                                        color={colors.darkGrey}
                                        style={{}}
                                    />
                                    {item?.studentCount ?
                                        <AppText
                                            text={` Students: ${item.role ? item.studentCount : "-"}`}
                                            size={13}
                                            color={colors.darkGrey}
                                            style={{ marginTop: 5 }}
                                        />
                                        : null
                                    }
                                </>
                            </TouchableOpacity>
                        )
                    }}
                />

            </View>
            {list && list.length == 0 &&
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <HeadingText
                        text={"No Data Found"}
                        style={{ alignSelf: "center" }}
                    />
                </View>
            }
        </View>
    )
}



const styles = StyleSheet.create({
    item: {
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.darkGrey,
        marginHorizontal: 25,
        marginVertical: 5
    },
})
export default AnmListScreen