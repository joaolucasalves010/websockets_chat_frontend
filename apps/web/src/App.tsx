import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUp from "./pages/SignUp"

export function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SignUp />} path="/signup"/>
      </Routes>
    </BrowserRouter>
  )
}
