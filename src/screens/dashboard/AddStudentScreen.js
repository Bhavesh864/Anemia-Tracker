import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { screenStyle } from '../../styles/CommonStyling'
import PatientPlaceSelectModal from '../../components/Modals/PatientPlaceSelectModal'
import { goBack, popToTop } from '../../route/RootNavigation'
import AddFormComponent from '../../components/Student/AddFormComponent'
import { addHbTestAction, addNewStudent, getInstituteListByType } from '../../store/actions/TreatmentAction'
import { AppConst } from '../../constants/AppConst'
import { useEffect } from 'react'
import moment from 'moment'



const AddStudentScreen = ({ route }) => {
    const place = route.params?.title;
    // const title = route.params?.title;
    const key = route.params?.key;

    const [placeSelect, setPlaceSelect] = useState(false);
    const [placeCategory, setPlaceCat] = useState(null);
    const [instituteList, setInstituteList] = useState([]);


    useEffect(() => {
        // console.log('route', route)
        if (place) {
            setPlaceCat({ title: place, key: key })
        } else {
            setPlaceSelect(true);
        }
    }, [])

    useEffect(() => {
        if (placeCategory) {
            // console.log('placeCat -------------', placeCategory.key);
            getInstituteListByType(key, "", (key == "home" || key == "madarsa") ? "" : "gov").then(res => {
                // console.log(res);
                if (res?.status)
                    console.log('list', res);
                setInstituteList(res.list);
            })
        }
    }, [placeCategory]);


    const onSelectModalClose = () => {
        setPlaceSelect(false);
        goBack();
    }

    const onPlaceSelect = (place) => {
        setPlaceCat(place);
        setPlaceSelect(false);
    }

    const onSubmit = (data, hbData) => {
        addNewStudent(data).then(res => {
            if (res?.status) {
                if (hbData.hbTest) {
                    addHbTestAction({
                        "institute_id": data.institute_id,
                        "institute_type": data.institute.type,
                        "block_id": data.block_id,
                        "anm_id": data.anm_id,
                        "student_id": res.student?.student_id,
                        "hb_value": hbData.hbValue,
                        "hb_test_date": hbData.hbDate
                    }).then(r => {
                        if (r?.status) {
                            alert("Student created and Hb Test added successfully");
                        } else {
                            alert("Student created but something went wrong in adding Hb Test. Please try again adding the Hb Test.");
                            popToTop();
                        }
                        popToTop();
                    })
                } else {
                    alert(res.message)
                    popToTop();
                }
            } else {
                alert(res?.message ? res.message : "Something went wrong")
            }
        })
    }

    return (
        <View style={screenStyle}>

            <AddFormComponent
                placeType={placeCategory ? placeCategory : "school / college"}
                instlist={instituteList}
                onSubmit={onSubmit}
            />

            {placeSelect &&
                <PatientPlaceSelectModal
                    onClose={() => onSelectModalClose()}
                    onSelect={onPlaceSelect}
                />
            }
        </View>
    )
}


const styles = StyleSheet.create({})

export default AddStudentScreen