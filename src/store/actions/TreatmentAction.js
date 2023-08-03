import { AppConst } from "../../constants/AppConst";
import { addHbTestUrl, addPctsTreatmentUrl, addStudentUrl, addTreatmentUrl, adminDashboardUrl, adminDashListByType, adminStudentsByInstUrl, allAnmAshaUrl, allStudentUrl, anmByHospitalUrl, criticalByInstituteUrl, criticalByStudentsUrl, getAuthByInstituteIdUrl, getBlockListUrl, getDashboardUrl, getInstituteByBlockIdUrl, getInstituteByTypeUrl, getInstituteUrl, getMedicineListUrl, getNewsScreenData, getNewsScreenDataUrl, getPctsDetailUrl, getPctsListByAnmUrl, getPctsListByMinMaxUrl, getPctsListUrl, hospitalListUrl, instituteByAnmUrl, pctsAddHbTestUrl, pctsPendingHbTestUrl, pctsPendingTreatmentUrl, pendingTestInstituteUrl, pendingTestStudentsUrl, pendingTreatmentInstituteUrl, pendingTreatmentStudentsUrl, studentByInstituteUrl, studentDetailUrl, studentsByHbTypeUrl, underTreatmentInstUrl, undertreatmentStudentsUrl } from "../../services/baseUrls"
import { GetRequest, PostRequest } from "../../services/request"


export const getNewsData = async (loader) => {
    try {
        const response = await GetRequest({
            url: getNewsScreenDataUrl,
            loader: loader
        });

        return response;
    } catch (error) {

    }
}

export const getBlockList = async (loader) => {
    try {
        const response = await GetRequest({
            url: getBlockListUrl,
            loader: loader
        });

        return response;
    } catch (error) {

    }
}

export const getInstituteByBlockId = async (loader, blockId = 0, page) => {
    try {
        const response = await GetRequest({
            url: getInstituteByBlockIdUrl + `block_id=${blockId}&page=${page}&limit=10`,
            loader: loader
        });

        return response;
    } catch (error) {

    }
}


export const getAuthByInstituteId = async (loader, instituteId) => {
    try {
        const response = await GetRequest({
            url: getAuthByInstituteIdUrl + `institute_id=${instituteId}&page=0&limit=10`,
            loader: loader
        });

        return response;
    } catch (error) {

    }
}

export const getInstituteListAction = async () => {
    try {
        const response = await GetRequest({
            url: getInstituteUrl,
            loader: true
        });

        return response;
    } catch (error) {

    }
}



export const getInstituteListByType = async (type, search = "", edu = "gov", loader = true) => {
    try {
        const response = await GetRequest({
            url: getInstituteByTypeUrl + type + `?search=${search}&education_type=${edu}`,
            loader: loader
        });

        // AppConst.showConsoleLog("Inst: ", response)
        return response;
    } catch (error) {

    }
}




export const getStudentsByInst = async (id, search = "", loader = true) => {
    try {
        const response = await GetRequest({
            url: studentByInstituteUrl + id + `&search=${search}`,
            loader: loader
        });

        return response;
    } catch (error) {

    }
}


export const addHbTestAction = async (data) => {
    try {
        const res = await PostRequest({
            url: addHbTestUrl,
            loader: true,
            body: data
        });
        return res;
    } catch (error) {

    }
}


export const addPctsHbTestAction = async (data) => {
    try {
        const res = await PostRequest({
            url: pctsAddHbTestUrl,
            loader: true,
            body: data
        });
        return res;
    } catch (error) {

    }
}


export const getStudentDetail = async (id) => {
    try {
        const response = await GetRequest({
            url: studentDetailUrl + id,
            loader: true
        });

        return response;
    } catch (error) {

    }
}


export const getMedicineListAction = async () => {
    try {
        const response = await GetRequest({
            url: getMedicineListUrl
        });

        return response;
    } catch (error) {

    }
}



export const addNewStudent = async (data) => {
    try {
        const res = await PostRequest({
            url: addStudentUrl,
            loader: true,
            body: data
        });
        return res;
    } catch (error) {

    }
}



export const addNewTreatment = async (data) => {
    try {
        const res = await PostRequest({
            url: addTreatmentUrl,
            loader: true,
            body: data
        });

        return res;
    } catch (error) {

    }
}



export const getAllStudents = async (search = "") => {
    try {
        const response = await GetRequest({
            url: allStudentUrl + "?search=" + search + "&limit=100",
            loader: true
        });

        return response;
    } catch (error) {

    }
}



export const getDashboardAction = async () => {
    try {
        const response = await GetRequest({
            url: getDashboardUrl,
            loader: true
        });

        return response;
    } catch (error) {

    }
}



export const getPendingHbTestInstitutes = async (type) => {
    try {
        const response = await GetRequest({
            url: pendingTestInstituteUrl + `institute_type=${type}&limit=100`,
            loader: true
        });

        return response;
    } catch (error) {

    }
}



export const getPendingHbTestStudents = async (id, search = "") => {
    try {
        const response = await GetRequest({
            url: pendingTestStudentsUrl + `institute_id=${id}&search=${search}&limit=200`,
            loader: false
        });

        return response;
    } catch (error) {
        //console.log(error); 1
    }
}




export const getPendingTreatmentInstitutes = async (type) => {
    try {
        const response = await GetRequest({
            url: pendingTreatmentInstituteUrl + `institute_type=${type}&limit=100`,
            loader: true
        });

        return response;
    } catch (error) {

    }
}



