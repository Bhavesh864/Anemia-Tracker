import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import StudentListContainer from '../../components/Student/StudentListContainer'
import { AppConst } from '../../constants/AppConst'
import { getAllStudents } from '../../store/actions/TreatmentAction'
import { screenStyle } from '../../styles/CommonStyling'


const UnderTreatmentScreen = () => {
    const [students, setStudents] = useState(null);

    useEffect(() => {
        getAllStudents().then(res => {
            AppConst.showConsoleLog("res:", res);
            if (res?.status) {
                setStudents(res.list)
                return;
            }
        })
    }, []);


    return (
        <View style={screenStyle}>
            <StudentListContainer
                list={students ? students : []}
                containerStyle={{ padding: 20 }}
            />
        </View>
    )
}


const styles = StyleSheet.create({})

export default UnderTreatmentScreen