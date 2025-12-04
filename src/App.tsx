import { Routes, Route } from "react-router-dom";
import { useLoading } from "./components/useLoading";

import Home from "./pages/loss/Home";
import Map from "./pages/loss/Map";

import "./App.css";
import { LossProvider } from "./components/loss/LossContext";

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

      <LossProvider>
        <div className="wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<Map />} />
          </Routes>
        </div>
      </LossProvider>
    </>
  );
}

export default App;
