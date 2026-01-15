import React, { useState } from 'react';
import { mockBookings } from '../../mockData';
import { MoreIcon } from '../components/Icons';
import type { BookingStatus,SortOrder } from '../../types';


export default function Bookings() {
    const [filter, setFilter] = useState<BookingStatus>('all');
    const [sortBy, setSortBy] = useState<SortOrder>('date-desc');

    const filteredBookings = mockBookings.filter(booking => {
        if (filter === 'all') return true;
        return booking.status === filter;
    });

    const sortedBookings = [...filteredBookings].sort((a, b) => {
        if (sortBy === 'date-desc') {
            return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        }
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <h1 className="text-4xl font-display font-semibold text-sand-900 dark:text-sand-100 mb-8 animate-fadeIn">
                All Bookings
            </h1>

            <div className="card overflow-hidden animate-scaleIn">
                <div className="p-6 border-b border-sand-200 dark:border-sand-700">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex gap-3 flex-wrap">
                            {(['all', 'checked-out', 'checked-in', 'unconfirmed'] as BookingStatus[]).map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilter(status)}
                                    className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${filter === status
                                            ? 'bg-forest-600 text-white shadow-lg'
                                            : 'bg-sand-100 dark:bg-sand-700 text-sand-700 dark:text-sand-300 hover:bg-sand-200 dark:hover:bg-sand-600'
                                        }`}
                                >
                                    {status.replace('-', ' ')}
                                </button>
                            ))}
                        </div>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOrder)}
                            className="px-4 py-2 rounded-lg bg-sand-100 dark:bg-sand-700 text-sand-900 dark:text-sand-100 border-none focus:ring-2 focus:ring-forest-500 outline-none"
                        >
                            <option value="date-desc">Sort by date (recent first)</option>
                            <option value="date-asc">Sort by date (earlier first)</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-sand-50 dark:bg-sand-700">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-sand-700 dark:text-sand-300 uppercase tracking-wider">
                                    Cabin
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-sand-700 dark:text-sand-300 uppercase tracking-wider">
                                    Guest
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-sand-700 dark:text-sand-300 uppercase tracking-wider">
                                    Dates
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-sand-700 dark:text-sand-300 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-sand-700 dark:text-sand-300 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-sand-700 dark:text-sand-300 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-sand-200 dark:divide-sand-700">
                            {sortedBookings.map((booking) => (
                                <tr
                                    key={booking.id}
                                    className="hover:bg-sand-50 dark:hover:bg-sand-700 transition-colors"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-sand-900 dark:text-sand-100">
                                            {booking.cabin.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="font-medium text-sand-900 dark:text-sand-100">
                                                {booking.guestName}
                                            </div>
                                            <div className="text-sm text-sand-600 dark:text-sand-400">
                                                {booking.guestEmail}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-sand-900 dark:text-sand-100">
                                            {new Date(booking.startDate).toLocaleDateString()} →
                                        </div>
                                        <div className="text-sm text-sand-600 dark:text-sand-400">
                                            {booking.numNights} night stay
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === 'checked-in'
                                                    ? 'bg-sage-100 dark:bg-sage-900 text-sage-700 dark:text-sage-300'
                                                    : booking.status === 'checked-out'
                                                        ? 'bg-sand-200 dark:bg-sand-600 text-sand-700 dark:text-sand-300'
                                                        : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                                }`}
                                        >
                                            {booking.status.replace('-', ' ').toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-sand-900 dark:text-sand-100">
                                        ${booking.totalPrice.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button className="p-2 hover:bg-sand-200 dark:hover:bg-sand-600 rounded-lg transition-colors">
                                            <MoreIcon className="w-5 h-5 text-sand-700 dark:text-sand-300" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 border-t border-sand-200 dark:border-sand-700 flex items-center justify-between">
                    <p className="text-sm text-sand-600 dark:text-sand-400">
                        Showing {sortedBookings.length} of {mockBookings.length} results
                    </p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 rounded-lg bg-sand-100 dark:bg-sand-700 text-sand-700 dark:text-sand-300 hover:bg-sand-200 dark:hover:bg-sand-600 transition-all">
                            Previous
                        </button>
                        <button className="px-4 py-2 rounded-lg bg-sand-100 dark:bg-sand-700 text-sand-700 dark:text-sand-300 hover:bg-sand-200 dark:hover:bg-sand-600 transition-all">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}