export const getPendingTreatmentStudents = async (id, search = "") => {
    try {
        const response = await GetRequest({
            url: pendingTreatmentStudentsUrl + `institute_id=${id}&search=${search}`,
            loader: true
        });

        return response;
    } catch (error) {

    }
}




export const getCriticalByInstitutes = async (type, hbValue = 7) => {
    try {
        const response = await GetRequest({
            url: criticalByInstituteUrl + `institute_type=${type}&limit=100&hbValue=${hbValue}`,
            loader: true
        });

        return response;
    } catch (error) {

    }
}
export const getUndertreatmentInstitutes = async (type, hbValue = 7) => {
    try {
        const response = await GetRequest({
            url: underTreatmentInstUrl + `institute_type=${type}&limit=100`,
            loader: true
        });

        return response;
    } catch (error) {

    }
}



export const getCriticalByStudents = async (id, hbValue = 7, search = "") => {
    try {
        const response = await GetRequest({
            url: criticalByStudentsUrl + `${id ? "institute_id=" + id : ""}&hbValue=${hbValue}&search=${search}`,
            loader: true
        });

        return response;
    } catch (error) {

    }
}
export const getUndertreatmentStudents = async (id, search = "") => {
    try {
        const response = await GetRequest({
            url: undertreatmentStudentsUrl + `${id ? "institute_id=" + id : ""}&search=${search}`,
            loader: true
        });

        return response;
    } catch (error) {

    }
}



export const getAdminDashboard = async (type) => {
    try {
        const response = await GetRequest({
            url: adminDashboardUrl,
            loader: true
        });

        return response;
    } catch (error) {

    }
}



export const getAdminDashboardListByType = async (type, search = "") => {
    try {
        const response = await GetRequest({
            url: adminDashListByType + `${type}?search=${search}&page=0&limit=100`,
            loader: true
        });

        return response;
    } catch (error) {

    }
}



export const getStudentsListByHbType = async (type, search = "") => {
    try {
        const response = await GetRequest({
            url: studentsByHbTypeUrl + `${type}?search=${search}&page=0&limit=100`,
            loader: true
        });

        return response;
    } catch (error) {

    }
}




export const getHospitalListByType = async (type, search = "") => {
    try {
        const res = await GetRequest({
            url: hospitalListUrl + `${type}?search=${search}&page=0&limit=100`,
            loader: true
        });

        return res
    } catch (error) {

    }
}



export const getAnmByHospital = async (type, hospitalId, search = "") => {
    try {
        const res = await GetRequest({
            url: anmByHospitalUrl + `${type}?hospitalId=${hospitalId}&search=${search}&page=0&limit=100`,
            loader: true
        });

        return res
    } catch (error) {

    }
}




export const getAllAnmAshaByType = async (type, search = "") => {
    try {
        const res = await GetRequest({
            url: allAnmAshaUrl + `${type}?search=${search}&page=0&limit=100`,
            loader: true
        });

        return res
    } catch (error) {

    }
}



export const getInstitutesByAnm = async (type, id, instType, search = "", eduType = "gov") => {
    try {
        const res = await GetRequest({
            url: instituteByAnmUrl + `${type}?anm_id=${id}&search=${search}&institute_type=${instType}&education_type=${eduType}&page=0&limit=100`,
            loader: true
        });

        return res
    } catch (error) {

    }
}



export const getAdminStudentsByInst = async (type, anmId, instId, search = "") => {
    try {
        const res = await GetRequest({
            url: adminStudentsByInstUrl + `${type}?anm_id=${anmId}&instituteId=${instId}&search=${search}&page=0&limit=100`,
            loader: true
        });

        return res
    } catch (error) {

    }
}



export const getPctsListAction = async (type, loader = true, page = 0) => {
    try {
        const res = await GetRequest({
            url: getPctsListUrl + `limit=100&page=${page}&${type ? ("type=" + type) : ""}`,
            loader
        });
        return res;
    } catch (error) {

    }
}

export const getPctsListByMinMaxAction = async (loader = true, search = '') => {
    try {
        const res = await GetRequest({
            url: getPctsListByMinMaxUrl + `limit=9&page=0&min=1&max=8.9&search=${search}`,
            loader
        });
        return res;
    } catch (error) {
    }
}


export const getPendingPctsHbTest = async (page = 0) => {
    try {
        const res = await GetRequest({
            url: pctsPendingHbTestUrl + `?limit=100&page=${page}`,
            loader: true
        });
        return res;
    } catch (error) {

    }
}


export const getPendingPctsTreatment = async (page = 0) => {
    try {
        const res = await GetRequest({
            url: pctsPendingTreatmentUrl + `?limit=100&page=${page}`,
            loader: true
        });
        return res;
    } catch (error) {

    }
}


export const getPctsDetailAction = async (id = 0) => {
    try {
        const res = await GetRequest({
            url: getPctsDetailUrl + `?pctsId=${id}`,
            loader: true
        });
        return res;
    } catch (error) {

    }
}


export const getPctsListByAnmAction = async (search = "", page = 0) => {
    try {
        const res = await GetRequest({
            url: getPctsListByAnmUrl + `?limit=${100}${search ? ("&search=" + search) : ""}&page=${page}`,
        });
        return res;
    } catch (error) {

    }
}


export const addPctsTreatmentAction = async (data) => {
    try {
        const res = await PostRequest({
            url: addPctsTreatmentUrl,
            loader: true,
            body: data
        });

        return res;
    } catch (error) {

    }
}