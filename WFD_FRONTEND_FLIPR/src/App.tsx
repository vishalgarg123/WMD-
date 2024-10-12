// import "./App.css"
// import 'antd/dist/antd.css'; // Import Ant Design styles
import React from 'react';
import {ThemeProviderComponent }from "./context/ThemeContext"
import LoginPage from "./components/loginPage"
import ProtectedRoute from './components/ProtectedRoute';
import HelloWorld from './HelloWorld';

import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import SignupPage from "./components/signupPage"
import DashboardPage from './pages/DashboardPage';
import Sidebar from './components/sideBar';
import AccountPage from './pages/AccountPage';
import FooterPage from './components/footerPage';
import SettingsPage from './pages/SettingPage';

import ReportingAnalytics from './pages/Reportpage';
import TransactionPage from './pages/TransactionPage';
import WalletPage from './pages/WalletPage';
const App: React.FC = () => {
  return (
    <ThemeProviderComponent>
  <Router>
    {/* <HelloWorld/>
     */}
     {/* <ResponsiveAppBar/> */}
     <Sidebar/>
    
    <Routes>
      <Route path='/' element={<ProtectedRoute><DashboardPage/></ProtectedRoute>}/>
      {/* <Route path='/dashboard' element={<DashboardPage/>}/> */}
     <Route path='/signin' element={<LoginPage/>}/>
     <Route path="/signup" element={<SignupPage/>}/>
     <Route path="/blog" element={<HelloWorld/>}/>
     <Route path="/account" element={<AccountPage/>}/>
     <Route path="/settings" element={<ProtectedRoute><SettingsPage/></ProtectedRoute>}/>
     {/* <Route path="/home" element={<HomePage/>}/> */}

     <Route path="/transactions" element={<ProtectedRoute><TransactionPage/></ProtectedRoute>}/>
     <Route path="/reports" element={<ProtectedRoute><ReportingAnalytics/></ProtectedRoute>}/>
     <Route path="/wallets" element={<ProtectedRoute><WalletPage/></ProtectedRoute>}/>

    </Routes>
    <FooterPage/>
  </Router>
  </ThemeProviderComponent>

  );
};

export default App;