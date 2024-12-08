import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Optimize } from "./pages/Optimize"


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/optimize" element={<Optimize />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
