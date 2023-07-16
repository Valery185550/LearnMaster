import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import {HomePage} from "./pages/start/HomePage"
import "./index.css"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import StudentHomePage from "./pages/student/StudentHomePage"
import {TeacherHomePage} from "./pages/teacher/TeacherHomePage";
import { AuthProvider, AuthProviderProps } from "react-oidc-context";
import { FindCourse } from "./pages/findCourse/FindCourse";
import { LessonsPerCourse } from "./pages/lessons/LessonsPerCourse";
import { addLessonLoader, chatLoader, homeworkLoader, homeworksLoader, loaderLesson, loaderLessons } from "./loaders";
import { AddLesson } from "./pages/addLesson/AddLesson";
import { LessonPage } from "./pages/lesson/LessonPage";
import { HomeworkList } from "./pages/homeworkList/HomeworkList"
import { HomeworkPage } from "./pages/homeworkPage/HomeworkPage"
import { ChatPage } from "./pages/chatPage/ChatPage"
import { Notifications } from "./pages/notifications/Notifications"

const router = createBrowserRouter([{
  path:"/",
  element:<HomePage/>
  },
  {
    path:"/Student",
    element:<StudentHomePage/>
  },
  {
    path:"/Teacher",
    element:<TeacherHomePage/>
  },

  {
    path:"/FindCourse",
    element:<FindCourse/>
  },

  {
    path:"/Lessons/:courseId",
    element:<LessonsPerCourse/>,
    loader:loaderLessons
  },

  {
    path:"/Lesson/:lessonId",
    element:<LessonPage/>,
    loader:loaderLesson
  },

  {
    path:"/AddLesson/:parentId/:courseId",
    element:<AddLesson/>,
    loader:addLessonLoader
  },

  {
    path:"/Homeworks/:lessonId",
    element:<HomeworkList/>,
    loader:homeworksLoader
  },

  {
    path:"/Homework/:homeworkId",
    element:<HomeworkPage/>,
    loader:homeworkLoader
  },

  {
    path:"/Chat/:courseId",
    element:<ChatPage/>,
    loader:chatLoader
  },

  {
    path:"/Notifications",
    element:<Notifications/>,
  },
])

const oidcConfig:AuthProviderProps = {
  authority: "https://localhost:5001",
  client_id: "js",
  redirect_uri: "https://localhost:5003",
  response_type: "code",
  scope:"openid profile api1 role",
  post_logout_redirect_uri:"https://localhost:5003"
};


ReactDOM.createRoot(document.getElementById("root")!).render(
    <AuthProvider {...oidcConfig} loadUserInfo={true}>
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
    </AuthProvider>
)
