import { Outlet } from "react-router-dom"
import TestManagerContextProvider from "../context/TestManagerContext"

export default function Layout() {
  return (
    <TestManagerContextProvider>
      <Outlet />
    </TestManagerContextProvider>
  )
}
