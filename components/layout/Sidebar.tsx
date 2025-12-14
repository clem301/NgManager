'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuItem {
  label: string;
  href: string;
  icon: string;
}

const menuItems: MenuItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { label: 'Créations', href: '/creations', icon: '✨' },
  { label: 'Demandes', href: '/demandes', icon: '📋' },
  { label: 'Historique', href: '/historique', icon: '📜' },
  { label: 'Messagerie', href: '/messagerie', icon: '💬' },
  { label: 'Forums', href: '/forums', icon: '💭' },
  { label: 'Profil', href: '/profil', icon: '👤' },
];

const adminItems: MenuItem[] = [
  { label: 'Zone Staff', href: '/staff', icon: '🛡️' },
  { label: 'Propriétaire', href: '/proprietaire', icon: '👑' },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <aside className="fixed left-0 top-20 bottom-0 w-64 glass border-r border-white/10 p-6 hidden lg:block">
      <div className="flex flex-col gap-6">
        {/* Main menu */}
        <div>
          <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">Menu Principal</h3>
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-glass transition-all
                  ${isActive(item.href)
                    ? 'glass-strong shadow-glow text-white'
                    : 'text-white/60 hover:text-white hover:glass'
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Admin menu */}
        <div>
          <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">Administration</h3>
          <nav className="flex flex-col gap-2">
            {adminItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-glass transition-all
                  ${isActive(item.href)
                    ? 'glass-strong shadow-glow text-white'
                    : 'text-white/60 hover:text-white hover:glass'
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Country info */}
        <div className="mt-auto pt-6 border-t border-white/10">
          <div className="glass-strong p-4 rounded-glass">
            <div className="text-xs text-white/50 mb-1">Votre pays</div>
            <div className="text-sm font-bold">🇫🇷 Nouvelle Gaule</div>
            <div className="text-xs text-white/60 mt-2">48 membres actifs</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
