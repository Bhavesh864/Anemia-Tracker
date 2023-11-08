import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GirlIconSvg } from '../../assets/svg/BasicIcons'
import { navigate } from '../../route/RootNavigation'
import { colors } from '../../styles/colors'
import { fonts } from '../../styles/CommonStyling'
import { AppText, HeadingText } from '../../utility/TextUtility'



const StudentListContainer = ({ list = [], containerStyle = {} }) => {

    return (
        <View>
            <FlatList
                data={list ? list : []}
                keyExtractor={(i, ind) => String(ind)}
                contentContainerStyle={containerStyle}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity style={styles.item} onPress={() => navigate("studentDetail", { st: item })}>
                            <View style={{ backgroundColor: colors.off_white, borderRadius: 30, height: 40, width: 40, marginRight: 10, justifyContent: "center", alignItems: "center" }}>
                                <GirlIconSvg scale={0.5} />
                            </View>
                            <View>
                                <HeadingText
                                    text={item.name}
                                    size={16}
                                    style={{ fontFamily: fonts.bold }}
                                />
                                <AppText
                                    text={item.institute?.name}
                                    style={{ marginTop: 4 }}
                                />
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    item: {
        padding: 20,
        margin: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.darkGrey,
        flexDirection: "row",
        marginVertical: 10,
        paddingHorizontal: 0
    }
})

export default StudentListContainer