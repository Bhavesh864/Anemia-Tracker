import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import CardContainer from '../../../components/Dashboard/CardContainer'
import { ashaInstituteTypes, placeTypes } from '../../../constants/StaticData'
import { navigate } from '../../../route/RootNavigation'
import { colors } from '../../../styles/colors'
import { fonts, screenStyle } from '../../../styles/CommonStyling'
import { AppText, HeadingText } from '../../../utility/TextUtility'
import { AppConst } from '../../../constants/AppConst'




const SelectDueTreatment = ({ route, navigation }) => {
    const userProfile = useSelector(state => state.user.user);
    const dueType = route?.params.dueType;
    const [activeOption, setActiveOption] = useState(dueType ? dueType : dueOptions[0].key)
    const [cardOptions, setCardOptions] = useState([]);


    useEffect(() => {
        // AppConst.showConsoleLog("hello- ", route?.params);
        let arr = [];
        if (userProfile.role == "asha") {
            arr = ashaInstituteTypes
        } else {
            arr = placeTypes
        }
        if (dueType) {
            arr = arr.filter(i => i.key != "pcts");
        }
        setCardOptions(arr);
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: dueType == criticalData.key ? criticalData.title : dueType == underTreatData.key ? underTreatData.title : dueType == reportData.key ? reportData.title : treatData.title
        });

    }, [navigation]);

    const onSelect = (i, activeOption) => {
        // AppConst.showConsoleLog(i.key);
        if (i?.key == "pcts") {
            navigate("pctsList", { option: { ...i, icon: null }, type: activeOption });
            return;
        }
        if (i.key == "house" || i.key == "other" || !i.key) {
            return;
        }

        navigate("treatmentList", { place: { ...i, icon: null }, type: activeOption });
    }



    return (
        <View style={screenStyle}>

            {(!dueType || (dueType == "treatment" || dueType == "test")) &&

                <View style={styles.optnCont}>
                    {dueOptions.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={String(index)}
                                style={[styles.optnView, activeOption == item.key ? styles.activeTxt : {}]}
                                activeOpacity={0.8}
                                onPress={() => setActiveOption(item.key)}
                            >
                                <HeadingText
                                    text={item.title}
                                    color={activeOption == item.key ? colors.red : colors.black}
                                    size={16}
                                    style={[styles.optnTxt, activeOption == item.key ? {} : {}]}
                                />
                            </TouchableOpacity>
                        )
                    })}
                </View>}

            <AppText
                text={dueType == criticalData.key ? criticalData.desc : dueType == underTreatData.key ? underTreatData.desc : dueType == reportData.key ? reportData.desc : treatData.desc}
                color={colors.darkGrey}
                style={{ margin: 20 }}
            />

            <View>
                <CardContainer
                    options={cardOptions}   //{userProfile.role == "asha" ? ashaInstituteTypes : placeTypes}
                    screenSpace={60}
                    onPress={(i) => onSelect(i, activeOption)}
                />
            </View>
        </View>
    )
}


export const dueOptions = [
    {
        title: "Due treatments",
        key: "treatment"
    },
    {
        title: "Due tests",
        key: "test"
    }
]

export const criticalData = {
    key: "critical",
    title: "Critical/Sever Patients",
    desc: 'Critical/Sever Patients result in following section:'
}

export const treatData = {
    key: "",
    title: "Due for Treatment/Test",
    desc: 'Due treatments result in following section:'
};

export const underTreatData = {
    key: "underTreatment",
    title: "Under Treatment",
    desc: 'Under treatment result in following section:'
};

export const reportData = {
    key: "report",
    title: "Report",
    desc: 'Reports of institutes result in following section:'
};

const styles = StyleSheet.create({
    optnCont: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        backgroundColor: colors.lightGrey,
        height: 50,
        marginTop: 10,
        // alignItems: "center"
    },
    optnView: {
        flex: 1
    },
    optnTxt: {
        fontFamily: fonts.semiBold,
        textAlign: "center",
        top: "30%"
        // height: 50,
        // textAlignVertical: "center"
    },
    activeTxt: {
        borderBottomWidth: 2,
        borderBottomColor: colors.red
    }
})

export default SelectDueTreatment