import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { screenStyle } from '../../styles/CommonStyling'
import { Button, InputField, TouchableTextView } from "../../components/Custom/CustomFields"
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppConst } from '../../constants/AppConst'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import { updateUserProfile } from '../../store/actions/UserAction'


const EditProfileScreen = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const [fullName, setFullName] = useState(user ? user.fullName : "");
    const [mobile, setMobile] = useState(user ? user.mobile : "");
    const [dob, setDob] = useState(user ? user.dob : "");
    const [address, setAddress] = useState(user ? user.address : "");
    const [dateModal, setDateModal] = useState(false);

    // AppConst.showConsoleLog("user- ", user);

    const editPress = () => {
        let body = {
            "fullName": fullName,
            mobile,
            dob,
            address
        }

        dispatch(updateUserProfile(body, user));

    }

    return (
        <View style={screenStyle}>
            <View style={{ flex: 1 }}>
                <InputField
                    placeholder="Full Name"
                    value={fullName}
                    onTextChange={setFullName}
                    label="Full Name"
                />
                <InputField
                    placeholder="Mobile Number"
                    value={mobile}
                    onTextChange={setMobile}
                    label="Mobile Number"
                />
                <TouchableTextView
                    placeholder="Date of birth"
                    value={dob}
                    touchable={true}
                    onPress={() => setDateModal(true)}
                    label="Date of birth"

                // onTextChange={}
                />
                <InputField
                    placeholder="Address"
                    value={address}
                    onTextChange={setAddress}
                    label="Address"
                />
            </View>

            <View style={{ padding: 20 }}>
                <Button
                    title='Edit Profile'
                    onPress={() => editPress()}
                />
            </View>

            {dateModal &&
                <DatePicker
                    modal
                    mode="date"
                    open={dateModal}
                    date={dob ? new Date(dob) : new Date()}
                    onConfirm={(date) => {
                        // setDate(date)
                        let d = moment(date).format("YYYY-MM-DD") //getAge(date);
                        setDob(d);
                        setDateModal(false);
                    }}
                    onCancel={() => {
                        setDateModal(false)
                    }}
                />
            }
        </View>
    )
}


const styles = StyleSheet.create({})

export default EditProfileScreen