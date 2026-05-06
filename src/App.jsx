import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import TouristLayout from "./layout/touristLayout.jsx";
import { AuthProvider } from "./context/AuthContext";

const AdminApp = lazy(() => import("./admin/AdminApp"));
import HomePage from "./pages/tourist/HomePage";
import BlogPage from "./pages/tourist/BlogPage";
import BlogPostPage from "./pages/tourist/BlogPostPage";
import BlogCategoryPage from "./pages/tourist/BlogCategoryPage";
import TourPage from "./pages/tourist/TourPage";
import TourCountryPage from "./pages/tourist/TourCountryPage";
import TourDetailPage from "./pages/tourist/TourDetailPage";
import ContactPage from "./pages/tourist/ContactPage";
import TourPartnersPage from "./pages/tourist/TourPartnersPage";
import TourPartnerCategoryPage from "./pages/tourist/TourPartnerCategoryPage";
import TourPartnerListingPage from "./pages/tourist/TourPartnerListingPage";
import GalleryPage from "./pages/tourist/GalleryPage";
import GalleryCategoryPage from "./pages/tourist/GalleryCategoryPage";

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <div id="toast-root" />
      <Routes>
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>Loading admin...</div>}>
              <AdminApp />
            </Suspense>
          }
        />
        <Route element={<TouristLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/post/:slug" element={<BlogPostPage />} />
          <Route path="/blog/:category" element={<BlogCategoryPage />} />
          <Route path="/tours" element={<TourPage />} />
          <Route path="/tours/:country" element={<TourCountryPage />} />
          <Route path="/tours/:country/:tour" element={<TourDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/tour-partners" element={<TourPartnersPage />} />
          <Route path="/tour-partners/:category" element={<TourPartnerCategoryPage />} />
          <Route path="/tour-partners/:category/all" element={<TourPartnerListingPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/gallery/:category/all" element={<GalleryCategoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
