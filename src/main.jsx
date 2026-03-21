// import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"

import "./index.css"
import store from "./store/store.js"
import App from "./App.jsx"

import {
  AuthLayout,
  Login,
  Signup,
  ForgotPassword,
  HomePage,
  Navbar,
  MailPage,
  MessagePage,
  MentionsPage,
  ClassesPage,
  FilesPage,
  AppsPage,
  AcademicsPage,
  AlumniPage,
  BlogsPage,
  PlacementPage,

  GrivancePage,
} from "./components/index.js"
import AIChatbot from "./pages/AIchatBot.jsx"

/* ---------------- ROUTER ---------------- */

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      /* ---------- PUBLIC / AUTH ROUTES (NO NAVBAR) ---------- */
      {
        index: true,
        element: (
          <AuthLayout authentication={false}>
            <HomePage />
          </AuthLayout>
        ),
      },
      {
        path:"home",
        element: (
          <AuthLayout authentication={false}>
            <HomePage />
          </AuthLayout>
        )
      },
      {
        path: "login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <AuthLayout authentication={false}>
            <ForgotPassword />
          </AuthLayout>
        ),
      },

      /* ---------- PROTECTED ROUTES (WITH NAVBAR + SIDEBAR) ---------- */
      {
        element: (
          <AuthLayout authentication={true}>
            <Navbar />
          </AuthLayout>
        ),

        children: [
          { path: "mail", element: <MailPage /> },
          { path: "messages", element: <MessagePage /> },
          { path: "mentions", element: <MentionsPage /> },
          { path: "classes", element: <ClassesPage /> },
          { path: "files", element: <FilesPage /> },
          { path: "apps", element: <AppsPage /> },
          { path: "academics", element: <AcademicsPage /> },
          { path: "alumni", element: <AlumniPage /> },
          { path: "blogs", element: <BlogsPage /> },
          { path: "placement", element: <PlacementPage /> },
          { path: "grievance", element: <GrivancePage /> },
          {path:"ai-chat",element:<AIChatbot />}
        ],
      },
    ],
  },
])

/* ---------------- RENDER ---------------- */

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  // </StrictMode>
)
