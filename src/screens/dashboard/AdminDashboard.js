import React, { useEffect, useState } from 'react'
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import AdminDashContainer from '../../components/Dashboard/AdminDashContainer'
import { HomeHeader } from '../../components/Dashboard/Header'
import { AppConst } from '../../constants/AppConst'
import { getAdminDashboard } from '../../store/actions/TreatmentAction'
import { getuserProfileAction } from '../../store/actions/UserAction'
import { screenStyle, statusBar } from '../../styles/CommonStyling'
import { SafeAreaCustomView } from '../../styles/SafeAreaCustomView'


const AdminDashboard = () => {
    const [data, setData] = useState("");
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        dispatch(getuserProfileAction());
        getAdminDashboard().then(res => {
            AppConst.showConsoleLog(res);
            setRefreshing(false)
            if (res?.status) {
                setData(res.info);
            }
        })
    }, [refreshing]);


    return (
        <View style={{ ...screenStyle }}>
            <SafeAreaCustomView barStyle={statusBar.dark} SafeAreaViewStyle={screenStyle}>
                <HomeHeader />
                <ScrollView style={{ flex: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => setRefreshing(!refreshing)} />}>
                    {data &&
                        <AdminDashContainer
                            data={data}
                        />
                    }
                </ScrollView>
            </SafeAreaCustomView>
        </View>
    )
}


const styles = StyleSheet.create({})

export default AdminDashboard;