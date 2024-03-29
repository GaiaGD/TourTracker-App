import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Homepage';
import ResultsPage from './components/ResultsPage';
import ErrorPage from './components/ErrorPage';
import './global.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='*' element={<ErrorPage/>} />
        <Route path="/" element={<HomePage />} />
        <Route path="/resultpage/:artistId" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
