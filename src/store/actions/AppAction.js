import AsyncStorage from "@react-native-async-storage/async-storage";
import { adminBlockWiseRole, adminRole, AppConst, AsyncItemKeys } from "../../constants/AppConst";
import { CHANGE_APP_STATUS, CHANGE_LOADING, loginNav } from "../types";


//Redux value set

export const ChangeAppStatus = payload => {
    return {
        type: CHANGE_APP_STATUS,
        payload
    }
}


export const ChangeOrientaion = payload => {
    return {
        type: "CHANGE_ORIENTATION",
        payload
    }
}


export const ChangeLoadingSatus = payload => {
    return {
        type: CHANGE_LOADING,
        payload
    }
}


export const setLoginNav = payload => {
    return {
        type: loginNav,
        payload
    }
}



//Actions

export const AsyncLogin = () => {
    return async dispatch => {
        const accessToken = await AsyncStorage.getItem(AsyncItemKeys.accessToken);
        const onBoarding = await AsyncStorage.getItem(AsyncItemKeys.onBoarding);
        const userRole = await AsyncStorage.getItem(AsyncItemKeys.userRole);
        AppConst.showConsoleLog("accessToken", accessToken);
        AppConst.showConsoleLog("user Role", userRole);
        if (accessToken) {
                dispatch(setLoginNav('login'))
            AppConst.accessToken = JSON.parse(accessToken);
            if (JSON.parse(userRole) == adminRole || JSON.parse(userRole) == adminBlockWiseRole) {
                dispatch(ChangeAppStatus(4));
            } else {
                dispatch(ChangeAppStatus(3));
            }
        } else {
            if (onBoarding) {
                dispatch(ChangeAppStatus(2));
                return;
            }
            dispatch(ChangeAppStatus(1));
        }
    }
}

