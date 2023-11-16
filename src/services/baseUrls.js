

// export const baseUrl = "http://api.zidni.academy/v1"
// export const baseUrl = "http://172.22.33.169:3355/v1"

//
// export const baseUrl = "http://139.59.0.129:5432/v1"

export const baseUrl = "https://9c58-122-177-211-212.ngrok-free.app/v1"

//auth
export const loginUrl = `${baseUrl}/auth/login`
export const getUserProfileUrl = `${baseUrl}/auth/profile`;
export const changePassUrl = `${baseUrl}/auth/changePassword`;
export const updateProfileUrl = `${baseUrl}/auth/editProfile`;
export const addDeviceTokenUrl = `${baseUrl}/auth/addDeviceToken`;
export const logoutUrl = `${baseUrl}/auth/logout`;



//institue
export const getInstituteUrl = `${baseUrl}/institute`;
export const getInstituteByTypeUrl = `${baseUrl}/institute/instituteType/`;
export const anmReportDownloadUrl = `${baseUrl}/auth/userReport`;
export const instituteReportUrl = `${baseUrl}/auth/userReportByInstitute?`;

//student
export const addStudentUrl = `${baseUrl}/student/add`;
export const allStudentUrl = `${baseUrl}/student`;
export const studentByInstituteUrl = `${baseUrl}/student/getListByInstitute?institute_id=`;
export const studentDetailUrl = `${baseUrl}/student/details?student_id=`;
export const getDashboardUrl = `${baseUrl}/student/dashboard`;
export const pendingTestInstituteUrl = `${baseUrl}/student/pendingHBTestsByInstitutesType?`
export const pendingTestStudentsUrl = `${baseUrl}/student/pendingHBTestsStudentsByInstitutesId?`
export const pendingTreatmentInstituteUrl = `${baseUrl}/student/pendingTreatmentByInstitutesType?`
export const pendingTreatmentStudentsUrl = `${baseUrl}/student/pendingTreatmentStudentsByInstitutesId?`
export const criticalByInstituteUrl = `${baseUrl}/student/criticalByInstitutesType?`
export const criticalByStudentsUrl = `${baseUrl}/student/criticalStudentsByInstitutesId?`
export const adminDashboardUrl = `${baseUrl}/student/adminDashboard`
export const adminDashListByType = `${baseUrl}/student/adminDashboardList/`
export const studentsByHbTypeUrl = `${baseUrl}/student/getStudentListByHBType/`
export const hospitalListUrl = `${baseUrl}/student/adminDashboardHospitalList/`
export const anmByHospitalUrl = `${baseUrl}/student/adminDashboardUsersListByHospitalId/`
export const instituteByHospitalUrl = `${baseUrl}/student/adminDashboardInstituteListByAnmId/`
export const studentsByTest_InstituteUrl = `${baseUrl}/student/adminDashboardStudentListByAnmIdByInstituteId/`
export const allAnmAshaUrl = `${baseUrl}/student/adminDashboardUsersListByUserType/`
export const instituteByAnmUrl = `${baseUrl}/student/adminDashboardInstituteListByAnmId/`
export const adminStudentsByInstUrl = `${baseUrl}/student/adminDashboardStudentListByAnmIdByInstituteId/`
export const underTreatmentInstUrl = `${baseUrl}/student/underTreatmentByInstitutesType?`
export const undertreatmentStudentsUrl = `${baseUrl}/student/underTreatmentStudentsByInstitutesId?`




//medicine
export const getMedicineListUrl = `${baseUrl}/medicine`;


//hbtest
export const addHbTestUrl = `${baseUrl}/hbtest/add`;
export const addTreatmentUrl = `${baseUrl}/hbtest/addTreatment`;


//PCTS
export const getPctsListByMinMaxUrl = `${baseUrl}/pctsRecords/getPctsRecordListByMinMax?`;
export const getPctsListUrls = `${baseUrl}/pctsRecords/list?`;
export const pctsAddHbTestUrl = `${baseUrl}/pctsRecords/addHbtest`;
export const pctsAddTreatmentUrl = `${baseUrl}/pctsRecords/addTreatment`;
export const pctsPendingHbTestUrl = `${baseUrl}/pctsRecords/pendingHBtest`;
export const pctsPendingTreatmentUrl = `${baseUrl}/pctsRecords/pendingTreatment`;
export const getPctsDetailUrl = `${baseUrl}/pctsRecords/details`
export const getPctsListByAnmUrl = `${baseUrl}/pctsRecords/listByAnm`;
export const addPctsTreatmentUrl = `${baseUrl}/pctsRecords/addTreatment`;


// news
export const getNewsScreenDataUrl = `${baseUrl}/videoUrls/list`;
export const getInstituteByBlockIdUrl = `${baseUrl}/institute/byBlock?`;
export const getBlockListUrl = `${baseUrl}/block/list`;
export const getAuthByInstituteIdUrl = `${baseUrl}/auth/byInstitute?`;
