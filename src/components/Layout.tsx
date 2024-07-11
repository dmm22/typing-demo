import { Outlet } from "react-router-dom"

import NewTestButton from "./NewTestButton"

import TestManagerContextProvider from "../context/TestManagerContext"

export default function Layout() {
  return (
    <TestManagerContextProvider>
      <NewTestButton />
      <Outlet />
    </TestManagerContextProvider>
  )
}
