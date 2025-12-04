import { Routes, Route } from "react-router-dom";
import { useLoading } from "./components/useLoading";

import Home from "./pages/lost/Home";
import LostMap from "./pages/lost/LostMap";

import "./App.css";
import { LostProvider } from "./components/lost/LostContext";

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

      <LostProvider>
        <div className="wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<LostMap />} />
          </Routes>
        </div>
      </LostProvider>
    </>
  );
}

export default App;
