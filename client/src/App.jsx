import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import PlanTrip from './pages/PlanTrip';
import Chatbot from './pages/Chatbot';
import Hotels from './pages/Hotels';
import HotelDetail from './pages/HotelDetail';
import Itinerary from './pages/Itinerary';
import Bookings from './pages/Bookings';
import Profile from './pages/Profile';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import Heritage from './pages/Heritage';
import HeritageDetail from './pages/HeritageDetail';
import Notifications from './pages/Notifications';
import Security from './pages/Security';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import SupplierDashboard from './pages/SupplierDashboard';
import Guides from './pages/Guides';
import Transport from './pages/Transport';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/guides" element={<Guides />} />
                <Route path="/transport" element={<Transport />} />
                <Route path="/supplier" element={<SupplierDashboard />} />
                <Route path="/plan-trip" element={<PlanTrip />} />
                <Route path="/chatbot" element={<Chatbot />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/hotel/:hotelName" element={<HotelDetail />} />
                <Route path="/itinerary" element={<Itinerary />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/destinations" element={<Destinations />} />
                <Route path="/destination/:destinationName" element={<DestinationDetail />} />
                <Route path="/heritage" element={<Heritage />} />
                <Route path="/heritage/:heritageName" element={<HeritageDetail />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/security" element={<Security />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
