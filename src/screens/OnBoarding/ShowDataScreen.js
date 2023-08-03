import { Image, ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { flexSpaceAround, screenStyle } from '../../styles/CommonStyling'
import { colors } from '../../styles/colors'
import { AppText } from '../../utility/TextUtility'
import { VerticalAlignDataFormat } from '../../components/Custom/CustomFields'

const ShowDataScreen = ({ route }) => {
    const data = route.params.data;

    return (
        <ScrollView style={[screenStyle]}>
            <View style={{ ...flexSpaceAround, backgroundColor: colors.primary, height: 130 }}>
                <Image source={require("../../assets/images/newbanner.png")} />
            </View>
            {data.map((item, index) => {
                const name = item.anm.fullName;
                const contactNumber = item.anm.mobile;
                const healthCenterName = item.anm.hospital.name;
                const inchargeName = item.anm.hospital.incharge;
                return <View style={{ flex: 1, marginTop: 20 }
                } key={index} >
                    <VerticalAlignDataFormat label={"ANM/ASHA"} value={name} />
                    <VerticalAlignDataFormat label={"Contact Number"} value={contactNumber} />
                    <VerticalAlignDataFormat label={"Health Center"} value={healthCenterName} />
                    <VerticalAlignDataFormat label={"Health Center Incharge"} value={inchargeName} />

                    <View style={{ borderColor: colors.grey, borderBottomWidth: 1 }}></View>
                </View>
            })}

        </ScrollView >
    )
}

export default ShowDataScreen

const styles = StyleSheet.create({})