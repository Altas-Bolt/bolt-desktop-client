// Import Modules
import {
  MemoryRouter as Router,
  Route,
  Routes,
  useParams,
} from 'react-router-dom';

// Import Styles
import 'antd/dist/antd.css';
import './App.css';

// Import Routes
import Home from './windows/Home/Home';
import MinionsList from './windows/Dashboard/MinionsList/MinionsList';
import Minion from './windows/Dashboard/Minion/Minion';
import Dashboardlayout from './windows/Dashboard/layout/Dashboardlayout';
import MinionApplicationList from './windows/Dashboard/Minion/ApplicationList';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboardlayout />}>
          <Route index element={<MinionsList />} />
          <Route path="minion">
            <Route index element={<Minion />} />
            <Route path=":minionId" element={<MinionApplicationList />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
