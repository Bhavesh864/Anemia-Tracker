
import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import SplashScreen from "../screens/SplashScreen";
import { navigationRef } from "./RootNavigation";
import { AdminNavigation, AuthNavigation, StackNavigation } from "./StackNavigation";
import OnBoardingScreen from "../screens/OnBoarding";


const Stack = createStackNavigator();
export const hideHeader = { headerShown: false }


const AppNavigation = ({ appStatus }) => {
    console.log("app status----", appStatus)
    switch (appStatus) {
        case 0:
            return <Stack.Navigator screenOptions={hideHeader}>
                <Stack.Screen name="splash" component={SplashScreen} />
            </Stack.Navigator>
        case 1:
            return <Stack.Navigator screenOptions={hideHeader}>
                <Stack.Screen name="onBoarding" component={OnBoardingScreen} />
            </Stack.Navigator>
        case 2:
            return <AuthNavigation />
        case 3:
            return <StackNavigation />
        case 4:
            return <AdminNavigation />
        default:
            return <AuthNavigation />
    }
}





const Navigator = ({ status }) => {

    return (
        <NavigationContainer ref={navigationRef}>
            <AppNavigation appStatus={status} />
        </NavigationContainer>
    )
}


const mapStateToProps = (state) => {
    return {
        status: state?.app?.appStatus
    }
}


export default connect(mapStateToProps, {})(Navigator);