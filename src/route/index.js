
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


const AppNavigation = ({ appStatus,login }) => {
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
            return <AuthNavigation loginNav={login} />
        case 3:
            return <StackNavigation />
        case 4:
            return <AdminNavigation />
        default:
            return <AuthNavigation loginNav={login} />
    }
} 





const Navigator = ({ status, login }) => {

    return (
        <NavigationContainer ref={navigationRef}>
            <AppNavigation appStatus={status} login={login} />
        </NavigationContainer>
    )
}


const mapStateToProps = (state) => {
    return {
        status: state?.app?.appStatus,
        login: state?.app?.login
    }
}


export default connect(mapStateToProps, {})(Navigator);