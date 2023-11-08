import moment from 'moment'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { useSelector } from 'react-redux'
import AntDesign from "react-native-vector-icons/AntDesign"
import { AppConst, getAge } from '../../constants/AppConst'
import { gendersArr } from '../../constants/StaticData'
import { getStudentsByInst } from '../../store/actions/TreatmentAction'
import { colors } from '../../styles/colors'
import { AppText, HeadingText } from '../../utility/TextUtility'
import { Button, Checkbox, InputField, TouchableTextView } from '../Custom/CustomFields'
import InstituteListModal from '../Modals/InstituteListModal'
import { fonts } from '../../styles/CommonStyling'


const AddFormComponent = ({ placeType, instlist, onSubmit }) => {
    const user = useSelector(state => state.user.user);
    const [gender, setGender] = useState(null);
    const [instModal, setInstModal] = useState(false);
    const [selectedInst, setSelectedInst] = useState(null);
    const [dateModal, setDateModal] = useState(false);
    const [age, setAge] = useState(null);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState('');
    const [guardianName, setGuardianName] = useState("");
    const [hbTest, setHbTest] = useState(null);
    const [hbValue, setHbValue] = useState("");
    const [hbTestDate, setHbTestDate] = useState(null);


    const showListModal = (type) => {
        setInstModal({
            type,
            list: instlist
        });
    }

    const submitPress = () => {
        if ((placeType.key !== "home" && !selectedInst) || !name.trim() || !guardianName.trim() || !age) {
            alert("All fields are required");
            return
        }

        if (phone.trim() && phone.trim().length < 9) {
            alert("Please provide valid Phone number");
            return
        }

        if (hbTest && !hbValue.trim()) {
            alert("Please provide Hb Test value");
            return;
        }
        let data = {
            "institute_id": selectedInst.id,
            "block_id": selectedInst.block.id,
            "institute_type": placeType.key,
            "anm_id": user.id,
            "name": name,
            "mobile": phone,
            "guardian_name": guardianName,
            "gender": gender == "male" ? "1" : gender == "female" ? "2" : gender == "other" ? "3" : "0",
            "dob": age,
        }
        let hbData = {
            hbTest,
            hbValue,
            hbDate: hbTestDate
        }

        AppConst.showConsoleLog("data:-> ", data);
        onSubmit(data, hbData);
    }


    // AppConst.showConsoleLog("instList:-> ", instlist);

    return (
        <ScrollView style={{ flex: 1, paddingVertical: 20 }}>
            {
                placeType && (placeType.key == "home" || placeType.key == "other" || !placeType.key) ?
                    null
                    :
                    <TouchableTextView
                        label={`Select ${placeType?.title ? placeType?.title : placeType} name`}
                        placeholder={placeType?.title + " name"}
                        value={selectedInst ? selectedInst.name : null}
                        onPress={() => showListModal("instList")}
                        mandatory={true}
                    />
            }

            <TouchableTextView
                label="Select Institute Name"
                placeholder='Student Name'
                onPress={() => setInstModal({ type: 'instList' })}
                value={selectedInst?.name}
                mandatory={true}
            />

            <InputField
                label="Name"
                placeholder='Student Name'
                value={name}
                onTextChange={setName}
                mandatory={true}
            />
            <InputField
                label="Guardian Name"
                placeholder='Guardian Name'
                value={guardianName}
                onTextChange={setGuardianName}
                mandatory={true}
            />
            {/* <InputField
                label={"Class"}
                placeholder='Student Class'
                value={guardianName}
                onTextChange={setGuardianName}
            /> */}
            <InputField
                label="Mobile number"
                placeholder='Guardian mobile number'
                keyboardType='phone-pad'
                maxLength={10}
                onTextChange={setPhone}
                value={phone}
                mandatory={true}
            />
            <TouchableTextView
                label="Date of birth"
                placeholder='Date'
                onPress={() => setDateModal({ type: "dob" })}
                value={age}
                mandatory={true}
            />

            <View>
                {gendersArr.map((item, index) => {
                    return (
                        <TouchableOpacity key={String(index)} style={styles.genderOptn} onPress={() => setGender(item.key)}>
                            <Checkbox
                                value={gender == item.key}
                                onPress={() => setGender(item.key)}
                            />
                            <View style={{ flex: 1, marginHorizontal: 20 }}>
                                <HeadingText
                                    text={item.name}
                                    size={14}
                                />
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>


            {hbTest ?
                <View style={{ marginTop: 15, borderWidth: 0.5, marginHorizontal: 20, borderRadius: 10 }}>
                    <HeadingText
                        text='Hb Test'
                        // size={16}
                        style={{ fontFamily: fonts.semiBold, padding: 10, textAlign: "center", borderBottomWidth: 0.5, borderColor: colors.grey, marginBottom: 5 }}
                    />
                    <InputField
                        label={"HB Value"}
                        placeholder={"Enter Hb Test Value"}
                        value={hbValue}
                        keyboardType="number-pad"
                        onTextChange={setHbValue}
                        mandatory={true}
                    // showIcon={<AntDesign name='close' size={20} color={colors.black} onPress={() => setHbTest(false)} />}
                    />
                    <TouchableTextView
                        label="HB Test Date"
                        placeholder='Select Date'
                        value={hbTestDate ? hbTestDate : null}
                        onPress={() => setDateModal({ type: "hbTest" })}
                        mandatory={true}
                    />
                    <AntDesign name='close' size={22} color={colors.black} onPress={() => setHbTest(false)} style={styles.hbCloseIcon} />
                </View>
                :
                <TouchableOpacity style={styles.addHbView} onPress={() => setHbTest(true)}>
                    <AntDesign name="plus" size={25} color={colors.grey} />
                    <View style={{ flex: 1 }}>
                        <HeadingText
                            text="Add Hb Test"
                            style={{ margin: 12.5 }}
                        />
                    </View>
                </TouchableOpacity>
            }

            <View style={{ margin: 20, marginBottom: 40 }}>
                <Button
                    title='Submit'
                    onPress={() => submitPress()}
                />
            </View>

            {instModal &&
                <InstituteListModal
                    onClose={() => setInstModal(false)}
                    list={instlist}
                    type={instModal.type}
                    inst={placeType.key}
                    showGov={placeType.key == 'home' ? false : true}
                    onSelect={(item) => {
                        if (instModal.type == "instList") {
                            // console.log('item', item);
                            setSelectedInst(item);
                        }
                        setInstModal(false);
                    }}
                />
            }

            {dateModal &&
                <DatePicker
                    modal
                    mode="date"
                    open={true}
                    date={new Date()}
                    onConfirm={(date) => {
                        // setDate(date)
                        let age = moment(date).format("YYYY-MM-DD") //getAge(date);
                        // AppConst.showConsoleLog("age: ", age);
                        dateModal.type == "dob" ? setAge(age) : setHbTestDate(age);
                        setDateModal(false);
                    }}
                    onCancel={() => {
                        setDateModal(false)
                    }}
                />
            }

        </ScrollView>
    )
}


const styles = StyleSheet.create({
    genderOptn: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: "center"
    },
    addHbView: {
        flexDirection: "row",
        margin: 20,
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.grey,
        borderRadius: 10,
        paddingHorizontal: 10
    },
    hbCloseIcon: {
        position: "absolute",
        right: 5,
        top: 0,
        padding: 10,
        zIndex: 1
    }
})

export default AddFormComponent;
