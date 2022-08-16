// Import Modules
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

// Import Styles
import './App.css';
import 'antd/dist/antd.css';

// Import Routes
import Home from './windows/Home/Home';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
