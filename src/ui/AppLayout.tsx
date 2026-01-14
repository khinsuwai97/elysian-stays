import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';

export default function AppLayout() {
    return (
        <div className="flex h-screen bg-sand-50 dark:bg-sand-900">
            <Sidebar />
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}