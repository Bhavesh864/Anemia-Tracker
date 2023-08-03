import React, { useEffect } from 'react'
import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native'
import { connect, useDispatch, useSelector } from 'react-redux'
import messaging from '@react-native-firebase/messaging';
import { Loader } from './src/components/Custom/CustomFields'
import { AppConst } from './src/constants/AppConst'
import Navigator from "./src/route/index"
import { colors } from './src/styles/colors'
import { callNotification, createNotificationChannel, getFcmToken, NotificationListener } from './src/constants/Notification';



const App = ({ loading }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // requestUserPermission();
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    // });

    // return unsubscribe;

    getFcmToken();
    createNotificationChannel();
    NotificationListener();
    callNotification();

  }, []);


  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // //console.log('Authorization status:', authStatus);
      let fcmToken = await messaging().getToken();
      // //console.log('FCM token: ', fcmToken);
      // AppConst.deviceToken=fcmToken
      AppConst.setDeviceToken(fcmToken);
    }
  }


  return (
    <View style={styles.container}>
      <Navigator />
      {loading && <Loader />}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  }
})

const mapStateToProps = state => {
  return {
    loading: state.app.loading
  }
}

export default connect(mapStateToProps, {})(App)