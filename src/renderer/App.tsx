// Import Modules
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';

// Import Styles
import 'antd/dist/antd.css';
import './App.css';

// Import Routes
import { AppProvider } from './context/appContext';
import { AuthProvider } from './context/authContext';
import AddEmp from './windows/Dashboard/addEmp/addEmp';
import CmdView from './windows/Dashboard/CmdView';
import CreateEmp from './windows/Dashboard/CreateEmployee/CreateEmp';
import Home from './windows/Dashboard/Home/Home';
import Dashboardlayout from './windows/Dashboard/layout/Dashboardlayout';
import Minion from './windows/Dashboard/Minion/Minion';
import MinionView from './windows/Dashboard/Minion/MinionView';
import { RegisterMinion } from './windows/Dashboard/Minion/RegisterMinion/RegisterMinion';
import MinionsList from './windows/Dashboard/MinionsList/MinionsList';
import ScanReports from './windows/Dashboard/ScanReports/ScanReports';
import Login from './windows/Login/Login';

export default function App() {
  const queryClient = new QueryClient();
  // useEffect(() => {
  //   setTimeout(() => {

  //   }, 15000);
  // }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboardlayout />}>
                <Route index element={<Home />} />
                <Route path="keys" element={<MinionsList />} />
                <Route path="cmd" element={<CmdView />} />
                <Route path="scans" element={<ScanReports />} />
                <Route path="minion">
                  <Route index element={<Minion />} />
                  <Route path=":minion_key" element={<MinionView />} />
                  <Route path="register" element={<RegisterMinion />} />
                </Route>
                <Route path="add" element={<AddEmp />} />

                <Route path="create_emp" element={<CreateEmp />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}
