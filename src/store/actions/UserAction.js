import AsyncStorage from "@react-native-async-storage/async-storage";
import { adminBlockWiseRole, adminRole, AppConst, AsyncItemKeys } from "../../constants/AppConst";
import { goBack } from "../../route/RootNavigation";
import { addDeviceTokenUrl, anmByHospitalUrl, changePassUrl, getUserProfileUrl, hospitalListUrl, loginUrl, logoutUrl, updateProfileUrl } from "../../services/baseUrls"
import { GetRequest, PostRequest } from "../../services/request"
import { SET_USER_DATA } from "../types";
import { ChangeAppStatus, ChangeLoadingSatus } from "./AppAction";



export const SetUserData = payload => {
    return {
        type: SET_USER_DATA,
        payload
    }
}





export const userLogin = (email, password, loginType) => {
    return async dispatch => {
        try {
            let response = await PostRequest({
                url: loginUrl,
                body: {
                    "email": email,
                    "password": password,
                    "loginType": loginType
                },
                loader: true
            });
            if (response && response.status) {
                let token = response.tokens.access.token;
                AppConst.accessToken = token;
                AsyncStorage.setItem(AsyncItemKeys.accessToken, JSON.stringify(token));
                AsyncStorage.setItem(AsyncItemKeys.userRole, JSON.stringify(response.user.role));
                dispatch(SetUserData(response.user));
                if (response.user.role == adminRole || response.user.role == adminBlockWiseRole) {
                    dispatch(ChangeAppStatus(4));
                } else {
                    dispatch(ChangeAppStatus(3));
                }
            } else {
                alert(response?.message ? response?.message : "Something went wrong");
            }
            return response;
        } catch (error) {
            AppConst.showConsoleLog("error: ", error)
        }
    }
}


export const userLogout = () => {
    return async dispatch => {
        try {
            dispatch(ChangeLoadingSatus(true))
            const res = await GetRequest({
                url: logoutUrl
            });

            if (res?.status) {
                await AsyncStorage.removeItem(AsyncItemKeys.accessToken);
                AppConst.accessToken = null;
                AppConst.setAccessToken(null);
                AppConst.setIsSetDeviceToken(false);
                dispatch(SetUserData({}));
                dispatch(ChangeAppStatus(2));
                dispatch(ChangeLoadingSatus(false));
            }
        } catch (error) {

        }
    }
}



export const getuserProfileAction = () => {
    return async dispatch => {
        try {
            const res = await GetRequest({ url: getUserProfileUrl, loader: false });
            if (res.status) {
                dispatch(SetUserData(res.profile));
            }
            AppConst.showConsoleLog("profile: ", res);
            return res;
        } catch (error) {

        }
    }
}



export const changeUserPassword = async (oldPass, newPass) => {
    try {
        let response = await PostRequest({
            url: changePassUrl,
            body: {
                "oldPassword": oldPass,
                "newPassword": newPass
            },
            loader: true
        });

        return response;
    } catch (error) {
        AppConst.showConsoleLog("error: ", error)
    }
}



export const updateUserProfile = (body, profile) => {
    return async dispatch => {
        try {
            const res = await PostRequest({
                url: updateProfileUrl,
                body,
                loader: true
            });
            if (res?.status) {
                dispatch(SetUserData({ ...profile, ...res.profile }));
                goBack();
                alert("Profile updated successfully")
            }
            return res
        } catch (error) {

        }
    }
}



export const addDeviceTokenAction = async (body) => {
    try {
        const res = await PostRequest({
            url: addDeviceTokenUrl,
            body
        });

        AppConst.showConsoleLog("add device token res: ", res)
        if (res?.status) {
            AppConst.setIsSetDeviceToken(true);
        }
        return res
    } catch (error) {

    }
}