//import AppShell from "./app/AppShell";

import { HashRouter, Routes, Route } from 'react-router';
import "./App.css";
import AppLayout from './layouts/AppLayout';
import Dashboard from './pages/Dashboard';
//import Workspace from './pages/Workspace';
//import History from './pages/History';
//import Settings from './pages/Settings';



export default function App() {
    
    /*
    return <AppShell />;
    */
    

    return (
        <HashRouter>
            <Routes>
                {/* The Layout Route */}
                <Route path="/" element={<AppLayout />}>
                    {/* Child Routes */}
                    <Route index element={<Dashboard />} />
                    {/* 
                    <Route path="workspace" element={<Workspace />} />
                    <Route path="history" element={<History />} />
                    <Route path="settings" element={<Settings />} />
                    */}
                </Route>
            </Routes>
        </HashRouter>
    );
}