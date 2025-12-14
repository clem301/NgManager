'use client';

import React from 'react';
import Link from 'next/link';
import Badge from '../ui/Badge';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-glass bg-white/10 flex items-center justify-center group-hover:shadow-glow transition-all">
              <span className="text-xl font-bold">NG</span>
            </div>
            <span className="text-xl font-bold gradient-text">Manager</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              Accueil
            </Link>
            <Link href="/dashboard" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/creations" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              Créations
            </Link>
            <Link href="/demandes" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              Demandes
            </Link>
            <Link href="/messagerie" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              Messagerie
            </Link>
          </nav>

          {/* User section */}
          <div className="flex items-center gap-4">
            <Badge variant="president" glow>Président</Badge>
            <div className="w-10 h-10 rounded-full glass flex items-center justify-center cursor-pointer hover:shadow-glow transition-all">
              <span className="text-sm font-semibold">JD</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
