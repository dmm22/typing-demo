import { BrowserRouter, Routes, Route } from "react-router-dom"

import TestPage from "./pages/Test/TestPage"
import TestResultsPage from "./pages/TestResults/TestResultsPage"
import UserProfilePage from "./pages/UserProfile/UserProfilePage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestPage />} />
        <Route path="/results" element={<TestResultsPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}
