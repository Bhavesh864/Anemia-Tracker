import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { screenStyle } from '../styles/CommonStyling';
import { AppText, HeadingText } from '../utility/TextUtility';
import { useDispatch } from 'react-redux';
import { AsyncLogin } from '../store/actions/AppAction';
import { AnemiaMuktSvg, LayerSvg, LowerLayerSvg, MAA_Svg } from '../assets/svg/AppSvgs';
import { colors } from '../styles/colors';




const SplashScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(AsyncLogin());
        }, 2000);
    }, []);

    return (
        <View style={styles.container}>
            <View style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
                <LayerSvg />
            </View>
            <View style={{ alignSelf: "center", alignItems: "center" }}>
                {/* <MAA_Svg />
                <AnemiaMuktSvg scale={0.9} style={{ bottom: "2%" }} /> */}
                <Image source={require("../assets/images/logo.png")} style={{ resizeMode: "contain", height: 200, width: 400 }} />
            </View>
            <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
                <LowerLayerSvg />
            </View>
            <View style={{ position: "absolute", bottom: 35, left: '40%', right: 0 }}>
                <AppText text='Version: 1.1.10' style={{ color: colors.off_white, fontWeight: '500', fontSize: 18 }} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        ...screenStyle,
        justifyContent: "center"
    }
});

export default SplashScreen