import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { flexRow } from '../../styles/CommonStyling';
import { colors } from '../../styles/colors';
import { AppText } from '../../utility/TextUtility';
import { ScrollView } from 'react-native-gesture-handler';

const PharmaciesList = ({ data, selectedItems, setselectedItems }) => {
    // const [CancelButtonCheck, setCancelButtonCheck] = useState(true)
    // const HandleButtons = () => {
    //   setCancelButtonCheck(!CancelButtonCheck);
    // }
    //console.log('selected====>', selectedItems);
    const handleItemSelection = itemId => {
        setselectedItems(prevSelectedItems => {
            const index = prevSelectedItems.indexOf(itemId);
            if (index === -1) {
                return [...prevSelectedItems, itemId];
            } else {
                return prevSelectedItems.filter(id => id !== itemId);
            }
        });
    };

    return (
        <View
            style={[
                {
                    backgroundColor: colors.white,
                    marginBottom: 20,
                    maxHeight: 300,
                    paddingBottom: 10,
                },
            ]}>
            <ScrollView>
                {data?.map(item => {
                    return (
                        <TouchableOpacity
                            onPress={isSelected => handleItemSelection(item?.id, isSelected)}
                            key={item?.id}
                            style={[
                                { paddingHorizontal: 20, paddingVertical: 15, ...flexRow },
                            ]}>
                            <View style={{ marginHorizontal: 10 }}>
                                <AppText
                                    text={item?.name}
                                    color={colors.black}
                                    size={15}
                                    style={{ lineHeight: 20 }}
                                />
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default PharmaciesList;

const styles = StyleSheet.create({});