import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import AppLayout from './ui/AppLayout';
import LoginPage from './ui/components/Login';
import Dashboard from './ui/pages/Dashboard';
import Bookings from './ui/pages/Bookings';
import BookingDetails from './ui/pages/BookingDetails';
import CheckIn from './ui/pages/CheckIn';
import CheckOut from './ui/pages/CheckOut';
import Cabins from './ui/pages/Cabins';
import Users from './ui/pages/Users';
import Settings from './ui/pages/Settings';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand-50 dark:bg-sand-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-forest-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sand-600 dark:text-sand-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <LoginPage />}
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >

        <Route index element={<Dashboard />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="bookings/:bookingId" element={<BookingDetails />} />
        <Route path="checkin/:bookingId" element={<CheckIn />} />
        <Route path="checkout/:bookingId" element={<CheckOut />} />
        <Route path="cabins" element={<Cabins />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#476052',
                color: '#fff',
                padding: '16px',
                borderRadius: '8px',
              },
              success: {
                style: {
                  background: '#476052',
                },
                iconTheme: {
                  primary: '#fff',
                  secondary: '#476052',
                },
              },
              error: {
                style: {
                  background: '#ef4444',
                },
                iconTheme: {
                  primary: '#fff',
                  secondary: '#ef4444',
                },
              },
            }}
          />
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;