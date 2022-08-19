// Import Modules
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';

// Import Styles
import 'antd/dist/antd.css';
import './App.css';

// Import Routes
import { RegisterMinion } from './windows/Dashboard/Minion/RegisterMinion/RegisterMinion';
import { AuthProvider } from './context/authContext';
import CmdView from './windows/Dashboard/CmdView';
import Dashboardlayout from './windows/Dashboard/layout/Dashboardlayout';
import Minion from './windows/Dashboard/Minion/Minion';
import MinionView from './windows/Dashboard/Minion/MinionView';
import MinionsList from './windows/Dashboard/MinionsList/MinionsList';
import Login from './windows/Login/Login';
import { AdminProfile } from './windows/Dashboard/AdminProfile/AdminProfile';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboardlayout />}>
            <Route index element={<MinionsList />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="cmd" element={<CmdView />} />
            <Route path="minion">
              <Route index element={<Minion />} />
              <Route path=":minionId" element={<MinionView />} />
              <Route path="register" element={<RegisterMinion />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
