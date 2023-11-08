import React from 'react'
import { StyleSheet, Text, View, Modal } from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign"
import { useSelector } from 'react-redux'
import { ashaInstituteTypes, placeTypes } from '../../constants/StaticData'
import { colors } from '../../styles/colors'
import { flexRow } from '../../styles/CommonStyling'
import { HeadingText } from '../../utility/TextUtility'
import CardContainer from '../Dashboard/CardContainer'


const PatientPlaceSelectModal = ({ onClose, onSelect }) => {
  const userProfile = useSelector(state => state.user.user);

  return (
    <Modal
      visible
      transparent={true}
      animationType="slide"
      onRequestClose={() => onClose()}
    >
      <View style={styles.comp}>
        <View style={styles.viewComp}>
          <View style={{ padding: 10, borderBottomWidth: 1, borderColor: colors.grey, ...flexRow }}>
            <HeadingText
              text='Select Categroy'
              style={{ flex: 1, textAlign: "center" }}
            />
            <AntDesign name='close' size={25} color={colors.black} style={{ padding: 1 }} onPress={() => onClose()} />
          </View>
          <View style={{ paddingVertical: 20 }}>
            <CardContainer
              options={userProfile?.role == "asha" ? ashaInstituteTypes : placeTypes}
              screenSpace={100}
              onPress={(i) => onSelect(i)}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}


const styles = StyleSheet.create({
  comp: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    // alignItems: "center"
  },
  viewComp: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    borderRadius: 10
  }
})

export default PatientPlaceSelectModal