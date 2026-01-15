import React, { useState } from 'react';
import StatCard from '../components/StatCard';
import { CalendarIcon, DollarIcon, CheckIcon, ChartIcon } from '../components/Icons';
import { mockBookings, mockCabins, mockSalesData, mockStayDuration, mockTodayActivity } from '../../mockData';

export default function Dashboard() {
    const [period, setPeriod] = useState('7');

    const stats = {
        bookings: mockBookings.length,
        sales: mockBookings.reduce((sum, b) => sum + b.totalPrice, 0),
        checkIns: mockBookings.filter(b => b.status === 'checked-in').length,
        occupancy: Math.round((mockBookings.filter(b => b.status !== 'checked-out').length / mockCabins.length) * 100)
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8 animate-fadeIn">
                <h1 className="text-4xl font-display font-semibold text-sand-900 dark:text-sand-100">
                    Dashboard
                </h1>
                <div className="flex gap-3">
                    {['7', '30', '90'].map((days) => (
                        <button
                            key={days}
                            onClick={() => setPeriod(days)}
                            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${period === days
                                ? 'bg-forest-600 text-white shadow-lg'
                                : 'bg-sand-200 dark:bg-sand-700 text-sand-700 dark:text-sand-300 hover:bg-sand-300 dark:hover:bg-sand-600'
                                }`}
                        >
                            Last {days} days
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="BOOKINGS"
                    value={stats.bookings}
                    icon={CalendarIcon}
                    color="bg-gradient-to-br from-blue-500 to-blue-600"
                    trend="↑ 12% from last period"
                />
                <StatCard
                    title="SALES"
                    value={`$${stats.sales.toLocaleString()}`}
                    icon={DollarIcon}
                    color="bg-gradient-to-br from-emerald-500 to-emerald-600"
                    trend="↑ 8% from last period"
                />
                <StatCard
                    title="CHECK INS"
                    value={stats.checkIns}
                    icon={CheckIcon}
                    color="bg-gradient-to-br from-amber-500 to-amber-600"
                    trend="→ Same as last period"
                />
                <StatCard
                    title="OCCUPANCY RATE"
                    value={`${stats.occupancy}%`}
                    icon={ChartIcon}
                    color="bg-gradient-to-br from-rose-500 to-rose-600"
                    trend="↑ 5% from last period"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="card p-6 animate-fadeIn">
                    <h3 className="text-xl font-display font-semibold text-sand-900 dark:text-sand-100 mb-6">
                        Sales Overview
                    </h3>
                    <div className="space-y-3">
                        {mockSalesData.map((day, index) => (
                            <div key={day.date} className="flex items-center gap-4">
                                <span className="text-sm text-sand-600 dark:text-sand-400 w-16">
                                    {day.date}
                                </span>
                                <div className="flex-1 h-8 bg-sand-100 dark:bg-sand-700 rounded-lg overflow-hidden relative">
                                    <div
                                        className="h-full bg-gradient-to-r from-forest-500 to-sage-500 rounded-lg transition-all duration-1000"
                                        style={{ width: `${(day.total / 8000) * 100}%`, animationDelay: `${index * 0.1}s` }}
                                    />
                                    <div
                                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold to-terracotta opacity-50"
                                        style={{ width: `${(day.extras / 8000) * 100}%` }}
                                    />
                                </div>
                                <div className="text-right min-w-[100px]">
                                    <p className="text-sm font-semibold text-sand-900 dark:text-sand-100">
                                        ${day.total.toLocaleString()}
                                    </p>
                                    <p className="text-xs text-sage-600 dark:text-sage-400">
                                        +${day.extras} extras
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card p-6 animate-fadeIn">
                    <h3 className="text-xl font-display font-semibold text-sand-900 dark:text-sand-100 mb-6">
                        Stay Duration Summary
                    </h3>
                    <div className="flex items-center justify-center mb-8">
                        <div className="relative w-48 h-48">
                            {mockStayDuration.map((item, index) => {
                                const total = mockStayDuration.reduce((sum, d) => sum + d.value, 0);
                                const rotation = mockStayDuration.slice(0, index).reduce((sum, d) => sum + (d.value / total) * 360, 0);

                                return (
                                    <div
                                        key={item.duration}
                                        className="absolute inset-0 rounded-full"
                                        style={{
                                            background: `conic-gradient(from ${rotation}deg, ${item.color} 0deg, ${item.color} ${(item.value / total) * 360}deg, transparent ${(item.value / total) * 360}deg)`,
                                            clipPath: 'circle(50%)'
                                        }}
                                    />
                                );
                            })}
                            <div className="absolute inset-8 bg-white dark:bg-sand-800 rounded-full flex items-center justify-center">
                                <span className="text-2xl font-display font-semibold text-sand-900 dark:text-sand-100">
                                    100%
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {mockStayDuration.map((item) => (
                            <div key={item.duration} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }} />
                                    <span className="text-sm text-sand-700 dark:text-sand-300">
                                        {item.duration}
                                    </span>
                                </div>
                                <span className="text-sm font-semibold text-sand-900 dark:text-sand-100">
                                    {item.value}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="card p-6 animate-fadeIn">
                <h3 className="text-xl font-display font-semibold text-sand-900 dark:text-sand-100 mb-6">
                    Today's Activity
                </h3>
                <div className="space-y-4">
                    {mockTodayActivity.map((activity, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-sand-50 dark:bg-sand-700 rounded-lg"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-2xl">{activity.flag}</span>
                                <div>
                                    <p className="font-medium text-sand-900 dark:text-sand-100">
                                        {activity.name}
                                    </p>
                                    <p className="text-sm text-sand-600 dark:text-sand-400">
                                        {activity.nights} nights
                                    </p>
                                </div>
                            </div>
                            <span
                                className={`px-4 py-2 rounded-lg text-sm font-medium ${activity.status === 'arriving'
                                    ? 'bg-sage-100 dark:bg-sage-900 text-sage-700 dark:text-sage-300'
                                    : 'bg-terracotta bg-opacity-10 text-terracotta'
                                    }`}
                            >
                                {activity.status === 'arriving' ? 'CHECK IN' : 'CHECK OUT'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}