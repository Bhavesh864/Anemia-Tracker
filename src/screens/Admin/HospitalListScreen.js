import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign";
import { InputField } from '../../components/Custom/CustomFields'
import { AppConst } from '../../constants/AppConst';
import { navigate } from '../../route/RootNavigation';
import { getHospitalListByType } from '../../store/actions/TreatmentAction';
import { colors } from '../../styles/colors';
import { screenStyle } from '../../styles/CommonStyling'
import { AppText, HeadingText } from '../../utility/TextUtility';



const HospitalListScreen = ({ route, navigation }) => {
    const type = route.params?.type
    const [hospitals, setHospitals] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        apiCall("")
    }, []);



    const apiCall = (txt) => {
        getHospitalListByType(type.key, txt).then(res => {
            AppConst.showConsoleLog("ress: ", res)
            if (res?.status) {
                setHospitals(res?.list);
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
                    data={hospitals ? hospitals : []}
                    keyExtractor={(a, b) => String(b)}
                    contentContainerStyle={{ paddingVertical: 10 }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.item} onPress={() => navigate("anmList", { hospital: item, type })}>
                                <>
                                    <HeadingText
                                        text={item.name}
                                        size={14}
                                    />
                                    <AppText
                                        text={`InCharge: ${item.incharge ? item.incharge : "-"}`}
                                        size={13}
                                        color={colors.darkGrey}
                                        style={{ marginVertical: 5 }}
                                    />
                                    <AppText
                                        text={`Students: ${item.studentCount ? item.studentCount : "-"}`}
                                        size={13}
                                        color={colors.darkGrey}

                                    />
                                </>
                            </TouchableOpacity>
                        )
                    }}
                />

            </View>
            {hospitals && hospitals.length == 0 &&
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
        marginHorizontal: 25
    },
})

export default HospitalListScreen