import logo from './logo.svg';
import {BrowserRouter as Router, 
        Routes,
        Route, } from "react-router-dom";
import './App.css';
import '../src/styles/text.css'
import '../src/styles/pricing-tool.css'
import '../src/styles/navbar.css'
import Home from "./pages/Home"
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
          <Route path="/Home" element={<Home />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
