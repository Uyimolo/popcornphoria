import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { Outlet, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import Toast from './components/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { removeToast } from './features/toastSlice';
import { setUserAuthState } from './features/authSlice';
import { auth } from './firebase/config';
import Search from './components/Search';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const toast = useSelector((state) => state.toast);
  const user = useSelector((state) => state.auth.userEmail);
  const themeMode = useSelector((state) => state.theme.mode);
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
    <div className={`App ${themeMode === 'light' ? 'light' : ''}`}>
      {/* custom toasts alerts */}
      <Toast />
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
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`curtain ${isSidebarOpen ? 'active' : ''}`}></div>
      {<Search />}

      <main>
        <Outlet />
      </main>

      {/* {!location.pathname.includes('/signup') &&
        !location.pathname.includes('/login') && <Footer />} */}
    </div>
  );
}

export default App;
