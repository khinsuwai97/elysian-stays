import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
    HomeIcon,
    CalendarIcon,
    CabinIcon,
    UsersIcon,
    SettingsIcon,
    MoonIcon,
    SunIcon,
    LogoutIcon
} from './Icons';

interface NavItem {
    path: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
}

const navItems: NavItem[] = [
    { path: '/', icon: HomeIcon, label: 'Home' },
    { path: '/bookings', icon: CalendarIcon, label: 'Bookings' },
    { path: '/cabins', icon: CabinIcon, label: 'Cabins' },
    { path: '/users', icon: UsersIcon, label: 'Users' },
    { path: '/settings', icon: SettingsIcon, label: 'Settings' },
];

export default function Sidebar() {
    const location = useLocation();
    const { user, logout } = useAuth();
    const { isDark, toggleTheme } = useTheme();

    return (
        <aside className="w-64 lg:w-72 h-screen bg-sand-100 dark:bg-sand-800 border-r border-sand-300 dark:border-sand-700 p-5 lg:p-6 flex flex-col animate-slideIn overflow-y-auto">
            <Logo />

            <nav className="flex-1 mb-6 space-y-1">
                {navItems.map((item, index) => {
                    const Icon = item.icon;

                    const isActive =
                        item.path === '/'
                            ? location.pathname === '/'
                            : location.pathname.startsWith(item.path);

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-item ${isActive ? 'nav-item-active' : 'nav-item-inactive'
                                }`}
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <Icon className="w-5 h-5 shrink-0" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="space-y-3 border-t border-sand-300 dark:border-sand-700 pt-5">
                <div className="flex items-center gap-3 px-3 py-2">
                    <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-br from-terracotta to-gold flex items-center justify-center text-white font-display font-semibold text-lg">
                        {user?.fullName?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-sand-900 dark:text-sand-100 truncate">
                            {user?.fullName}
                        </p>
                        <p className="text-xs text-sand-600 dark:text-sand-400 truncate">
                            {user?.email}
                        </p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={toggleTheme}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-sand-200 dark:bg-sand-700 text-sand-700 dark:text-sand-300 hover:bg-sand-300 dark:hover:bg-sand-600 transition-all cursor-pointer"
                        aria-label="Toggle theme"
                        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                    </button>
                    <button
                        onClick={logout}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-terracotta text-white hover:bg-opacity-90 transition-all cursor-pointer"
                        title="Logout"
                    >
                        <LogoutIcon className="w-5 h-5" />
                        <span className="text-sm font-medium ">Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}