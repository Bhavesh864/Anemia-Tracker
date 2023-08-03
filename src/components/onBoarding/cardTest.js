import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, ScrollView, Animated, TouchableOpacity, Linking } from 'react-native';
import moment from 'moment';
import CardLayout from './CardLayout'
import { Center, flexRow } from '../../styles/CommonStyling'
import { AppText } from '../../utility/TextUtility'
import { colors } from '../../styles/colors'
import AntDesign from "react-native-vector-icons/AntDesign";
import { screenHeight } from '../../styles/ResponsiveLayout';

const AnimatedCard = ({ headerText, icon, data }) => {
    const translateY = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const scrollAnimation = Animated.loop(
            // toValue: 50 * data?.length, // Height of each news item
            Animated.timing(translateY, {
                toValue: screenHeight / 5.5, // Height of each news item
                duration: 8000, // Adjust the duration as desired
                useNativeDriver: true,
            }),
        );
        scrollAnimation.start();

        return () => {
            scrollAnimation.stop();
        };
    }, [data?.length]);


    const handleLinkClick = (item) => {
        Linking.openURL(item?.url ? item.url : "https://chiranjeevi.rajasthan.gov.in/#/chiranjeevi/how-benefit-scheme");
    }

    return (
        <CardLayout>
            <View style={{ height: 220 }}>
                <View style={{ ...styles.cardContainer }}>
                    <AntDesign name={icon} size={14} color={colors.white} style={{ paddingHorizontal: 5 }} />
                    <AppText text={headerText} color='white' />
                </View>
                <View style={{ flex: 1, overflow: 'hidden' }}>
                    <Animated.View
                        style={{
                            transform: [{ translateY: translateY }],
                        }}
                    >
                        <ScrollView
                            contentContainerStyle={{ paddingTop: 10 }}
                            showsVerticalScrollIndicator={false}
                            scrollEventThrottle={16}
                            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: translateY } } }], { useNativeDriver: true })}>
                            {data && data?.length > 0 && data?.map((item, index) => (
                                <TouchableOpacity key={index} onPress={() => handleLinkClick(item)}>
                                    <View style={{ ...flexRow, width: 260 }}>
                                        <View
                                            style={{ margin: 3, padding: 5, marginRight: 10, backgroundColor: colors.primary, borderRadius: 5, borderWidth: 1 }} >
                                            <AppText text={moment(item?.date).format("DD-MM-YYYY")} color={colors.white} size={12} />
                                        </View>
                                        <AppText text={item?.title} />
                                    </View>
                                </TouchableOpacity>
                            ),)}
                        </ScrollView>
                    </Animated.View>
                </View>
            </View>
        </CardLayout>


    );
};

export default AnimatedCard;

const styles = StyleSheet.create({
    cardContainer: {
        height: 50,
        ...Center,
        ...flexRow,
        backgroundColor: colors.primary,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
});
