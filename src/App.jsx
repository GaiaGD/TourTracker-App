import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TourContext } from './context/tour-context';
import HomePage from './components/Homepage';
import ResultsPage from './components/ResultsPage';
import TTLogo from "../public/TT-logo.svg";
import './global.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resultpage/:artistId" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
