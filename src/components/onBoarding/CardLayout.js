import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppText } from '../../utility/TextUtility'
import { Center } from '../../styles/CommonStyling'

const CardLayout = ({children}) => {
  return (
   <View style={styles.cardContainer}>
   {children}
 </View>
  )
}

export default CardLayout

const styles = StyleSheet.create({
   cardContainer: {
     borderRadius: 10,
     backgroundColor: '#FFFFFF',
   //   padding: 10,
   marginVertical:10,
   
     shadowColor: '#000000',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.3,
     shadowRadius: 2,
     elevation: 2,
   },
 });