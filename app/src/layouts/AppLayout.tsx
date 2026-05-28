import { Outlet } from 'react-router';
import SideNavBar from '../components/SideNavBar';
import TopAppBar from '../components/TopAppBar';

export default function AppLayout() {
  return (
    <div className="bg-background text-on-surface font-body-md antialiased overflow-hidden flex h-screen w-full">
      <SideNavBar />
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative ml-70">
        <TopAppBar />
        
        {/* Dynamic Page Content injects here */}
        <div className="flex-1 overflow-hidden">
            <Outlet /> 
        </div>
      </main>
    </div>
  );
}