import React, { useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GirlIconSvg } from '../../assets/svg/BasicIcons'
import { InputField } from '../../components/Custom/CustomFields'
import { navigate } from '../../route/RootNavigation'
import { getAllStudents } from '../../store/actions/TreatmentAction'
import { colors } from '../../styles/colors'
import { screenStyle } from '../../styles/CommonStyling'
import { AppText, HeadingText } from '../../utility/TextUtility'



const SearchScreen = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const searchAction = txt => {
        setSearch(txt);

        getAllStudents(search).then(res => {
            //console.log(res);
            if (res?.status) {
                setSearchResult(res.list)
            }
        })
    }


    return (
        <View style={screenStyle}>
            <View>
                <InputField
                    placeholder='Search'
                    value={search}
                    onTextChange={searchAction}
                    style={{ borderWidth: 1, borderColor: colors.grey, borderRadius: 10 }}
                />
                <FlatList
                    data={(searchResult) ? searchResult : []}
                    keyExtractor={(a, b) => String(b)}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.item} onPress={() => navigate("studentDetail", { st: item })}>
                                <View style={{ backgroundColor: colors.off_white, borderRadius: 30, height: 40, width: 40, marginRight: 10, justifyContent: "center", alignItems: "center" }}>
                                    <GirlIconSvg scale={0.5} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <HeadingText
                                        text={item.name}
                                        size={14}
                                    />
                                    <AppText
                                        text={item.institute?.name}
                                        size={12}
                                        style={{ marginTop: 5 }}
                                    />
                                </View>
                            </TouchableOpacity>

                        )
                    }}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.darkGrey,
        flexDirection: "row"
    },
});

export default SearchScreen