import { Routes, Route, useLocation } from "react-router-dom"

import SupabaseTest from "./lib/SupabaseTest";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import AdminGuard from "./admin/AdminGuard";
import AdminLayout from "./admin/AdminLayout";

import Home from "./pages/Home";
import Activites from "./pages/Activites";
import Actu from "./pages/Actualites";
import Adhesion from "./pages/Adhesion";
import Archives from "./pages/Archives";
import Association from "./pages/Association";
import MentionsLegales from "./pages/MentionsLegales";
import Confidentialite from "./pages/Confidentialite";
import FAQ from "./pages/FAQ";


export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
      <>
          <ScrollToTop />
          <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen transition-colors">
              {!isAdminRoute && <Navbar />}

              {!isAdminRoute &&
                  (import.meta.env.DEV ||
                      import.meta.env.VITE_SHOW_SUPABASE_TEST === "true") && (
                      <SupabaseTest />
                  )}

              <main className="flex-grow">
                  <Routes>
                      <Route path="/admin" element={
                              <AdminGuard>
                                  <AdminLayout />
                              </AdminGuard>
                          }
                      />
                      <Route path="/" element={<Home/>}/>
                      <Route path="/association" element={<Association/>}/>
                      <Route path="/activites" element={<Activites/>}/>
                      <Route path="/actu" element={<Actu />} />
                      <Route path="/adhesion" element={<Adhesion/>}/>
                      <Route path="/archives" element={<Archives/>}/>
                      <Route path="/mentions-legales" element={<MentionsLegales/>}/>
                      <Route path="/confidentialite" element={<Confidentialite/>}/>
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="*" element={<Home/>}/>
                  </Routes>
              </main>
              {!isAdminRoute && <Footer />}
          </div>
      </>
  );
}


