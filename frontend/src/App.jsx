import React, { useEffect } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import AllSchemes from "./pages/AllSchemes";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Documents from "./pages/Documents";
import Achievements from "./pages/Achievements";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewSchemesDetails from "./pages/ViewSchemesDetails";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import ApplicationsHistory from "./pages/ApplicationsHistory";
import ApplicationForm from "./components/ApplicationForm/ApplicationForm";
import AllOrders from "./components/AdminPages/AllOrders";
import AddSchemes from "./components/AdminPages/AddSchemes";
import UpdateSchemes from "./components/AdminPages/UpdateSchemes";
import NoticesPage from "./pages/NoticesPage";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/all-schemes" element={<AllSchemes />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/notices-page" element={<NoticesPage />} />

        <Route path="/achievements" element={<Achievements />} />
        <Route path="/apply/:id" element={<ApplicationForm />} />
        <Route
          path="/view-schemes-details/:id"
          element={<ViewSchemesDetails />}
        />
        <Route path="/updateschemes/:id" element={<UpdateSchemes />} />

        {/* Profile Routes */}
        <Route path="/profile" element={<Profile />}>
          {role !== "admin" ? (
            <Route index element={<Cart />} />
          ) : (
            <Route index element={<AllOrders />} />
          )}
          {role === "admin" && (
            <Route path="add-schemes" element={<AddSchemes />} />
          )}
          <Route
            path="applications-history"
            element={<ApplicationsHistory />}
          />
          // ✅ Fixed
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
