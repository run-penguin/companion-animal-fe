import { Routes, Route } from "react-router-dom";
import { useLoading } from "./components/useLoading";

import Home from "./pages/loss/Home";
import Header from "./components/Header";

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
      <Header />

      <div className="wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
