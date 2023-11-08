import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { InputField } from '../../components/Custom/CustomFields';
import AntDesign from "react-native-vector-icons/AntDesign";
import { getAdminStudentsByInst } from '../../store/actions/TreatmentAction';
import { colors } from '../../styles/colors';
import { screenStyle } from '../../styles/CommonStyling'
import { AppText, HeadingText } from '../../utility/TextUtility';
import { navigate } from '../../route/RootNavigation';



const AdminStudentsList = ({ route }) => {
    const inst = route.params?.inst;
    const anm = route.params?.anm;
    const type = route.params?.type;
    const [students, setStudents] = useState(null);
    const [search, setSearch] = useState("");



    useEffect(() => {
        getStudents();
    }, []);


    const getStudents = (txt = "") => {
        getAdminStudentsByInst(type.key, anm.id, inst.id, txt).then(res => {
            if (res?.status) {
                setStudents(res?.list);
            }
        })
    }


    const getAnmStudents = (txt = "") => {

    }

    const searchAction = txt => {
        setSearch(txt);

        if (!txt) {
            getStudents("")
        }
        if (txt.length > 1) {
            getStudents(txt)
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
                    data={students ? students : []}
                    keyExtractor={(a, b) => String(b)}
                    contentContainerStyle={{ paddingVertical: 10 }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.item} onPress={() => navigate("studentDetail", { st: item })}>
                                <>
                                    <HeadingText
                                        text={item.name}
                                        size={14}
                                    />
                                    <AppText
                                        text={`Guardian Name: ${item.guardian_name ? item.guardian_name : "-"}`}
                                        size={13}
                                        color={colors.darkGrey}
                                        style={{ marginVertical: 5 }}
                                    />
                                    <AppText
                                        text={`Mobile: ${item.mobile ? item.mobile : "-"}`}
                                        size={13}
                                        color={colors.darkGrey}

                                    />
                                </>
                            </TouchableOpacity>
                        )
                    }}
                />

            </View>

            {students && students.length == 0 &&
                <View style={{ flex: 1, justifyContent: "center", position: "absolute", top: 0, bottom: 0, alignSelf: "center" }}>
                    <HeadingText
                        text={"No Data Found"}
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

export default AdminStudentsList