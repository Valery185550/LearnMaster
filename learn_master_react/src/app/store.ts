import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import userReducer  from "./userSlice"; 
import { courseSlice } from "./coursesSlice";

export const store = configureStore({
  reducer: {
    user:userReducer,
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
