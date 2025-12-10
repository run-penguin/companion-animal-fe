import { Routes, Route } from "react-router-dom";
import { useLoading } from "./components/useLoading";

import Home from "./pages/lost/Home";
import Map from "./pages/lost/Map";

import "./App.css";

function App() {
  const { isLoading } = useLoading();

  return (
    <>
      <div className={`loading ${isLoading ? "active" : ""}`}>
        <div className="box">
          <div className="loader-text">Loading</div>
          <div className="loader"></div>
        </div>
      </div>

      <div className="wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
