import { BrowserRouter, Routes, Route } from "react-router-dom"

import TestPage from "./pages/Test/TestPage"
import TestResultsPage from "./pages/TestResults/TestResultsPage"
import UserProfilePage from "./pages/UserProfile/UserProfilePage"
import Layout from "./components/Layout"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<TestPage />} />
          <Route path="/results" element={<TestResultsPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
