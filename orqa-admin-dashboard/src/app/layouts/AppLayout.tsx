import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../../components/layout/Footer";
import { Navbar } from "../../components/layout/Navbar";
import { Sidebar } from "../../components/layout/Sidebar";
import "./AppLayout.css";

export function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="app-layout__main">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="app-layout__content">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}
