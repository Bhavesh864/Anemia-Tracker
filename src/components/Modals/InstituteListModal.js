import React, { useState } from 'react'
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { getInstituteListByType, getStudentsByInst } from '../../store/actions/TreatmentAction'
import { colors } from '../../styles/colors'
import { fonts } from '../../styles/CommonStyling'
import { AppText, HeadingText } from '../../utility/TextUtility'
import { InputField, Loader, ModalHeader } from '../Custom/CustomFields'


export const instType = [
    {
        name: 'Government',
        key: "gov"
    },
    {
        name: 'Private',
        key: "private"
    }
]


const InstituteListModal = ({ onClose, list, onSelect, type, inst, showGov = true }) => {
    const userProfile = useSelector(state => state.user?.user);
    const [listArr, setListArr] = useState(list);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [activeType, setActiveType] = useState(instType[0].key)
    const [load, setLoad] = useState(false);



    // useEffect(() => {
    //     getInstituteListByType(data.key, "", (data.key == "home" || data.key == "madarsa") ? "" : "gov").then(res => {
    //         console.log('res', res)
    //         if (res?.status) {
    //             setInstituteList(res.list);
    //         }
    //     })

    // }, []);

    const searchAction = txt => {
        setSearch(txt);

        if (type == "instList") {
            setLoad(true);
            getInstituteListByType(inst, txt, activeType, false).then(res => {
                // console.log(res);
                if (res?.status) {
                    setLoad(false)
                    setSearchResult(res.list)
                }
            });
            return;
        }

        setLoad(true)
        getStudentsByInst(inst, txt, false).then(res => {
            // console.log('ollllslll', instituteId);
            if (res?.status) {
                setLoad(false)
                setSearchResult(res.list);
            }
        })
    }

    const onTypeChange = (type) => {
        setActiveType(type);
        setLoad(true);
        getInstituteListByType(inst, "", type).then(res => {
            setLoad(false)
            if (res?.status) {
                let a = res.list?.filter(i => i.education_type == "gov")
                console.log('hello', res?.list);
                setListArr(res.list);
            }
        })
    }

    // console.log(userProfile.role !== "asha" || inst !== "madarsa");


    return (
        <Modal
            visible
            transparent
            animationType="slide"

            onRequestClose={() => onClose()}
        >
            <View style={styles.modalComp}>
                <View style={styles.comp}>
                    <ModalHeader
                        title={type == "instList" ? 'Select Institue' : "Select Student"}
                        onPress={() => onClose()}
                    />
                    {(type == "instList" && showGov && (userProfile.role !== "asha" && inst !== "madarsa")) &&
                        <View style={styles.typeCont}>
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
                        </View>
                    }
                    <View>
                        <InputField
                            placeholder='Search'
                            value={search}
                            onTextChange={(text) => {
                                searchAction(text)
                            }}
                            style={{ borderWidth: 1, borderColor: colors.grey, borderRadius: 10 }}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={(search && searchResult) ? searchResult : listArr ? listArr : []}
                            keyExtractor={(a, b) => String(b)}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity style={styles.inst} onPress={() => {
                                        onSelect(item)
                                    }}>
                                        <>
                                            <HeadingText
                                                text={item.name}
                                                size={14}
                                            />
                                            {((!(type == "instList")) || (type == "instList" && item.address)) &&
                                                <AppText
                                                    text={type == "instList" ? item.address : `Guardian Name: ${item.guardian_name}`}
                                                    size={13}
                                                    color={colors.darkGrey}
                                                    style={{ marginTop: 5 }}
                                                />}
                                        </>
                                    </TouchableOpacity>

                                )
                            }}
                        />

                    </View>
                    {listArr && listArr.length == 0 &&
                        <View style={{ flex: 1, justifyContent: "flex-start" }}>
                            <HeadingText
                                text={"No Data Found"}
                                style={{ alignSelf: "center" }}
                            />
                        </View>
                    }
                    {load && <Loader />}
                </View>
            </View>
        </Modal>

    )
}


const styles = StyleSheet.create({
    modalComp: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 20,
        paddingTop: 40
    },
    comp: {
        flex: 1,
        backgroundColor: colors.skyBlue,
        borderRadius: 10
    },
    inst: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.darkGrey
    },
    typeCont: {
        backgroundColor: colors.off_white,
        flexDirection: "row",
        height: 50,
        paddingHorizontal: 10,

    },
    type: {
        width: "50%",
        alignItems: "center",
        height: 50,
        justifyContent: "center"
    },
    typeTxt: {
        fontFamily: fonts.medium,
        fontSize: 16
    }
})

export default InstituteListModal