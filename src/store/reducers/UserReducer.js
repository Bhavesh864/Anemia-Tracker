import { AppConst } from "../../constants/AppConst";
import { SET_USER_DATA } from "../types";


const initialState = {
    user: {}
}



const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}


export default UserReducer;