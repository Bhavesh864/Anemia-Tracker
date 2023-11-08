import React, { useState } from 'react'
import { FlatList, Modal, StyleSheet, Text, View } from 'react-native'
import { colors } from '../../styles/colors'
import { fonts } from '../../styles/CommonStyling'
import { InputField, Loader, ModalHeader } from '../Custom/CustomFields'
import { TouchableOpacity } from 'react-native'
import { AppText, HeadingText } from '../../utility/TextUtility'
import { getPctsListByAnmAction } from '../../store/actions/TreatmentAction'



const PctsListSelectModal = ({ onClose, list, onSelect }) => {
    const [listArr, setListArr] = useState(list);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [load, setLoad] = useState(false);

    const searchAction = txt => {
        setSearch(txt);


        getPctsListByAnmAction(txt).then(res => {
            // console.log(res);
            if (res?.status) {
                setSearchResult(res.list)
            }
        });
    }

    return (
        <Modal
            visible
            transparent
            animationType="slide"
            onRequestClose={() => onClose()}
        >
            <View style={styles.modalComp}>
                <View style={styles.comp}>
                    <ModalHeader
                        title={"Select PCTS"}
                        onPress={() => onClose()}
                    />
                    {/* {
                        <View style={styles.typeCont}>
                            {instType.map((item, index) => (
                                <TouchableOpacity
                                    key={String(index)}
                                    style={[styles.type, activeType == item.key ? { borderBottomWidth: 2 } : null]}
                                    onPress={() => onTypeChange(item.key)}
                                >
                                    <AppText
                                        text={item.name}
                                        style={[styles.typeTxt, activeType == item.key ? { fontFamily: fonts.semiBold } : null]}
                                    />
                                </TouchableOpacity>
                            ))
                            }
                        </View>
                    } */}
                    <View>
                        <InputField
                            placeholder='Search'
                            value={search}
                            onTextChange={searchAction}
                            style={{ borderWidth: 1, borderColor: colors.grey, borderRadius: 10 }}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={(search && searchResult) ? searchResult : listArr ? listArr : []}
                            keyExtractor={(a, b) => String(b)}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity style={styles.inst} onPress={() => onSelect(item)}>
                                        <>
                                            <HeadingText
                                                text={item.Name}
                                                size={14}
                                            />
                                            {/* {
                                                <AppText
                                                    text={type == "instList" ? item.address : `Guardian Name: ${item.guardian_name}`}
                                                    size={13}
                                                    color={colors.darkGrey}
                                                    style={{ marginTop: 5 }}
                                                />
                                            } */}
                                        </>
                                    </TouchableOpacity>

                                )
                            }}
                        />

                    </View>
                    {listArr && listArr.length == 0 &&
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <HeadingText
                                text={"No Data Found"}
                                style={{ alignSelf: "center" }}
                            />
                        </View>
                    }
                    {load && <Loader />}
                </View>
            </View>
        </Modal>

    )
}


const styles = StyleSheet.create({
    modalComp: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 15,
        paddingTop: 20
    },
    comp: {
        flex: 1,
        backgroundColor: colors.skyBlue,
        borderRadius: 10
    },
    inst: {
        padding: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.grey
    },
    typeCont: {
        backgroundColor: colors.off_white,
        flexDirection: "row",
        height: 50,
        paddingHorizontal: 10,

    },
    type: {
        width: "50%",
        alignItems: "center",
        height: 50,
        justifyContent: "center"
    },
    typeTxt: {
        fontFamily: fonts.medium,
        fontSize: 16
    }
})

export default PctsListSelectModal;