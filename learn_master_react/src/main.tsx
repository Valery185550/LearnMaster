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
import { FindCourse } from "./pages/findCourse/FindCourse"

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
