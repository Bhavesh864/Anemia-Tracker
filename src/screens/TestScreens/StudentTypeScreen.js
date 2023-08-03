import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import CardContainer from '../../components/Dashboard/CardContainer'
import { ashaInstituteTypes, placeTypes } from '../../constants/StaticData'
import { navigate } from '../../route/RootNavigation'
import { colors } from '../../styles/colors'
import { screenStyle } from '../../styles/CommonStyling'
import { AppText } from '../../utility/TextUtility'



const StudentTypeScreen = ({ route, navigation }) => {
    const data = route?.params?.data;
    const userProfile = useSelector(state => state.user.user);
    const [cardOptions, setCardOptions] = useState([]);

    useEffect(() => {
        let arr = [];
        if (userProfile.role == "asha") {
            arr = ashaInstituteTypes
        } else {
            arr = placeTypes
        }
        if (data?.key == "addStudent") {
            arr = arr.filter(i => i.key != "pcts");
        }
        setCardOptions(arr);
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: data?.title
        })
    }, [navigation]);

    //console.log(data)

    const onSelect = (place) => {
        //console.log('data.keh', data.key)
        //console.log('data.keh', place.title)
        if (place.title == 'PCTS') {
            navigate('pctsList', { title: place.title, key: place.key });
        } else {
            navigate(data.key, { title: place.title, key: place.key });
        }
    }

    return (
        <View style={screenStyle}>
            <AppText
                text={data?.heading}
                color={colors.darkGrey}
                style={{ margin: 20 }}
            />

            <View>
                <CardContainer
                    options={cardOptions} //{userProfile.role == "asha" ? ashaInstituteTypes : placeTypes}
                    screenSpace={60}
                    onPress={(i) => onSelect(i)}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({})

export default StudentTypeScreen