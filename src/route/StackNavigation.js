import React from "react";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import AntDesign from "react-native-vector-icons/AntDesign";
import LoginScreen from "../screens/Auth/LoginScreen";
import HomeScreen from "../screens/dashboard/HomeScreen";
import { hideHeader } from ".";
import { HomeHeader } from "../components/Dashboard/Header";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddStudentScreen from "../screens/dashboard/AddStudentScreen";
import ProfileScreen from "../screens/dashboard/ProfileScreen";
import CustomTabBar from "../components/Custom/CustomTabBar";
import { View } from "react-native";
import { CustomBackButton } from "../components/Custom/CustomFields";
import NewHbTestScreen from "../screens/TestScreens/NewHbTestScreen";
import SelectDueTreatment from "../screens/TestScreens/DueTreatment/SelectDueTreatment";
import StudentListScreen from "../screens/TestScreens/DueTreatment/StudentListScreen";
import StudentDetailScreen from "../screens/TestScreens/DueTreatment/StudentDetailScreen";
import { colors } from "../styles/colors";
import NewTreatmentScreen from "../screens/TestScreens/DueTreatment/NewTreatmentScreen";
import ChangePasswordScreen from "../screens/User/ChangePasswordScreen";
import EditProfileScreen from "../screens/User/EditProfileScreen";
import UnderTreatmentScreen from "../screens/Other/UnderTreatmentScreen";
import SearchScreen from "../screens/Other/SearchScreen";
import { goBack } from "./RootNavigation";
import AdminDashboard from "../screens/dashboard/AdminDashboard";
import StudentsListByAdmin from "../screens/Other/StudentsListByAdmin";
import HospitalListScreen from "../screens/Admin/HospitalListScreen";
import InstituteByHospitalScreen from "../screens/Admin/InstituteByHospitalScreen";
import AnmListScreen from "../screens/Admin/AnmListScreen";
import AdminStudentsList from "../screens/Admin/AdminStudentsList";
import StudentTypeScreen from "../screens/TestScreens/StudentTypeScreen";
import InstituteListScreen from "../screens/TestScreens/DueTreatment/InstituteListScreen";
import PctsListScreen from "../screens/Other/PctsListScreen";
import PctsDetailScreen from "../screens/Other/PctsDetailScreen";
import NewsScreen from "../screens/OnBoarding/NewsScreen";
import ShowDataScreen from "../screens/OnBoarding/ShowDataScreen";



const Stack = createStackNavigator();
const Bottom = createBottomTabNavigator();

const cardStyle = { cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }

export const AuthNavigation = ({ loginNav }) => (
    <Stack.Navigator
        initialRouteName={loginNav}
        screenOptions={{ ...hideHeader, ...cardStyle }}>
        <Stack.Screen name="news" component={NewsScreen} />
        <Stack.Screen name="showData" component={ShowDataScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
    </Stack.Navigator>
)

export const BottomNavigation = () => (
    <Bottom.Navigator
        tabBar={props => <CustomTabBar {...props} />}
    >
        <Bottom.Screen name="home" component={HomeScreen} options={{ ...hideHeader }} />
        <Bottom.Screen name="add" component={AddStudentScreen} options={{}} />
        <Bottom.Screen name="profile" component={ProfileScreen} options={{ title: "Profile", headerTitleAlign: "center", ...hideHeader }} />
    </Bottom.Navigator>
)

export const StackNavigation = () => (
    <Stack.Navigator screenOptions={{ ...cardStyle, headerLeft: () => <CustomBackButton />, headerTitleAlign: "center", headerTitleStyle: { width: 200, fontSize: 18 }, headerStyle: { backgroundColor: colors.skyBlue } }}>
        <Stack.Screen name="homeTab" component={BottomNavigation} options={hideHeader} />
        <Stack.Screen name="studentPlaceSelect" component={StudentTypeScreen} />
        <Stack.Screen name="addStudent" component={AddStudentScreen} options={{ headerTitle: "New Student" }} />
        <Stack.Screen name="newHbTest" component={NewHbTestScreen} options={{ headerTitle: "New HB test" }} />
        <Stack.Screen name="dueTreatment" component={SelectDueTreatment} options={{ headerTitle: "Due for Treatment/Test" }} />
        <Stack.Screen name="treatmentList" component={InstituteListScreen} options={{ headerTitle: "Schools Due treatments" }} />
        <Stack.Screen name="studentList" component={StudentListScreen} />
        <Stack.Screen name="studentDetail" component={StudentDetailScreen} options={{ title: "", headerStyle: { backgroundColor: colors.pistaColor } }} />
        <Stack.Screen name="newTreatment" component={NewTreatmentScreen} options={{ title: "Treatment" }} />
        <Stack.Screen name="changePassword" component={ChangePasswordScreen} options={{ title: "Change Password" }} />
        <Stack.Screen name="editProfile" component={EditProfileScreen} options={{ title: "Edit Profile" }} />
        <Stack.Screen name="underTreatment" component={UnderTreatmentScreen} options={{ title: "Under Treatment" }} />
        <Stack.Screen name="searchScreen" component={SearchScreen} options={{ title: "Search Students", headerLeft: null, headerRight: () => <AntDesign name="close" size={22} color={colors.black} onPress={() => goBack()} style={{ padding: 10, paddingRight: 20 }} /> }} />
        <Stack.Screen name="pctsList" component={PctsListScreen} options={{ title: "PCTS List" }} />
        <Stack.Screen name="pctsDetail" component={PctsDetailScreen} options={{ title: "PCTS Detail" }} />

    </Stack.Navigator>
)



export const AdminNavigation = () => (
    <Stack.Navigator screenOptions={{ headerLeft: () => <CustomBackButton />, ...cardStyle, headerStyle: { backgroundColor: colors.skyBlue } }}>
        <Stack.Screen name="admin" component={AdminDashboard} options={hideHeader} />
        <Stack.Screen name="dashList" component={StudentsListByAdmin} options={{}} />
        <Stack.Screen name="studentDetail" component={StudentDetailScreen} options={{ title: "", headerStyle: { backgroundColor: colors.pistaColor } }} />
        <Stack.Screen name="hospitalList" component={HospitalListScreen} options={{ title: "Health Center" }} />
        <Stack.Screen name="instByHospital" component={InstituteByHospitalScreen} options={{ title: "" }} />
        <Stack.Screen name="anmList" component={AnmListScreen} options={{ title: "ANM" }} />
        <Stack.Screen name="instStudent" component={AdminStudentsList} options={{ title: "Students" }} />
        <Stack.Screen name="pctsList" component={PctsListScreen} options={{ title: "PCTS List" }} />
        <Stack.Screen name="pctsDetail" component={PctsDetailScreen} options={{ title: "PCTS Detail" }} />
    </Stack.Navigator>
)