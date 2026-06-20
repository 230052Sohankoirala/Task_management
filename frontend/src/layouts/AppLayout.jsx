import { useState } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { Sidebar } from "../components/layout/Sidebar";
import { Navbar } from "../components/layout/Navbar";
import { MobileSidebar } from "../components/layout/MobileSidebar";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar collapsed={collapsed} />
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="app-main">
        <Navbar onMenu={() => setMobileOpen(true)} onCollapse={() => setCollapsed((value) => !value)} />
        <main className="content">
          <Breadcrumbs />
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
