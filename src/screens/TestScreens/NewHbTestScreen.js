import React, { useState } from 'react'
import { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import InstituteListModal from '../../components/Modals/InstituteListModal'
import PatientPlaceSelectModal from '../../components/Modals/PatientPlaceSelectModal'
import AddFormComponent from '../../components/Student/AddFormComponent'
import HbTestFields from '../../components/Student/HbTestFields'
import { AppConst } from '../../constants/AppConst'
import { goBack } from '../../route/RootNavigation'
import { addHbTestAction, addPctsHbTestAction, getInstituteListAction, getInstituteListByType } from '../../store/actions/TreatmentAction'
import { screenStyle } from '../../styles/CommonStyling'
import { Loader } from '../../components/Custom/CustomFields'


const NewHbTestScreen = ({ route }) => {
    const data = route.params
    const [placeSelect, setPlaceSelect] = useState(false);
    const [placeCategory, setPlaceCat] = useState(null);
    const [instituteList, setInstituteList] = useState(null);


    // AppConst.showConsoleLog("--", data?.key, placeCategory)
    // console.log('institu', data?.student.name);

    useEffect(() => {
        if (data.title) {
            setPlaceCat(data?.title)
            return;
        }
        if (data) {
            setPlaceCat(data.student?.institute_type)
        } else {
            setPlaceSelect(true);
        }
    }, []);

    useEffect(() => {
        if (placeCategory && (data || data?.title)) {
            getInstituteListByType(data.key, "", (data.key == "home" || data.key == "madarsa") ? "" : "gov").then(res => {
                //console.log('res', res)
                if (res?.status) {
                    setInstituteList(res.list);
                }
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

    const onSubmit = (bodyData) => {
        if ((data?.title == "pcts") || data?.pcts) {
            let body = {
                "pctsId": data?.pctsDetail?.pctsDetail?.id,
                "anm_id": bodyData?.anm_id,
                "hb_value": bodyData?.hb_value,
                "hb_test_date": bodyData?.hb_test_date
            }

            addPctsHbTestAction(body).then(res => {
                AppConst.showConsoleLog("pcts res: ", res);
                if (res?.status) {
                    goBack();
                    alert("New HB test added successfully");
                } else {
                    alert(res?.message ? res.message : "Something went wrong");
                }
            })
            return
        }
        addHbTestAction(bodyData).then(res => {
            // AppConst.showConsoleLog("res: ", res);
            if (res?.status) {
                goBack();
                alert("New HB test added successfully");
            } else {
                alert(res?.message ? res.message : "Something went wrong");
            }
        })
    }



    return (
        <View style={screenStyle}>
            {/* <ScrollView style={{ flex: 1 }}> */}
            {instituteList && <HbTestFields
                fromHomeScreen={data?.fromHomeScreen}
                placeType={placeCategory ? placeCategory : "school / college"}
                instlist={instituteList ? instituteList : null}
                selectedData={data?.student ? data?.student : null}
                hbType={data?.title}
                onSubmit={onSubmit}
                selectedIns={data?.institute}
                studentName={data?.student?.name}
                pctsName={data?.pctsName}
            />}
            {/* </ScrollView> */}
            {placeSelect &&
                <PatientPlaceSelectModal
                    onClose={() => onSelectModalClose()}
                    onSelect={data => onPlaceSelect(data)}
                />
            }
            {/* </ScrollView> */}
        </View>
    )
}


const styles = StyleSheet.create({

})

export default NewHbTestScreen