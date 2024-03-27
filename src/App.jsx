import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { Outlet, useLocation } from 'react-router';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return (
    <div className='App'>
      <Header
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setShowSearchInput={setShowSearchInput}
        showSearchInput={showSearchInput}
      />
      {/* sidebar position : fixed; */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setShowSearchInput={setShowSearchInput}
      />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
