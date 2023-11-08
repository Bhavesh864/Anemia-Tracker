import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign";
import { fonts, screenStyle } from '../../styles/CommonStyling'
import { goBack, navigate } from '../../route/RootNavigation';
import PatientPlaceSelectModal from '../../components/Modals/PatientPlaceSelectModal';
import { getInstitutesByAnm } from '../../store/actions/TreatmentAction';
import { instType } from '../../components/Modals/InstituteListModal';
import { colors } from '../../styles/colors';
import { AppText, HeadingText } from '../../utility/TextUtility';
import { InputField } from '../../components/Custom/CustomFields';




const InstituteByHospitalScreen = ({ route, navigation }) => {
    const anm = route.params?.anm;
    const type = route.params?.type;
    const [placeSelect, setPlaceSelect] = useState(true);
    const [placeCategory, setPlaceCat] = useState(null);
    const [activeType, setActiveType] = useState(instType[0].key);
    const [institutes, setInstitutes] = useState(null);
    const [search, setSearch] = useState("");


    useEffect(() => {
        navigation.setOptions({
            title: placeCategory ? placeCategory.title : "Institutes"
        })
    }, [navigation]);


    console.log("type", placeCategory)
    useEffect(() => {
        if (placeCategory) {
            getInstitutes("", placeCategory.key == "home" ? "" : activeType);
        }
    }, [placeCategory])


    const getInstitutes = (txt = "", edu = activeType) => {
        getInstitutesByAnm(type.key, Number(anm.id), placeCategory.key, txt, edu).then(res => {
            // console.log("inst res: ", res)
            if (res?.status) {
                setInstitutes(res.list);
            }
        })
    }


    const searchAction = txt => {
        setSearch(txt);

        if (!txt) {
            getInstitutes("")
        }
        if (txt.length > 1) {
            getInstitutes(txt)
        }
    }

    const onSelectModalClose = () => {
        setPlaceSelect(false);
        goBack();
    }

    const onPlaceSelect = (place) => {
        setPlaceCat(place);
        setPlaceSelect(false);
    }


    const onTypeChange = (type) => {
        setActiveType(type);
        getInstitutes("", type);
    }


    return (
        <View style={screenStyle}>

            {placeCategory && (placeCategory.key !== "madarsa" && placeCategory.key !== "home") && <View style={styles.typeCont}>
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
            </View>}


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
                    data={institutes ? institutes : []}
                    keyExtractor={(a, b) => String(b)}
                    contentContainerStyle={{ paddingVertical: 10 }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.item} onPress={() => navigate("instStudent", { inst: item, type, anm })}>
                                <>
                                    <HeadingText
                                        text={item.name}
                                        size={14}
                                    />
                                    <AppText
                                        text={`Phone: ${item.mobile ? item.mobile : "N/A"}`}
                                        size={13}
                                        color={colors.darkGrey}
                                        style={{ marginVertical: 5 }}
                                    />
                                    <AppText
                                        text={`Address: ${item.address ? item.address : "N/A"}`}
                                        size={13}
                                        color={colors.darkGrey}
                                    />
                                    {item.studentCount ?
                                        <AppText
                                            text={`Students: ${item.studentCount ? item.studentCount : "N/A"}`}
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

            {institutes && institutes.length == 0 &&
                <View style={{ flex: 1, justifyContent: "center", position: "absolute", top: 0, bottom: 0, alignSelf: "center" }}>
                    <HeadingText
                        text={"No Data Found"}
                    />
                </View>
            }

            {placeSelect &&
                <PatientPlaceSelectModal
                    onClose={() => onSelectModalClose()}
                    onSelect={onPlaceSelect}
                />
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
        width: "50%",
        alignItems: "center",
        height: 50,
        justifyContent: "center"
    },
    typeTxt: {
        fontFamily: fonts.medium,
        fontSize: 16
    },
    item: {
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.darkGrey,
        marginHorizontal: 25
    },
});

export default InstituteByHospitalScreen