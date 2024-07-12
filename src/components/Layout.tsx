import { Outlet } from "react-router-dom"

import NewTestButton from "./NewTestButton"

import TestManagerContextProvider from "../context/TestManagerContext"
import Navbar from "./Navbar"

export default function Layout() {
  return (
    <TestManagerContextProvider>
      <Navbar />
      <NewTestButton />
      <Outlet />
    </TestManagerContextProvider>
  )
}
