import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CardLayout from './CardLayout'
import { Center, flexRow } from '../../styles/CommonStyling'
import { AppText } from '../../utility/TextUtility'
import { colors } from '../../styles/colors'
import AntDesign from "react-native-vector-icons/AntDesign";
import InstituteListModal from '../Modals/InstituteListModal'
import { getAuthByInstituteId, getBlockList, getInstituteByBlockId } from '../../store/actions/TreatmentAction'
import { Button } from '../Custom/CustomFields'
import { navigate } from '../../route/RootNavigation'
import ShowDataScreen from '../../screens/OnBoarding/ShowDataScreen'

const Card = ({ headerText, icon }) => {
    const [instituteList, setinstituteList] = useState([]);
    const [blockList, setblockList] = useState([]);
    const [selectedInstitute, setselectedInstitute] = useState(null);
    const [selectedBlockItem, setselectedBlockItem] = useState(null);
    const [showModal, setshowModal] = useState(null);
    const [page, setpage] = useState(0);
    const [hasMoreItems, setHasMoreItems] = useState(true);
    const [loader, setloader] = useState(false);


    useEffect(() => {
        getBlockList(true).then(res => {
            if (res.status) {
                setblockList(res?.list);
            }
        });
    }, [])


    const onBlockSelect = (blockId, pageNo, onBlockSubmit = false) => {
        setselectedInstitute(null);
        setloader(true);
        getInstituteByBlockId(false, blockId, pageNo).then(res => {
            if (res.status) {
                if (onBlockSubmit) {
                    setinstituteList(res.list.rows);
                    setpage(0);
                    setloader(false);

                } else {
                    const newData = [...instituteList, ...res.list.rows];
                    setinstituteList(newData);
                    if (res.pageInfo.currentPage < res.pageInfo.totalPage) {
                        setHasMoreItems(true);
                        setloader(false);

                    }
                }

            }
            setloader(false);
        })
    }


    const toggleDropDown = (pressedField) => {
        if (pressedField == 'institute') {
            setshowModal({ type: 'institute' });
        } else {
            setshowModal({ type: 'block' });
        }
    };

    return (
        <CardLayout>
            <View style={{ marginVertical: 10, }}>
                <View style={{ ...styles.cardContainer }} >
                    <AntDesign name={icon} size={14} color={colors.white} style={{ paddingHorizontal: 5 }} />
                    <AppText text={headerText} color='white' />
                </View>

                <TouchableOpacity style={styles.dropdownContainer} onPress={() => {
                    toggleDropDown('block');
                }}>
                    <AppText text={selectedBlockItem ? selectedBlockItem.name : 'Select Block name'} />
                    <AntDesign name={showModal ? 'caretup' : 'caretdown'} size={14} color={colors.black} />
                </TouchableOpacity>

                <TouchableOpacity
                    disabled={selectedBlockItem ? false : true}
                    style={styles.dropdownContainer}
                    onPress={() => {
                        toggleDropDown('institute');
                    }}>
                    <AppText text={selectedInstitute ? selectedInstitute.name : 'Select Institute'} />
                    <AntDesign name={showModal ? 'caretup' : 'caretdown'} size={14} color={colors.black} />
                </TouchableOpacity>
            </View>

            <Button
                style={{ width: '50%', marginTop: 5 }}
                title='Submit'
                onPress={() => {
                    if (selectedInstitute && selectedBlockItem) {
                        getAuthByInstituteId(true, selectedInstitute?.id).then(res => {
                            console.log('result', res.list.length);
                            navigate('showData', { data: res.list });
                        });
                    }
                }}
            />

            {showModal &&
                <InstituteListModal
                    onClose={() => setshowModal(false)}
                    showSearch={false}
                    list={showModal.type == 'institute' ? instituteList : blockList}
                    showGov={false}
                    type={showModal.type == 'institute' ? 'instList' : 'Block'}
                    onSelect={(item) => {
                        if (showModal.type == 'institute') {
                            setselectedInstitute(item);
                        } else {
                            setselectedBlockItem(item);
                            onBlockSelect(item.id, 0, true);
                        }
                        setshowModal(false);
                    }}
                    loader={loader}
                    onScrollEnd={() => {
                        console.log(page);
                        if (selectedBlockItem && hasMoreItems) {
                            const nextPage = page + 1;
                            setpage(nextPage);
                            onBlockSelect(selectedBlockItem.id, nextPage);
                            setHasMoreItems(false);
                        }
                    }}
                />
            }
        </CardLayout>

    )
}

export default Card

const styles = StyleSheet.create({
    cardContainer: {
        height: 50,
        ...Center,
        ...flexRow,
        backgroundColor: colors.primary,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10

    },
    dropdownContainer: {
        height: 40,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.black,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    dropdownWrapper: {
        // position: 'relative',
        marginTop: 10,
    },

});
