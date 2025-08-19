import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Hospitals from './pages/Hospitals';
import Empanelment from './pages/Empanelment';
import HospitalEmpanelmentForm from './pages/HospitalEmpanelmentForm';
import AdminPanel from './pages/AdminPanel';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Feedback from './pages/Feedback';

function App() {
  return (
    <AdminAuthProvider>
      <Router>
        <div className="font-sans bg-gray-50">
          <Header />
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/hospitals" element={<Hospitals />} />
              <Route path="/empanelment" element={<Empanelment />} />
              <Route path="/hospital-empanelment-form" element={<HospitalEmpanelmentForm />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              
              {/* Feedback Routes */}
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/feedback/opinion" element={<Feedback />} />
              <Route path="/feedback/media" element={<Feedback />} />
              <Route path="/feedback/success-stories" element={<Feedback />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AdminAuthProvider>
  );
}

export default App;
