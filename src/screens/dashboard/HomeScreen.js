import React, { useState } from 'react'
import { Alert, PermissionsAndroid, Platform, RefreshControl, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import { InputField, TouchableTextView } from '../../components/Custom/CustomFields'
import RNFetchBlob from 'react-native-blob-util';
import { screenStyle, statusBar } from '../../styles/CommonStyling'
import Feather from "react-native-vector-icons/Feather"
import { homeOptionsArr } from '../../constants/StaticData'
import { HeadingText } from '../../utility/TextUtility'
import { colors } from '../../styles/colors'
import { screenWidth } from '../../styles/ResponsiveLayout'
import { SafeAreaCustomView } from '../../styles/SafeAreaCustomView'
import CardContainer from '../../components/Dashboard/CardContainer'
import { navigate } from '../../route/RootNavigation'
import { useEffect } from 'react'
import { addDeviceTokenAction, getuserProfileAction } from '../../store/actions/UserAction'
import { useDispatch } from 'react-redux'
import { WarningSvgIcon } from '../../assets/svg/BasicIcons'
import RemainingContainer from '../../components/Dashboard/RemainingContainer'
import { getDashboardAction } from '../../store/actions/TreatmentAction'
import { criticalData, reportData, underTreatData } from '../TestScreens/DueTreatment/SelectDueTreatment'
import { HomeHeader } from '../../components/Dashboard/Header'
import { AppConst } from '../../constants/AppConst';
import { anmReportDownloadUrl, baseUrl } from '../../services/baseUrls';
import { downloadPermissionCheck } from '../../constants/OtherConst';
import { useFocusEffect } from '@react-navigation/native';


const HomeScreen = ({ route, navigation: { addListener } }) => {
    const dispatch = useDispatch();
    const [dashData, setDashData] = useState(null);
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        getDashboardAction().then(res => {
            if (res?.status) {
                setDashData(res.info);
            }

            if (refreshing) {
                setRefreshing(false);
            }
        })
        dispatch(getuserProfileAction());
    }, [refreshing]);


    useEffect(() => {
        const unsubscribe = addListener('focus', () => {

            if (AppConst.getDeviceToken() && !AppConst.getIsSetDeviceToken()) {
                let body = {
                    "device_type": Platform.OS,
                    "device_token": AppConst.getDeviceToken()
                }
                addDeviceTokenAction(body);
            }

        });

        return () => {
            unsubscribe;
        }
    }, []);


    const onOptionPress = (option) => {

        // downloadPermissionCheck(baseUrl + "/auth/userReport")
        // return;
        if (!option.key) {
            return
        }

        if (option.key == criticalData.key) {
            navigate("dueTreatment", { dueType: criticalData.key });
            return;
        }

        if (option.key == underTreatData.key) {
            navigate("dueTreatment", { dueType: underTreatData.key });
            return;
        }

        if (option.key == reportData.key) {
            Alert.alert(
                "Download Report",
                "Are you sure you want to download your report",
                [
                    {
                        text: "Cancel",
                        onPress: () => null,
                        style: "cancel",
                    },
                    {
                        text: "Download",
                        onPress: () => downloadPermissionCheck(anmReportDownloadUrl)
                    },
                    {
                        text: "Select Institute",
                        onPress: () => navigate("dueTreatment", { dueType: reportData.key })
                        // navigate("studentPlaceSelect", {
                        //     data: {
                        //         title: "Report Download",
                        //         key: "addStudent",
                        //         heading: "Select type to add new student under:",
                        //     },
                        //     place: {
                        //         key: "report",
                        //         title: "Critical/Sever Patients",
                        //         desc: 'Critical/Sever Patients result in following section:'
                        //     }
                        // })
                    },
                ]
            );
            return;
        }

        navigate(option.key, option.params ? option.params : {});
    }




    return (
        <View style={[screenStyle, {}]}>
            <SafeAreaCustomView barStyle={statusBar.dark} SafeAreaViewStyle={screenStyle}>
                <HomeHeader />
                <ScrollView style={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => setRefreshing(true)} />}>
                    <TouchableTextView
                        value={""}
                        placeholder="Search Students"
                        style={{ borderWidth: 1, borderRadius: 30, paddingHorizontal: 10, maxWidth: 500, backgroundColor: colors.white }}
                        leftIcon={<Feather name='search' size={25} color="grey" />}
                        onPress={() => navigate("searchScreen")}
                    />

                    {dashData &&
                        <RemainingContainer
                            data={dashData}
                        />
                    }
                    <CardContainer
                        options={homeOptionsArr}
                        onPress={onOptionPress}
                    />
                </ScrollView>
            </SafeAreaCustomView>
        </View>
    )
}


const styles = StyleSheet.create({})

export default HomeScreen