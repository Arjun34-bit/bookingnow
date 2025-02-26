import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingPage from "./miscellenous/LoadingPage";
import Vendor from "./pages/Vendor";
import VendorHome from "./pages/VendorHome";

// Lazy-loaded components
const Home = lazy(() => import("./pages/Home"));
const Listings = lazy(() => import("./pages/Listings"));
const Register = lazy(() => import("./components/Register"));
const ViewListing = lazy(() => import("./pages/ViewListing"));
const ViewRoom = lazy(() => import("./pages/ViewRoom"));
const BookingPage = lazy(() => import("./pages/Booking"));
const BookingHistory = lazy(() => import("./pages/BookingHistory"));

const Layout = ({ children }) => {
  const location = useLocation();

  // Hide Navbar & Footer for Vendor routes
  const isVendorRoute = location.pathname.startsWith("/vendor");

  return (
    <>
      {!isVendorRoute && <Navbar />}
      <Suspense fallback={<LoadingPage />}>{children}</Suspense>
      {!isVendorRoute && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing" element={<Listings />} />
          <Route path="/register" element={<Register />} />
          <Route path="/view/:id" element={<ViewListing />} />
          <Route path="/room/:id" element={<ViewRoom />} />
          <Route path="/book/:id" element={<BookingPage />} />
          <Route path="/booking-history" element={<BookingHistory />} />
          {/* Vendor Route */}
          <Route path="/vendor" element={<Vendor />} />
          <Route path="/vendor/home" element={<VendorHome />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
