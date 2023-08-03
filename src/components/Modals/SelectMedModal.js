import React, { useEffect, useState } from 'react'
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { getMedicineListAction } from '../../store/actions/TreatmentAction';
import { colors } from '../../styles/colors';
import { AppText, HeadingText } from '../../utility/TextUtility';
import { Button, Loader, ModalHeader, RadioButton } from '../Custom/CustomFields';
import { screenHeight } from '../../styles/ResponsiveLayout';


const SelectMedModal = ({ onClose, onSelect, selectedMed, lmpDateDifference }) => {
    const [medList, setMedList] = useState(null);
    const [load, setLoad] = useState(false);
    const [selected, setSelected] = useState(selectedMed);

    useEffect(() => {
        //console.log('mp', lmpDateDifference)
        setLoad(true)
        getMedicineListAction().then(res => {
            setLoad(false);
            if (res?.status) {
                const list = [];
                for (let i = 0; i < res.list.length; i++) {
                    const element = res.list[i];
                    if (element.medicine_type == lmpDateDifference) {
                        list.push(element);
                    }
                }
                setMedList(list);
                //console.log('medicine -----', list);
            }
        },)
    }, []);


    const onItemPress = item => {
        if (selected.includes(item.id)) {
            let arr = selected.filter(i => i !== item.id);
            setSelected(arr);
            return;
        }
        setSelected([...selected, item.id])
    }

    const selectPress = () => {
        onSelect(selected);
    }

    return (
        <Modal
            visible
            transparent
            animationType="slide"
            onRequestClose={() => onClose()}
        >
            <View style={styles.modalCont}>
                <View style={styles.cont}>
                    <ModalHeader
                        title={"Select Medicines"}
                        onPress={() => onClose()}
                    />

                    <View style={{ padding: 15, flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <FlatList
                                data={medList ? medList : []}
                                keyExtractor={i => i.id}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
                                            <View>
                                                <RadioButton
                                                    value={selected.includes(item.id)}
                                                    size={20}
                                                />
                                            </View>
                                            <View style={{ marginLeft: 10, flex: 1 }}>
                                                <HeadingText
                                                    text={item.name}
                                                    size={16}
                                                />
                                                <AppText
                                                    text={item.desc}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View>
                        {selected?.length > 0 &&
                            <View style={{ top: 5 }}>
                                <Button
                                    title='Select'
                                    onPress={() => selectPress()}
                                />
                            </View>
                        }
                    </View>

                    {load && <Loader />}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalCont: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    cont: {
        backgroundColor: colors.white,
        flex: 1,
        borderRadius: 10,
        minHeight: 200,
        maxHeight: screenHeight - 40
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
        flexDirection: "row"
    }
})

export default SelectMedModal