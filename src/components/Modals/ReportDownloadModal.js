import React, { useState } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { downloadPermissionCheck } from '../../constants/OtherConst'
import { gendersWithAll_Arr, hbTestStatuses } from '../../constants/StaticData'
import { instituteReportUrl } from '../../services/baseUrls'
import { colors } from '../../styles/colors'
import { flexRow, fonts, screenStyle } from '../../styles/CommonStyling'
import { AppText, HeadingText } from '../../utility/TextUtility'
import { Button, ModalHeader, RadioButton } from '../Custom/CustomFields'



const ReportDownloadModal = ({ onClose, onDownload, institute }) => {
    const [testType, setTestType] = useState("all");
    const [genderSel, setGenderSel] = useState("all");


    const SelectBoxArr = ({ arr = [], active, setActive }) => {
        return (
            <View style={{ marginTop: 5 }}>
                {arr.map((item, index) => {
                    return (
                        <TouchableOpacity key={String(index)} style={styles.slctView} onPress={() => setActive(item.key)}>
                            <RadioButton
                                value={item.key == active}
                                size={20}
                            />
                            <AppText
                                text={item.name}
                                style={{ marginLeft: 10 }}
                            />
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }


    const onDownloadPress = () => {
        let url = instituteReportUrl + `gendertype=${genderSel}&hbtesttype=${testType}&instituteId=${institute.id}`

        downloadPermissionCheck(url);
        onClose();
    }

    return (
        <Modal
            visible
            transparent
            onRequestClose={() => onClose()}
            animationType="slide"
        >
            <View style={styles.modalCont}>
                <View style={styles.cont}>
                    <ModalHeader
                        title={'Select Institue Report Type'}
                        onPress={() => onClose()}
                    />
                    <View style={styles.viewCont}>
                        <View>
                            <HeadingText
                                text='HB TEST'
                                size={16}
                                style={{ fontFamily: fonts.semiBold }}
                            />
                            <SelectBoxArr
                                arr={hbTestStatuses}
                                active={testType}
                                setActive={setTestType}
                            />
                        </View>
                        <View style={{ marginVertical: 15 }}>
                            <HeadingText
                                text='Gender'
                                size={16}
                                style={{ fontFamily: fonts.semiBold }}
                            />
                            <SelectBoxArr
                                arr={gendersWithAll_Arr}
                                active={genderSel}
                                setActive={setGenderSel}
                            />
                        </View>
                        <View>
                            <Button
                                title='Download'
                                onPress={() => onDownloadPress()}
                            />
                        </View>
                    </View>
                </View>
            </View>

        </Modal>
    )
}


const styles = StyleSheet.create({
    modalCont: {
        flex: 1,
        backgroundColor: colors.blackTransparent,
        justifyContent: "center",
        padding: 20
    },
    cont: {
        backgroundColor: colors.white,
        borderRadius: 20,
    },
    viewCont: {
        padding: 20,
        // flexDirection: "row",
        // justifyContent: "space-between"
    },
    slctView: {
        ...flexRow,
        paddingVertical: 5
    }
})

export default ReportDownloadModal