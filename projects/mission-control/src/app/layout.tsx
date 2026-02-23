import type { Metadata } from "next";

import { SidebarNav } from "@/components/sidebar-nav";

import "./globals.css";

export const metadata: Metadata = {
  title: "Mission Control",
  description: "Control local de prioridades, tareas y aprobaciones."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <div className="shell">
          <aside className="sidebar">
            <div className="brand">
              <p className="brand-kicker">Local</p>
              <h1>Mission Control</h1>
            </div>
            <SidebarNav mode="desktop" />
          </aside>
          <section className="content-shell">
            <header className="mobile-header">
              <div className="brand mobile-brand">
                <p className="brand-kicker">Local</p>
                <h1>Mission Control</h1>
              </div>
              <SidebarNav mode="mobile" />
            </header>
            <main className="main-content">{children}</main>
          </section>
        </div>
      </body>
    </html>
  );
}
