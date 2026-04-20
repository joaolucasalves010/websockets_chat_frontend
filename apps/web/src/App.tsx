import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Home from "./pages/Home"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SignUp />} path="/signup"/>
        <Route element={<SignIn />} path="/signin" />
        <Route element={<Home />} path="/" />
      </Routes>
    </BrowserRouter>
  )
}
