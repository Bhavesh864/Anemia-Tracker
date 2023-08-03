import React from 'react';
import { Platform, InteractionManager } from 'react-native';
import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import { AppConst } from './AppConst';
import { navigate } from '../route/RootNavigation';
import store from '../store';




export const Firebase = () => {
  if (requestUserPermission()) {
    getFcmToken();
  } else {
    AppConst.showConsoleLog('Not Authorised Status', enabled);
  }
};

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  console.log('Authorization status:', authStatus);
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  return enabled;
};

export const getFcmToken = async () => {
  const enabled = await requestUserPermission();
  if (enabled) {
    let fcmToken = await messaging().getToken();
    console.log('FCM token: ', fcmToken);
    // AppConst.deviceToken=fcmToken
    AppConst.setDeviceToken(fcmToken);
  }
};

export const NotificationListener = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    // console.log(
    //   'Notification caused app to open from background state:',
    //   remoteMessage,
    // );
    showNotification(
      remoteMessage?.notification?.body,
      remoteMessage.notification?.title,
      remoteMessage.data,
    );
    onNotificationPress(remoteMessage);
  });

  messaging().onMessage(async remoteMessage => {
    // console.log('Notification is on Foreground State', remoteMessage);
    showNotification(
      remoteMessage.data?.title,
      remoteMessage?.data?.body,
      remoteMessage.data,
    );

  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        // console.log(
        //   'Notification caused app to open from quit state:',
        //   remoteMessage,
        // );
      }
    });
};

export const showNotification = (title, message, user = {}) => {
  const channelId = 'default_notification_channel_id';
  // console.log("---", title, message, user);
  if (Platform.OS == 'android') {
    PushNotification.localNotification({
      title: title,
      message: message,
      type: user?.type,
      userInfo: user,
      channelId: channelId,
    });
  } else {
    PushNotification.localNotification({
      title: title,
      message: message,
      type: user?.type,
      userInfo: user,
    });
    // PushNotificationIOS.scheduleLocalNotification({
    //   alertTitle: title,
    //   alertBody: message,
    //   isSilent: false,
    //   userInfo: user,
    // });
  }
};

export function createNotificationChannel() {
  // if (Platform.OS == 'android') {
  PushNotification.createChannel(
    {
      channelId: 'default_notification_channel_id',
      channelName: 'default_notification_channel_id',
      channelDescription: 'A channel to categorise your notifications',
      soundName: 'notification_sound.mp3',
      importance: 4,
      vibrate: true,
    },
    created => console.log(`createChannel returned '${created}'`),
  );
  // }
  return;
}

export const callNotification = () => {
  PushNotification.configure({
    onNotification: notification => {
      // console.log('callNotification===>>', notification);
      if (Platform.OS == 'ios') {
        // console.log('call notify if===>', notification);
        onNotificationPress(notification);
        // notification?.finish(PushNotificationIOS?.FetchResult?.NoData);
      } else {
        // console.log('call notify else==>  ', notification);
        onNotificationPress(notification);
        return;
      }
    },
    popInitialNotification: true,
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
  });
};

export const onRemoteNotification = notification => {
  if (Platform.OS == 'ios') {
    const isClicked = notification?.getData()?.userInteraction === 1;

    if (isClicked) {
      // console.log('---------- onRemote Notification----------', notification);
      onNotificationPress(notification);
    } else {
      console.log('---------- onRemote Notification----------', notification);
      onNotificationPress(notification);
    }
  } else {
    console.log('---------- onRemote Notification----------', notification);
  }
};

export const onNotificationPress = notification => {
  console.log('onNotification Press', notification);

  InteractionManager.runAfterInteractions(() => {

  });
};

// export default class NotifService extends React.Component {
//   constructor(onRegister, onNotification) {
//     this.configure(onRegister, onNotification);

//     this.lastId = 0;
//   }

//   configure(onRegister, onNotification, gcm = '') {
//     PushNotificationIOS.configure({
//       // (optional) Called when Token is generated (iOS and Android)
//       onRegister: onRegister, //this._onRegister.bind(this),

