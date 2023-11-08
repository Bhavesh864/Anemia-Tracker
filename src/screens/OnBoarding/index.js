import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useRef, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux';
import View1 from '../../components/onBoarding/View1';
import View2 from '../../components/onBoarding/View2';
import { AsyncItemKeys } from '../../constants/AppConst';
import { ChangeAppStatus, ChangeLoadingSatus } from '../../store/actions/AppAction';
import { colors } from '../../styles/colors';
import { flexRow, screenStyle } from '../../styles/CommonStyling'
import { screenHeight, screenWidth } from '../../styles/ResponsiveLayout';
import { HeadingText } from '../../utility/TextUtility';


const OnBoardingScreen = () => {
    const refContainer = useRef();
    const dispatch = useDispatch();
    const [currentIndex, setCurrentIndex] = useState(0);

    const componentsArr = () => [
        {
            view: <View1 />,
            title: "",
            desc: ""
        },
        {
            view: <View2 />,
            title: "",
            desc: ""
        }
    ]


    const nextFunc = () => {
        if (currentIndex < componentsArr().length - 1) {
            refContainer.current.scrollToIndex({ animated: true, index: currentIndex + 1 });
            setCurrentIndex(currentIndex + 1);
        } else {
            onDone();
        }
    }

    const previousFunc = () => {
        refContainer.current.scrollToIndex({ animated: true, index: currentIndex - 1 });
        setCurrentIndex(currentIndex - 1)
    }

    const onDone = async () => {
        dispatch(ChangeLoadingSatus(true))
        await AsyncStorage.setItem(AsyncItemKeys.onBoarding, 'true');
        dispatch(ChangeLoadingSatus(false));
        dispatch(ChangeAppStatus(2));
    }

    return (
        <View style={{ ...screenStyle }}>
            <View style={{ flex: 1 }}>
                <FlatList
                    ref={refContainer}
                    data={componentsArr()}
                    key={(i, index) => String(index)}
                    horizontal={true}
                    scrollEnabled={false}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    // contentContainerStyle={{ flex: 1 }}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ width: screenWidth }}>
                                {item.view}
                            </View>
                        )
                    }}
                />
            </View>

            <View
                style={[
                    { ...flexRow, marginBottom: 10 },
                    currentIndex == 0 ? {
                        justifyContent: "center",
                        backgroundColor: colors.red
                    } :
                        { justifyContent: "space-between", backgroundColor: colors.irisBlue }
                ]}
            >
                {currentIndex > 0 &&
                    <TouchableOpacity style={{ padding: 20, }} onPress={() => previousFunc()}>
                        <HeadingText
                            text='PREV'
                            color={colors.white}
                        />
                    </TouchableOpacity>
                }
                <TouchableOpacity style={{ padding: 20, }} onPress={() => nextFunc()}>
                    <HeadingText
                        text='NEXT'
                        color={colors.white}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({})

export default OnBoardingScreen;