import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/layout/Navbar";
import { Sidebar } from "../../components/layout/Sidebar";
import { Footer } from "../../components/layout/Footer";
import "./AppLayout.css";

export function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="app-layout__main">
        <Navbar />

        <main className="app-layout__content">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}