//       // (required) Called when a remote or local notification is opened or received
//       onNotification: onNotification, //this._onNotification,

//       // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
//       senderID: gcm,

//       // IOS ONLY (optional): default: all - Permissions to register.
//       permissions: {
//         alert: true,
//         badge: true,
//         sound: true,
//       },

//       // Should the initial notification be popped automatically
//       // default: true
//       popInitialNotification: true,

//       /**
//        * (optional) default: true
//        * - Specified if permissions (ios) and token (android and ios) will requested or not,
//        * - if not, you must call PushNotificationsHandler.requestPermissions() later
//        */
//       requestPermissions: true,
//     });
//   }

//   localNotif(title, message, sound, color) {
//     this.lastId++;
//     PushNotificationIOS.localNotification({
//       /* Android Only Properties */
//       id: '' + this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
//       ticker: 'My Notification Ticker', // (optional)
//       autoCancel: true, // (optional) default: true
//       largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
//       smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
//       bigText: message, // (optional) default: "message" prop
//       color: color, // (optional) default: system default
//       vibrate: true, // (optional) default: true
//       vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
//       tag: 'some_tag', // (optional) add tag to message
//       group: 'group', // (optional) add group to message
//       ongoing: false, // (optional) set whether this is an "ongoing" notification

//       /* iOS only properties */
//       alertAction: 'view', // (optional) default: view
//       category: '', // (optional) default: null
//       userInfo: {}, // (optional) default: null (object containing additional notification data)

//       /* iOS and Android properties */
//       title: title, // (optional)
//       message: message, // (required)
//       playSound: sound, // (optional) default: true
//       soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
//       actions: '["Yes", "No"]', // (Android only) See the doc for notification actions to know more
//     });
//   }

//   checkPermission(cbk) {
//     return PushNotification.checkPermissions(cbk);
//   }

//   cancelNotif() {
//     console.log(this.lastId, '***');
//     PushNotification.cancelLocalNotifications({id: '' + this.lastId});
//   }

//   cancelAll() {
//     PushNotification.cancelAllLocalNotifications();
//   }
// }

// PushNotificationIOS.configure({
//   popInitialNotification: true,
//   onNotification: notification => {
//     console.log('callNotification===>>', notification);
//     if (
//       notification?.foreground &&
//       (notification?.userInteraction || notification?.remote)
//     ) {
//       PushNotificationIOS.localNotification({
//         /* Android Only Properties */
//         ticker: 'My Notification Ticker', // (optional)
//         autoCancel: true, // (optional) default: true
//         largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
//         smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
//         bigText: message, // (optional) default: "message" prop
//         color: color, // (optional) default: system default
//         vibrate: true, // (optional) default: true
//         vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
//         tag: 'some_tag', // (optional) add tag to message
//         group: 'group', // (optional) add group to message
//         ongoing: false, // (optional) set whether this is an "ongoing" notification

//         /* iOS only properties */
//         alertAction: 'view', // (optional) default: view
//         category: '', // (optional) default: null
//         userInfo: {}, // (optional) default: null (object containing additional notification data)

//         // remoteMessage?.notification?.body,
//         // remoteMessage.notification?.title,
//         /* iOS and Android properties */
//         title: notification.notification?.title, // (optional)
//         message: notification?.notification?.body, // (required)
//         // playSound: '', // (optional) default: true
//         soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
//         actions: '["Yes", "No"]', // (Android only) See the doc for notification actions to know more
//       });
//     }
//   }, //this._onNotification,

//   // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
//   // IOS ONLY (optional): default: all - Permissions to register.
//   permissions: {
//     alert: true,
//     badge: true,
//     sound: true,
//   },

//   // Should the initial notification be popped automatically
//   // default: true
//   popInitialNotification: true,

//   /**
//    * (optional) default: true
//    * - Specified if permissions (ios) and token (android and ios) will requested or not,
//    * - if not, you must call PushNotificationsHandler.requestPermissions() later
//    */
//   requestPermissions: true,
// });
