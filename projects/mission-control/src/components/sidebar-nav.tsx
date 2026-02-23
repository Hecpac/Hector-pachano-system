"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarNavProps = {
  mode: "desktop" | "mobile";
};

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/approvals", label: "Aprobaciones" },
  { href: "/tasks", label: "Tareas" },
  { href: "/agents", label: "Agentes" },
  { href: "/security", label: "Seguridad" }
];

export function SidebarNav({ mode }: SidebarNavProps) {
  const pathname = usePathname();
  const navClass = mode === "desktop" ? "nav nav-desktop" : "nav nav-mobile";

  return (
    <nav className={navClass} aria-label="Navegacion principal">
      {navItems.map((item) => {
        const active = pathname === item.href;
        const linkClass = active ? "nav-link is-active" : "nav-link";

        return (
          <Link key={item.href} href={item.href} className={linkClass}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
