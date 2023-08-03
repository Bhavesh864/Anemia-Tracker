import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign";
import Foundation from "react-native-vector-icons/Foundation";
import Octicons from "react-native-vector-icons/Octicons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { BottomTabSvg } from '../../assets/svg/AppSvgs'
import { screenWidth } from '../../styles/ResponsiveLayout'
import { navigate } from '../../route/RootNavigation'
import { colors } from '../../styles/colors';


const CustomTabBar = ({ navigation }) => {

    let leftSide = (screenWidth / 3) - 20
    return (
        <View style={styles.tabContainer}>
            <View>
                <BottomTabSvg
                />
                <TouchableOpacity onPress={() => navigate("home")} style={{ position: "absolute", height: 50, width: leftSide, bottom: "14%", left: "10%", ...styles.customIcon }}>
                    {navigation.getState()?.index == 0 ?
                        <Foundation name='home' size={25} color={colors.white} style={{ top: -1 }} />
                        :
                        <Octicons name='home' size={22} color={colors.white} style={{ top: -1 }} />
                    }
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigate("studentPlaceSelect", {
                        data: {
                            title: "HB Test",
                            key: "newHbTest",
                            heading: "Select type to add HB Test of student under:",
                        }
                    })}
                    style={{ position: "absolute", height: 50, width: 50, bottom: "30%", left: "44%" }}
                />
                <TouchableOpacity onPress={() => navigate("profile")} style={{ position: "absolute", height: 50, width: leftSide, bottom: "14%", right: "10%", ...styles.customIcon }}>
                    {navigation.getState()?.index == 2 ?
                        <FontAwesome name='user' size={25} color={colors.white} style={{ top: -1 }} />
                        :
                        <FontAwesome name='user-o' size={22} color={colors.white} style={{ top: -1 }} />
                    }
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    tabContainer: {
        // backgroundColor: "black"
        position: "absolute",
        bottom: 0,
        alignSelf: "center"
    },
    customIcon: {
        justifyContent: "center",
        alignItems: "center"
    }
})

export default CustomTabBar