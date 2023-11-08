import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign";
import { screenStyle } from '../../styles/CommonStyling';
import { InputField } from '../../components/Custom/CustomFields';
import { AppText, HeadingText } from '../../utility/TextUtility';
import { colors } from '../../styles/colors';
import { getAdminDashboardListByType } from '../../store/actions/TreatmentAction';
import { AppConst } from '../../constants/AppConst';
import { navigate } from '../../route/RootNavigation';



const StudentsListByAdmin = ({ route, navigation }) => {
    const type = route.params?.type;
    const [listArr, setListArr] = useState(null);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [load, setLoad] = useState(false);



    useEffect(() => {
        apiCall();
    }, []);

    useEffect(() => {
        navigation.setOptions({
            title: type?.title
        })
    }, [navigation])


    const apiCall = (txt) => {
        getAdminDashboardListByType(type?.key, txt).then(res => {
            AppConst.showConsoleLog(res?.list?.length);
            if (res?.status) {
                setListArr(res?.list)
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



    // console.log("listArr", listArr?.length);



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
                    data={listArr ? listArr : []}
                    keyExtractor={(a, b) => String(b)}
                    // contentContainerStyle={{ paddingHorizontal: 20 }}
                    renderItem={({ item, index }) => {
                        console.log("-", item.name);
                        return (
                            <TouchableOpacity style={styles.item} onPress={() => navigate("studentDetail", { st: item })}>
                                <>
                                    <HeadingText
                                        text={item.name}
                                        size={14}
                                    />
                                    <AppText
                                        text={`Guardian Name: ${item.guardian_name}`}
                                        size={13}
                                        color={colors.darkGrey}
                                        style={{ marginVertical: 5 }}
                                    />
                                    <AppText
                                        text={`HB Value: ${item.hb_value ? item.hb_value : "-"}`}
                                        size={13}
                                        color={colors.darkGrey}
                                    />
                                </>
                            </TouchableOpacity>
                        )
                    }}
                />

            </View>
            {listArr && listArr.length == 0 &&
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
        paddingVertical: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.darkGrey,
        marginHorizontal: 25
    },
})

export default StudentsListByAdmin;