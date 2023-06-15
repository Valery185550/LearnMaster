import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import RegistrationPage from "./pages/start/RegistrationPage"
import "./index.css"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthPage from "./pages/auth/AuthPage"
import StudentHomePage from "./pages/student/StudentHomePage"
import TeacherHomePage from "./pages/teacher/TeacherHomePage";
import Test from "./components/Test"
<<<<<<< HEAD
import Callback from "./components/Callback"
=======
>>>>>>> fb6ea660b66cd27b7cebd49ae7b288e15d5d27a2

const router = createBrowserRouter([{
  path:"/",
  element:<RegistrationPage/>
  },
  {
    path:"/AuthPage",
    element:<AuthPage/>
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
<<<<<<< HEAD
    path:"/Logout",
    element:<Test/>
  },
  {
    path:"/CallBack",
    element:<Callback/>
  }
=======
    path:"/Hello",
    element:<Test/>
  }

>>>>>>> fb6ea660b66cd27b7cebd49ae7b288e15d5d27a2
  
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
