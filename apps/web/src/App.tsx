import { Routes, Route } from "react-router-dom"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Home from "./pages/Home"
import EditUser from "./pages/EditUser"
import ErrorPage from "./pages/ErrorPage"
import ChatPage from "./pages/ChatPage"

export function App() {
  return (
    <Routes>
      <Route element={<SignUp />} path="/signup"/>
      <Route element={<SignIn />} path="/signin" />
      <Route element={<Home />} path="/" />
      <Route element={<EditUser />} path="/edit-user" />
      <Route element={<ChatPage />} path="/chat/:userId" />

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}
