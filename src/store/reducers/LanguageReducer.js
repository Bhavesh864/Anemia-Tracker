import { Change_Language } from "../types";






const initialState = {
    selectedLanguage: "en"
}


const LanguageReducer = (state = initialState, action) => {
    switch (action.type) {
        case Change_Language:
            return { ...state, selectedLanguage: action.payload }
        default:
            return state;
    }
}


export default LanguageReducer