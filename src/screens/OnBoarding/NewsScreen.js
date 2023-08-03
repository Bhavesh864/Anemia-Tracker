import { StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity, Linking, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Card from '../../components/onBoarding/Card'
import { flexSpaceAround } from '../../styles/CommonStyling'
import { colors } from '../../styles/colors'
import { Button } from '../../components/Custom/CustomFields'
import { getNewsData } from '../../store/actions/TreatmentAction'
import { navigate } from '../../route/RootNavigation'
import YoutubePlayer from "react-native-youtube-iframe";
import CardTest from '../../components/onBoarding/cardTest';
import AnimatedCard from '../../components/onBoarding/cardTest'
import { Image } from 'react-native'
import { screenHeight, screenWidth } from '../../styles/ResponsiveLayout'
import { AppText } from '../../utility/TextUtility'



const NewsScreen = () => {
  const [videoData, setvideoData] = useState(null);
  const [playing, setplaying] = useState(false);
  const [newsData, setnewsData] = useState([]);
  const [msgData, setmsgData] = useState([]);


  useEffect(() => {
    getNewsData(true).then(res => {
      if (res?.status) {
        setvideoData(res.list.videoList[0]);
        const array = res.list.eventList;
        const newsArr = [];
        const msgArr = [];

        for (let i = 0; i < array.length; i++) {
          const element = array[i];
          if (element.eventType == 'news') {
            newsArr.push(element);
          } else {
            msgArr.push(element);
          }
        }
        setnewsData(newsArr);
        setmsgData(msgArr);
      }
    });
  }, []);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={{ ...flexSpaceAround, backgroundColor: colors.primary, }}>
          <Image source={require("../../assets/images/newbanner.png")} style={{ width: screenWidth, height: 170, resizeMode: 'contain' }} />
        </View>

        {videoData &&
          <View style={{ height: 250, }}>
            <YoutubePlayer
              height={250}
              play={playing}
              webViewStyle={{ opacity: 0.99 }}
              videoId={videoData?.videoUrl}
              onChangeState={(state) => {
                if (state == "ended") {
                  setplaying(false);
                }
              }}
            />
          </View>
        }


        {newsData && msgData && <View style={{ marginHorizontal: 10, }}>
          <AnimatedCard headerText={"स्वास्थ्य संवेदना चिकित्सकिये परमर्श"} icon='calendar' data={msgData} />
          <AnimatedCard headerText={"नवीनतम सुचनाये"} icon='mail' data={newsData} />
          <Card headerText={"नज़दीकी चिकित्सा अधिकारी ANM, ASHA, की जानकारी"} icon='mail' data={[]} isDropDown={true} />
        </View>}

        <Button
          style={{ width: '50%', marginTop: 15, }}
          title='Sign in'
          onPress={() => {
            navigate('login');
          }}
        />
        {/* <TouchableOpacity onPress={() => {
          Linking.openURL("https://sampark.rajasthan.gov.in/Grievance_Entry/Complain_Request.aspx#stay");
        }}>
          <AppText color={colors.primary} text='File a Grievance' size={17} style={{ fontWeight: '900', textAlign: 'center', marginVertical: 20, textDecorationLine: 'underline' }} />
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.button} onPress={() => {
          Linking.openURL("https://sampark.rajasthan.gov.in/Grievance_Entry/Complain_Request.aspx#stay");
        }}>
          <Text style={styles.buttonText}>File a Grievance</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default NewsScreen

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    height: 230,
    // marginTop: 20,
  },
  img: {
    alignItems: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.primary, // Customize the button background color
    paddingVertical: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF', // Customize the button text color
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },

})