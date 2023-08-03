import { AppConst } from "../constants/AppConst";
import store from "../store";
import { ChangeLoadingSatus } from "../store/actions/AppAction"





const timeout = 30000;
export const apiHeader = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
}

export const AuthorizeApiHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${AppConst.accessToken}`
}

export const FormDataApiHeader = {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
}

export const FormDataAuthApiHeader = {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${AppConst.accessToken}`
}


export const apiStatusCodes = {
    success: 200,

}


export const GetRequest = async ({ url, header = { ...AuthorizeApiHeader, 'Authorization': `Bearer ${AppConst.accessToken}` }, loader = true }) => {
    const config = {
        method: 'GET',
        headers: header,
    };
    AppConst.showConsoleLog('get config: ', config);
    AppConst.showConsoleLog('get Uri:  ', url);
    try {
        if (loader) {
            store.dispatch(ChangeLoadingSatus(true));
        }
        const controller = new AbortController();
        setTimeout(() => controller.abort(), timeout);
        const res = await fetch(url, config);
        const result = await res.json();
        if (loader) {
            store.dispatch(ChangeLoadingSatus(false));
        }
        return result;
    } catch (error) {
        if (loader) {
            store.dispatch(ChangeLoadingSatus(false));
        }
        AppConst.showConsoleLog('error:', error);
    }
};


export const PostRequest = async ({
    url,
    body,
    header = { ...AuthorizeApiHeader, 'Authorization': `Bearer ${AppConst.accessToken}` },
    fileupload = false,
    method = "POST",
    loader = false
}) => {
    AppConst.showConsoleLog('url:', url);
    AppConst.showConsoleLog('body:', body);
    // return
    try {
        if (loader) {
            store.dispatch(ChangeLoadingSatus(true));
        }
        const controller = new AbortController();
        setTimeout(() => controller.abort(), timeout);
        const config = {
            method: method,
            headers: fileupload ? header : header,
            body: fileupload ? body : JSON.stringify(body),
            signal: controller.signal
        };
        AppConst.showConsoleLog('config:', config);
        // AppConst.showConsoleLog('is Access Token:', config.headers?.Authorization == AppConst.accessToken);
        // if (DeviceConstant.isNetworkConnected) {
        const response = await fetch(url, config);
        const result = await response.json();
        if (loader) {
            store.dispatch(ChangeLoadingSatus(false));
        }
        return result
        // }
        // else {
        //     ShowNetworkMessage();
        //     return undefined
        // }
    } catch (e) {
        AppConst.showConsoleLog('error:', e);
        if (loader) {
            store.dispatch(ChangeLoadingSatus(false));
        }
        // spinner && setSpinner(false)
        if (e.message == 'Aborted') {
            // alert('Service Time Out 5 sec');
            return false;
        }
    }
};