import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const courseSlice = createApi({
    reducerPath:"courses",
    baseQuery:fetchBaseQuery({baseUrl:"https://localhost:7282/Home/"}),
    endpoints:(builder)=>({
        getCourses:builder.query<string[], void>({
            query:()=>({
                url:"Courses",
                headers:{
                    "Accept": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem("tokenKey")
                }
            }),
            
        })
    })
})

export const { useGetCoursesQuery } = courseSlice;