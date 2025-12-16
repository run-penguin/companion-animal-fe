import { Routes, Route } from "react-router-dom";
import { useLoading } from "./components/useLoading";

import Home from "./pages/Home";
import LostListPage from "./pages/lost/List";
import LostMapPage from "./pages/lost/Map";
import RescueListPage from "./pages/rescue/List";

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
          <Route path="/lost/list" element={<LostListPage />} />
          <Route path="/lost/map" element={<LostMapPage />} />
          <Route path="/rescue/list" element={<RescueListPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
