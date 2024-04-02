import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { Outlet, useLocation } from 'react-router';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';
import Toast from './components/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { removeToast } from './features/toastSlice';
import { setUserAuthState } from './features/authSlice';
import { auth } from './firebase/config';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const toast = useSelector((state) => state.toast);
  const user = useSelector((state) => state.auth.userEmail);
  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  useEffect(() => {
    const showToast = setTimeout(() => {
      dispatch(removeToast());
    }, 4000);

    return () => clearTimeout(showToast);
  }, [toast]);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          setUserAuthState({ isSignedin: true, userEmail: authUser.email })
        );
      } else {
        dispatch(setUserAuthState({ isSignedin: false, userEmail: '' }));
      }
    });
  }, [user]);

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
      <div className={`curtain ${isSidebarOpen ? 'active' : ''}`}></div>
      <main>
        <Outlet />
        {/* custom toasts alerts */}
        <Toast />
      </main>

      <Footer />
    </div>
  );
}

export default App;
