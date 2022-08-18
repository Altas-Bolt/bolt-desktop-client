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
import MinionView from './windows/Dashboard/Minion/MinionView';
import CmdView from './windows/Dashboard/CmdView';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboardlayout />}>
          <Route index element={<MinionsList />} />
          <Route path="cmd" element={<CmdView />} />
          <Route path="minion">
            <Route index element={<Minion />} />
            <Route path=":minionId" element={<MinionView />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
