import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router';
import Footer from './components/Footer';
import { useState } from 'react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className='App'>
      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      {/* show side bar (absolutely positioned) */}
      <Sidebar isSidebarOpen={isSidebarOpen} />
      {/* outlet shows main page content */}
      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
