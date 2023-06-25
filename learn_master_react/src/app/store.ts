import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import authReducer  from "./authSlice"; 
import { courseSlice } from "./coursesSlice";

export const store = configureStore({
  reducer: {
    auth:authReducer,
    [courseSlice.reducerPath]:courseSlice.reducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(courseSlice.middleware),

  
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
