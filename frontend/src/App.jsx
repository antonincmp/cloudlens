import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/Layout"
import Landing from "./pages/Landing"
import Overview from "./pages/Overview"
import Services from "./pages/Services"
import Recommendations from "./pages/Recommendations"
import Infrastructure from "./pages/Infrastructure"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/overview" element={<Layout><Overview /></Layout>} />
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/recommendations" element={<Layout><Recommendations /></Layout>} />
        <Route path="/infrastructure" element={<Layout><Infrastructure /></Layout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
