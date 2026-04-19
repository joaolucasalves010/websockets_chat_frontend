import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"

export function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SignUp />} path="/signup"/>
        <Route element={<SignIn />} path="/signin" />
      </Routes>
    </BrowserRouter>
  )
}
