import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import TreatmentComponent from '../../../components/Student/TreatmentComponent';
import { goBack } from '../../../route/RootNavigation';
import { addNewTreatment, addPctsTreatmentAction } from '../../../store/actions/TreatmentAction';
import { screenStyle } from '../../../styles/CommonStyling'
import { AppConst } from '../../../constants/AppConst';



const NewTreatmentScreen = ({ route }) => {
    const detail = route.params?.detail;



    const submitTreatment = (data) => {
        if (detail?.isPcts) {
            delete data.student_id;
            data["pctsId"] = detail?.id;
            AppConst.showConsoleLog("--", data);
            // return;
            addPctsTreatmentAction(data).then(res => {
                if (res?.status) {
                    goBack();
                }
                alert(res?.message ? res.message : "Something went wrong");
            })
            return
        }
        addNewTreatment(data).then(res => {
            if (res?.status) {
                goBack();
            }
            alert(res?.message ? res.message : "Something went wrong");
        })
    }

    return (
        <View style={screenStyle}>
            <TreatmentComponent
                detail={detail}
                onSubmit={submitTreatment}
            />
        </View>
    )
}

const styles = StyleSheet.create({})

export default NewTreatmentScreen