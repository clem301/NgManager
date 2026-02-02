'use client';

import React from 'react';
import Link from 'next/link';
import Badge from '../ui/Badge';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow group-hover:shadow-glow-strong transition-shadow">
              <span className="text-lg font-bold text-white">NG</span>
            </div>
            <span className="text-xl font-bold text-white">Manager</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link 
              href="/" 
              className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              Accueil
            </Link>
            <Link 
              href="/dashboard" 
              className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              Dashboard
            </Link>
            <Link 
              href="/countries" 
              className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              Pays
            </Link>
            <Link 
              href="/admin" 
              className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              Admin
            </Link>
          </nav>

          {/* User section */}
          <div className="flex items-center gap-3">
            <Badge variant="president" dot>Président</Badge>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/30 flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
              <span className="text-sm font-semibold text-white">JD</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
