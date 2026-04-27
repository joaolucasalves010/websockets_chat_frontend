import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Home from "./pages/Home"
import EditUser from "./pages/EditUser"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SignUp />} path="/signup"/>
        <Route element={<SignIn />} path="/signin" />
        <Route element={<Home />} path="/" />
        <Route element={<EditUser />} path="/edit-user" />
      </Routes>
    </BrowserRouter>
  )
}
