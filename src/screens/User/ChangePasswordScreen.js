import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, InputField } from '../../components/Custom/CustomFields'
import { AppConst } from '../../constants/AppConst'
import { goBack } from '../../route/RootNavigation'
import { changeUserPassword } from '../../store/actions/UserAction'
import { screenStyle } from '../../styles/CommonStyling'



const ChangePasswordScreen = () => {
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");


    const submitPress = () => {
        let old = oldPass.trim();
        let newP = newPass.trim();
        let confirm = confirmPass.trim();

        if (!old) {
            alert("Please enter your old password");
            return;
        }
        if (!newP) {
            alert("Please enter your new password");
            return
        }
        if (!confirm) {
            alert("Please confirm your new password");
            return
        }
        if (newP !== confirm) {
            alert("Your new password and confirm password does not matches");
            return;
        }

        // if(old==newP){
        //     alert("Old and new password cannot be same");
        //     return;
        // }

        changeUserPassword(old, newP).then(res => {
            AppConst.showConsoleLog("pass: ", res);
            if (res?.status) {
                goBack();
                alert("Password changed successfully");
                return
            }
            alert(res?.message ? res?.message : "Something went wrong");
        })
    }



    return (
        <View style={screenStyle}>
            <View style={{ flex: 1 }}>
                <InputField
                    placeholder='Old Password'
                    value={oldPass}
                    password={true}
                    onTextChange={setOldPass}
                />
                <InputField
                    placeholder='New Password'
                    value={newPass}
                    password={true}
                    onTextChange={setNewPass}
                />
                <InputField
                    placeholder='Confirm Password'
                    value={confirmPass}
                    password={true}
                    onTextChange={setConfirmPass}
                />
            </View>
            <View style={{ padding: 20 }}>
                <Button
                    title='Submit'
                    onPress={() => submitPress()}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})

export default ChangePasswordScreen;