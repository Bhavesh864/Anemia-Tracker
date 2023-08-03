import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { useSelector } from 'react-redux'
import { AppConst, getAge } from '../../constants/AppConst'
import { bloodStatus, gendersArr, womenConditions } from '../../constants/StaticData'
import { getPctsListAction, getPctsListByAnmAction, getStudentsByInst } from '../../store/actions/TreatmentAction'
import { colors } from '../../styles/colors'
import { AppText, HeadingText } from '../../utility/TextUtility'
import { Button, Checkbox, InputField, TouchableTextView } from '../Custom/CustomFields'
import HbStatusModal from '../Modals/HbStatusModal'
import InstituteListModal from '../Modals/InstituteListModal'
import SelectMedModal from '../Modals/SelectMedModal'
import PctsListSelectModal from '../Modals/PctsListSelectModal'


const HbTestFields = ({ placeType, instlist, onSubmit, selectedData, hbType, pctsName, selectedIns, studentName }) => {
    const user = useSelector(state => state.user.user);
    const [instModal, setInstModal] = useState(null);
    const [selectedInst, setSelectedInst] = useState(selectedIns ? selectedIns : null);
    const [selectedStudent, setSelectedStudent] = useState(selectedData ? selectedData : null);
    const [studentsList, setStudentList] = useState(null);
    const [name, setname] = useState(null);
    const [hbStatus, setHbStatus] = useState(null);
    const [hbDate, setHbDate] = useState(null);
    const [dateModal, setDateModal] = useState(false);
    const [pctsModal, setPctsModal] = useState(false);
    const [pctsList, setPctsList] = useState([]);
    const [selectedPcts, setSelectedPcts] = useState(selectedData?.pcts ? selectedData?.pcts : null);

    AppConst.showConsoleLog("selected data: ", hbType);
    useEffect(() => {
        if (selectedInst) {
            //console.log('id', selectedInst.id);
            getStudentsByInst(selectedInst.id).then(res => {
                //console.log('resList', res);
                if (res?.status) {
                    setStudentList(res.list);
                }
            })
        }

        if (hbType?.key == "pcts") {
            getPctsListByAnmAction().then(res => {
                if (res?.status) {
                    setPctsList(res?.list);
                }
            })
        }

    }, [selectedInst]);


    useEffect(() => {

        if (!selectedInst && placeType.key == "home" && instlist?.length > 0) {
            setSelectedInst(instlist[0])
            // getStudentsByInst(instlist[0].id).then(res => {
            //     //console.log("student: ", res);
            //     if (res?.status) {
            //         setStudentList(res.list);
            //     }
            // })
        }
    }, [instlist])

    // const conditionAdd = (key) => {
    //     if (conditions.includes(key)) {
    //         setConditions(conditions.filter(i => i !== key))
    //     } else {
    //         setConditions([...conditions, key]);
    //     }
    // }


    const onStudentFieldPress = () => {
        if (pctsName || studentName) {
            return;
        }
        setInstModal({ type: 'student' });
        return;
        if ((!selectedInst) && hbType.key != "pcts") {
            alert("Please select " + placeType.title);
            return;
        }
        if (hbType.key == "pcts") {
            setPctsModal({
                type: "student",
                list: studentsList
            });
            return;
        }
        showListModal("student");
    }

    const showListModal = (type) => {
        setInstModal({
            type,
            list: type == "instList" ? instlist : type == "student" ? studentsList : type == "hbStatus" ? bloodStatus : []
        });
    }

    const onSubmitPress = () => {
        if ((hbType?.key == "pcts") || selectedPcts) {
            if (!selectedPcts) {
                alert("Select Pcts for HB Test");
                return;
            }
            if (!hbStatus || !hbDate) {
                alert("Please provide complete hb test detail");
                return;
            }
            let data = {
                "anm_id": user?.id,
                "pctsId": selectedPcts?.id,
                "hb_value": hbStatus,
                "hb_test_date": moment(hbDate).format("YYYY-MM-DD")
            }
            onSubmit(data);
            return;
        }
        if (hbType != 'pcts') {
            if (!selectedInst || !selectedStudent || !hbStatus || !hbDate) {
                alert("All fields are required");
                return;
            }
        } else {
            if (!hbStatus || !hbDate) {
                alert("All fields are required");
                return;
            }
        }

        let data;
        if (hbType != 'pcts') {
            data = {
                "institute_id": selectedInst.id,
                "block_id": selectedInst.block_id,
                "anm_id": user?.id,
                "student_id": selectedStudent?.student_id,
                "hb_value": hbStatus,
                "hb_test_date": moment(hbDate).format("YYYY-MM-DD")
            }
        } else {
            //console.log(selectedData);
            data = {
                "anm_id": user?.id,
                "hb_value": hbStatus,
                "hb_test_date": moment(hbDate).format("YYYY-MM-DD")
            }
        }
        onSubmit(data);
    }




    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <View style={{ flex: 1, paddingVertical: 20 }}>
                    {(hbType?.key != "pcts") && <>
                        {
                            placeType && (placeType.key == "home" || placeType.key == "other" || !placeType.key) ?
                                null
                                :
                                <TouchableTextView
                                    label={`Select ${placeType?.title ? placeType?.title : placeType} name`}
                                    placeholder={placeType?.title + " name"}
                                    value={selectedInst ? selectedInst.name : null}
                                    onPress={() => showListModal("instList")}
                                    touchable={selectedData ? false : true}
                                    mandatory={true}
                                />
                        }

                    </>}

                    {hbType !== 'pcts' && <TouchableTextView
                        label="Select Institute Name"
                        placeholder={(hbType?.key == "pcts" || selectedPcts) ? "PCTS name" : 'Student name'}
                        value={selectedInst?.name}
                        onPress={() => setInstModal({ type: 'instList' })}
                        touchable={selectedData ? false : true}
                        mandatory={true}
                    />}

                    <TouchableTextView
                        label="Name"
                        placeholder={(hbType?.key == "pcts" || selectedPcts) ? "PCTS name" : 'Student name'}
                        value={pctsName ? pctsName : (hbType?.key == "pcts" || selectedPcts) ? selectedPcts?.Name : selectedStudent?.name}
                        onPress={() => onStudentFieldPress()}
                        touchable={selectedInst ? true : false}
                        mandatory={true}
                    />


                    {/* <InputField
                        label="Name"
                        placeholder='Enter name'
                        value={name}
                        mandatory={true}
                        onTextChange={(val) => {
                            setname(val);
                        }}
                    /> */}


                    {(((hbType?.key == "pcts" || selectedPcts) ? selectedPcts : selectedStudent)) &&
                        <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
                            <Text>
                                <HeadingText
                                    text={`Total number of HB Test of ${((hbType?.key == "pcts" || selectedPcts) ? selectedPcts.Name : selectedStudent.name)}- `}
                                    color={colors.red}
                                    size={14}
                                />
                                <HeadingText
                                    text={((hbType?.key == "pcts" || selectedPcts) ? String(selectedPcts.total_hb_test) : String(selectedStudent.total_hb_test))}
                                    color={colors.red}
                                    size={14}
                                />
                            </Text>
                        </View>
                    }

                    <InputField
                        label="HB status"
                        placeholder='Enter value'
                        keyboardType='decimal-pad'
                        value={hbStatus}
                        mandatory={true}
                        onTextChange={(val) => {
                            //console.log(Number(val));
                            let num = Number(val);
                            if (num) {
                                if (num > 14) {
                                    alert("HB value cannot be grater then 15")
                                    setHbStatus('');
                                } else if (num < 0) {
                                    alert("HB value cannot be less then 0")
                                    setHbStatus('')
                                } else {
                                    setHbStatus(num)
                                }
                            }
                        }}
                    />

                    <TouchableTextView
                        label="HB Test Date"
                        placeholder='Select Date'
                        value={hbDate ? moment(hbDate).format("DD, MMM YYYY") : null}
                        onPress={() => setDateModal(true)}
                        mandatory={true}
                    />

                </View>

                <View style={{
                    margin: 20, marginTop: 80
                    // position: "absolute", bottom: 20,left: 20,right: 20
                }}>
                    <Button
                        title='Submit'
                        onPress={() => onSubmitPress()}
                    />
                </View>
            </ScrollView>
            {dateModal &&
                <DatePicker
                    modal
                    open={dateModal}
                    mode="date"
                    date={new Date()}
                    maximumDate={new Date()}
                    // minimumDate={moment().subtract(1, 'year')}
                    onConfirm={(date) => {

                        // AppConst.showConsoleLog("date: ", d);
                        setHbDate(date)
                        setDateModal(false);
                    }}
                    onCancel={() => {
                        setDateModal(false)
                    }}
                />
            }

            {instModal &&
                <InstituteListModal
                    onClose={() => setInstModal(false)}
                    list={instModal.type == 'instList' ? instlist : studentsList}
                    showGov={placeType == 'Adolescent' ? false : true}
                    type={instModal?.type}
                    inst={instModal.type == "instList" ? placeType : selectedInst.block.id}
                    onSelect={(item) => {
                        if (instModal.type == "instList") {
                            setSelectedInst(item);
                        } else if (instModal.type == "student") {
                            setSelectedStudent(item)
                        }
                        setInstModal(false);
                    }}
                />
            }

            {pctsModal &&
                <PctsListSelectModal
                    list={pctsList}
                    onClose={() => setPctsModal(false)}
                    onSelect={(pcts) => {
                        setSelectedPcts(pcts)
                        setPctsModal(false);
                    }}
                />
            }
        </View>
    )
}


const styles = StyleSheet.create({
    optn: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: "center"
    }
})

export default HbTestFields