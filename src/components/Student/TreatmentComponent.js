import moment from 'moment';
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import DatePicker from 'react-native-date-picker';
import { AppConst } from '../../constants/AppConst';
import { womenConditions } from '../../constants/StaticData';
import { screenStyle } from '../../styles/CommonStyling';
import { HeadingText } from '../../utility/TextUtility';
import { Checkbox, InputField, TouchableTextView, Button } from '../Custom/CustomFields';
import SelectMedModal from '../Modals/SelectMedModal';



const TreatmentComponent = ({ detail, onSubmit, lmpDateDifference,minimumTreatmentDate }) => {
console.log('test date ------',minimumTreatmentDate)
    const [medModal, setMedModal] = useState(false);
    const [medicines, setMedicines] = useState(null);
    const [conditions, setConditions] = useState([]);
    const [treatDate, setTreatDate] = useState(null);
    const [desc, setDesc] = useState("");
    const [days, setDays] = useState("");
    const [dateModal, setDateModal] = useState(false)


    const conditionAdd = (key) => {
        if (conditions.includes(key)) {
            setConditions(conditions.filter(i => i !== key))
        } else {
            setConditions([...conditions, key]);
        }
    }


    const submitPress = () => {

        let isPreg = conditions.filter(i => i == "pregnant").length > 0;
        let isLact = conditions.filter(i => i == "lactating_mother").length > 0
        let isAnimatic = conditions.filter(i => i == "animatic").length > 0;
        let malnutrition = conditions.filter(i => i == "malnutrition").length > 0

        if (!treatDate) {
            return;
        }

        if (medicines && !days) {
            return;
        }

        let data = {
            "hb_test_id": detail.hbTest.id,
            "date_of_treatment": moment(treatDate).format("YYYY-MM-DD"),
            "medicineIDs": medicines,
            "medicine_remark": desc,
            "is_pregnant": isPreg,
            "is_lactating_mother": isLact,
            "is_animatic": isAnimatic,
            "malnutrition": malnutrition,
            "number_of_medicine_days": days,
            "student_id": detail.student_id
        }

        AppConst.showConsoleLog("data:->  ", data);
        onSubmit(data);
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <TouchableTextView
                        label="Select Medicines"
                        placeholder='medicines'
                        onPress={() => setMedModal(true)}
                        value={medicines ? `${medicines.length + " medicine selected"}` : null}
                    />

                    <InputField
                        placeholder='Desciption'
                        label={"Medicine Description"}
                        value={desc}
                        isDescription={true}
                        onTextChange={setDesc}
                        style={{ borderWidth: 1, borderRadius: 10, paddingTop: 5, marginTop: 15 }}
                    />

                    <InputField
                        placeholder='Number of days of medicine'
                        label={"Number of days"}
                        value={days}
                        onTextChange={setDays}
                        keyboardType="number-pad"
                        style={{ borderWidth: 1, borderRadius: 10, paddingTop: 5, marginTop: 15 }}
                    />

                    <TouchableTextView
                        label="Treatment Date"
                        placeholder='Select Date'
                        value={treatDate ? moment(treatDate).format("DD, MMM YYYY") : null}
                        onPress={() => setDateModal(true)}
                    />

                    <View>
                        {womenConditions.map((item, index) => {
                            return (
                                <TouchableOpacity key={String(index)} style={styles.optn} onPress={() => conditionAdd(item.key)}>
                                    <Checkbox
                                        value={conditions.includes(item.key)}
                                        onPress={() => conditionAdd(item.key)}
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
                </View>

                <View style={{ margin: 20 }}>
                    <Button
                        title='Submit treatment'
                        onPress={() => submitPress()}
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
                    // maximumDate={moment().subtract(2, 'year')}
                    minimumDate={new Date(minimumTreatmentDate)}
                    onConfirm={(date) => {
                        // AppConst.showConsoleLog("date: ", d);
                        setTreatDate(date)
                        setDateModal(false);
                    }}
                    onCancel={() => {
                        setDateModal(false)
                    }}
                />
            }

            {medModal &&
                <SelectMedModal
                    onClose={() => setMedModal(false)}
                    selectedMed={medicines ? medicines : []}
                    onSelect={(med) => {
                        setMedicines(med)
                        setMedModal(false)
                    }}
                    lmpDateDifference={lmpDateDifference}
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
});

export default TreatmentComponent