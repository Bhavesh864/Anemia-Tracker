import { CollegeSvg, HouseSvg, InjectionSvgIcon, OtherPlaceSvg, PatienUserSvg, PregnantLadySvg, ReportSvgIcon, SchoolSvg, StudentUserSvg, TestTubeGroupSvgIcon, TestTubeSvg } from "../assets/svg/BasicIcons";
import React from "react";


export const homeOptionsArr = [
    {
        title: "Add Student",
        key: "studentPlaceSelect", //"addStudent",
        icon: <StudentUserSvg />,
        params: {
            data: {
                title: "Add Student",
                key: "addStudent",
                heading: "Select type to add new student under:",
            }
        }
    },
    {
        title: "HB Tests",
        key: "studentPlaceSelect", //"newHbTest",
        icon: <TestTubeSvg />,
        params: {
            data: {
                title: "HB Test",
                key: "newHbTest",
                heading: "Select type to add HB Test of student under:",
            }
        }
    },
    {
        title: "Critical/Severe Patients",
        key: "critical",
        icon: <PatienUserSvg />
    },
    {
        title: "Report/Analysis",
        key: "report",
        icon: <ReportSvgIcon />
    },
    {
        title: "Under Treatment",
        key: "underTreatment",
        icon: <InjectionSvgIcon />
    },
    {
        title: "Due for Treatment/Test",
        key: "dueTreatment",
        icon: <TestTubeGroupSvgIcon />
    },
    {
        title: "PCTS",
        key: "pctsList",
        icon: <PregnantLadySvg style={{ transform: [{ scale: 0.85 }] }} />
    }
]


export const placeTypes = [
    {
        title: "School",
        key: "school",
        icon: <SchoolSvg />
    },
    {
        title: "College",
        key: "college",
        icon: <CollegeSvg />
    },
    {
        title: "Madarsa",
        key: "madarsa",
        icon: <HouseSvg />
    },
    {
        title: "Adolescent",
        key: "home",
        icon: <OtherPlaceSvg />
    },
    {
        title: "PCTS",
        key: "pcts",
        icon: <PregnantLadySvg style={{ transform: [{ scale: 0.85 }] }} />
    },
]


export const ashaInstituteTypes = [
    {
        title: "Anganwadi",
        key: "aanganwadi",
        icon: <SchoolSvg />
    },
    {
        title: "Adolescent",
        key: "home",
        icon: <OtherPlaceSvg />
    },
    {
        title: "PCTS",
        key: "pcts",
        icon: <PregnantLadySvg style={{ transform: [{ scale: 0.85 }] }} />
    },
]



export const gendersArr = [
    {
        name: "Male",
        key: "male"
    },
    {
        name: "Female",
        key: "female"
    },
    {
        name: "Other",
        key: "other"
    }
]

export const gendersWithAll_Arr = [
    {
        name: "All",
        key: "all"
    },
    {
        name: "Male",
        key: "male"
    },
    {
        name: "Female",
        key: "female"
    },
    {
        name: "Other",
        key: "other"
    }
]


export const womenConditions = [
    {
        name: "Is she pregnant",
        key: "pregnant",
    },
    {
        name: "Is she lactating mother",
        key: "lactating_mother",
    },
    {
        name: "Is she Animatic",
        key: "animatic",
    },
    {
        name: "malnutrition",
        key: "malnutrition",
    }
]



export const bloodStatus = [
    {
        value: "1-7",
        name: "SEVERE",
        key: "severe",
        hbValue: 5
    },
    {
        value: "8-10",
        name: "MODERATE",
        key: "moderate",
        hbValue: 9
    },
    {
        value: "Above 10",
        name: "NORMAL",
        key: "normal",
        hbValue: 12
    }
]



export const roleTitle = {
    anm: "Anm",
    asha: "Asha",
    reportingOperator: "Reporting Operator",
    reportingOperatorBlockWise: "Reporting Operator BlockWise",
}


export const hbTestStatuses = [
    {
        name: "All",
        key: "all"
    },
    {
        name: "Not done",
        key: "nohbtest"
    },
    {
        name: "Done",
        key: "hbtested"
    }
]


export const pctsTypesArr = [
    {
        title: "Moderate",
        key: "moderate"
    },
    {
        title: "Healthy",
        key: "healthy"
    },
    {
        title: "Severe",
        key: "severe"
    }
]