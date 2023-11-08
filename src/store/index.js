import { configureStore } from "@reduxjs/toolkit";
import AppReducer from "./reducers/AppReducer";
import LanguageReducer from "./reducers/LanguageReducer";
import UserReducer from "./reducers/UserReducer";






const rootReducer = {
    app: AppReducer,
    user: UserReducer,
    language: LanguageReducer
};



const store = configureStore({
    reducer: rootReducer
});

export default store;