import { CHANGE_APP_STATUS, CHANGE_LOADING } from "../types";



const initialState = {
    appStatus: 0,
    loading: false,
}

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_APP_STATUS:
            return { ...state, appStatus: action.payload }
        case CHANGE_LOADING:
            return { ...state, loading: action.payload }
        default:
            return state;
    }
}



export default AppReducer;