import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import searchSlice from "./search";
import maildataSlice from "./maildata";

const store=configureStore({
    reducer:{auth:authSlice.reducer,
    search:searchSlice.reducer,
    mail:maildataSlice.reducer
}
})
export default store