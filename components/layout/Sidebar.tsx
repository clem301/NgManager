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
  { label: 'Pays', href: '/countries', icon: '🏴' },
  { label: 'Profil', href: '/profile', icon: '👤' },
];

const adminItems: MenuItem[] = [
  { label: 'Administration', href: '/admin', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

  return (
    <aside className="fixed left-0 top-[73px] bottom-0 w-64 glass border-r border-white/5 p-5 hidden lg:block">
      <div className="flex flex-col h-full">
        {/* Main menu */}
        <div className="mb-8">
          <h3 className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-3 px-3">
            Navigation
          </h3>
          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all
                  ${isActive(item.href)
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
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
        <div className="mb-8">
          <h3 className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-3 px-3">
            Gestion
          </h3>
          <nav className="flex flex-col gap-1">
            {adminItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all
                  ${isActive(item.href)
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
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
        <div className="mt-auto pt-5 border-t border-white/10">
          <div className="glass p-4 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-xl">
                🏴
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Nouvelle Gaule</div>
                <div className="text-[11px] text-white/50">Votre pays</div>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-3 border-t border-white/10">
              <div className="text-center flex-1">
                <div className="text-lg font-bold text-white">48</div>
                <div className="text-[10px] text-white/40 uppercase">Membres</div>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center flex-1">
                <div className="text-lg font-bold text-green-400">12</div>
                <div className="text-[10px] text-white/40 uppercase">Bunkers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
