import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/home";
import Play from "./components/pages/play";
import Result from "./components/pages/result";

function App() {
  return (
    <div className="bg-primary-50 h-full">
      <div>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="play" element={<Play />} />
            <Route path="result" element={<Result />} />
          </Routes>
        </HashRouter>
      </div>
    </div>
  );
}

export default App;
