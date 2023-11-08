/**
 * @format
 */

import React from "react"
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import { name as appName } from './app.json';
import store from './src/store';
import { showNotification } from "./src/constants/Notification";


const newApp = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    const msg = remoteMessage;
    showNotification(msg?.data?.title, msg.data?.body, msg.data);
});

AppRegistry.registerComponent(appName, () => newApp);
