import { Alert, PermissionsAndroid, Platform, ToastAndroid } from "react-native"
import { colors } from "../styles/colors"
import RNFetchBlob from 'react-native-blob-util';
import { AppConst } from "./AppConst";
import Share from 'react-native-share';


export const hbTestValue = {
    "severe": {
        title: "SEVERE",
        text: "SEVERE 1-7",
        key: "7",
        color: "#F2B1B2",
        fontColor: colors.darkRed
    },
    "moderate": {
        title: "MODERATE",
        text: "MODERATE 7-10",
        key: "10",
        color: "#FFEDB1",
        fontColor: "#BC800A"
    },
    "normal": {
        title: "ABOVE",
        text: "ABOVE 10",
        key: "11",
        color: "#8EAE1F90",
        fontColor: colors.white
    }
}



export const getHbTestCondition = (value) => {
    if (value < 7) {
        return "severe"
    } else if (value <= 10) {
        return "moderate"
    }
    else {
        return "normal"
    }
}




const actualDownload = (file) => {
    // let file = "https://www.africau.edu/images/default/sample.pdf";
    const { dirs } = RNFetchBlob.fs;

    console.log("File--", file);
    const extension = file.split('.').pop()
    const fileName = String(new Date().getTime()) + ".pdf" //file.substring(file.lastIndexOf("/") + 1);


    const dirToSave = Platform.OS == 'ios' ? dirs.DownloadDir : dirs.DownloadDir
    const conf = {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: `${fileName}`,
        path: `${dirToSave}/${fileName}`,
    }
    const configfb = {
        fileCache: true,
        addAndroidDownloads: conf,
    }

    const configOptions = Platform.select({
        ios: {
            fileCache: false,
            title: conf.title,
            path: conf.path,
            // appendExt: 'pdf',
        },
        android: configfb,
    });


    Platform.OS === "android" ? ToastAndroid.show("Downloading file...", ToastAndroid.SHORT) : null;
    RNFetchBlob.config(
        configOptions
        // {
        //     fileCache: true,
        //     filename: `abc`,
        //     title: 'title',
        //     appendExt: 'pdf'
        // }
    )
        .fetch('GET', `${file}`, {
            'Content-Type': 'application/pdf',
            Authorization: `Bearer ${AppConst.accessToken}`

        })
        .then((res) => {
            console.log('res--', res)
            console.log('The file saved to ', res?.path());
            if (Platform.OS === "ios") {
                try {
                    RNFetchBlob.ios.openDocument(res.data);

                } catch (error) {
                    AppConst.showConsoleLog(error);
                }
            } else {
                ToastAndroid.show("file saved at path: " + res.path(), ToastAndroid.SHORT);
                Share.open({
                    url: 'file://' + res.path(),
                    mimeType: 'application/pdf'
                })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        err && console.log(err);
                    });
            }
        })
        .catch((e) => {
            ToastAndroid.show("Error in downloading the file", ToastAndroid.SHORT);
            console.log(e)
        }
        ).catch(err => console.log(err));
}


export const downloadPermissionCheck = async (file) => {
    actualDownload(file);
    return;
    try {
        if (Platform.OS == "ios") {
            actualDownload(file);
        } else {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            console.log(granted);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                actualDownload(file)
            } else {
                Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
            }
        }
    } catch (err) {
        console.log(err);
    }
}