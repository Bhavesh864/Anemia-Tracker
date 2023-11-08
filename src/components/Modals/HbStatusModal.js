import React from 'react'
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { bloodStatus } from '../../constants/StaticData'
import { colors } from '../../styles/colors'
import { HeadingText } from '../../utility/TextUtility'
import { ModalHeader } from '../Custom/CustomFields'


const HbStatusModal = ({ onClose, onSelect }) => {

    return (
        <Modal
            visible
            transparent={true}
            animationType="slide"
            onRequestClose={() => onClose()}
        >
            <View style={styles.modalComp}>
                <View style={styles.comp}>
                    <ModalHeader
                        title={"Select HB Status"}
                        onPress={() => onClose()}
                    />
                    <View style={{ padding: 15 }}>
                        <FlatList
                            data={bloodStatus}
                            keyExtractor={i => i.key}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity style={styles.item} onPress={() => onSelect(item)}>
                                        <HeadingText
                                            text={item.value}
                                            size={16}
                                            style={{ width: "40%" }}
                                        />
                                        <HeadingText
                                            text={item.name}
                                            size={16}
                                        />
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>
                </View>
            </View>

        </Modal>
    )
}


const styles = StyleSheet.create({
    modalComp: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        paddingHorizontal: 20
    },
    comp: {
        backgroundColor: colors.white,
        borderRadius: 10
    },
    item: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
        flexDirection: "row"
    }
})

export default HbStatusModal