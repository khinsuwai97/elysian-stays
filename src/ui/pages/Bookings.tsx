import { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { mockBookings } from '../../mockData';
import { MoreIcon, EyeIcon, TrashIcon } from '../components/Icons';
import type { Booking, BookingStatus, SortOrder } from '../../types';

const ITEMS_PER_PAGE = 10;

export default function Bookings() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState<BookingStatus>('all');
    const [sortBy, setSortBy] = useState<SortOrder>('date-desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [bookings, setBookings] = useState<Booking[]>(mockBookings);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSeeDetails = (booking: Booking) => {
        navigate(`/bookings/${booking.id}`);
    };

    const handleDeleteBooking = (bookingId: string) => {
        setBookingToDelete(bookingId);
        setDeleteModalOpen(true);
        setOpenMenuId(null);
    };

    const confirmDelete = () => {
        if (bookingToDelete) {
            setBookings(prev => prev.filter(b => b.id !== bookingToDelete));
            toast.success(`Booking #${bookingToDelete} deleted successfully`);
        }
        setDeleteModalOpen(false);
        setBookingToDelete(null);
    };

    const cancelDelete = () => {
        setDeleteModalOpen(false);
        setBookingToDelete(null);
    };

    const filteredBookings = useMemo(() => bookings.filter(booking => {
        if (filter === 'all') return true;
        return booking.status === filter;
    }), [filter, bookings]);

    const sortedBookings = useMemo(() => [...filteredBookings].sort((a, b) => {
        if (sortBy === 'date-desc') {
            return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        }
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    }), [filteredBookings, sortBy]);

    const totalPages = Math.ceil(sortedBookings.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedBookings = sortedBookings.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Reset to page 1 when filter changes
    const handleFilterChange = (newFilter: BookingStatus) => {
        setFilter(newFilter);
        setCurrentPage(1);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
            <h1 className="text-3xl lg:text-4xl font-display font-semibold text-sand-900 dark:text-sand-100 mb-6 lg:mb-8 animate-fadeIn">
                All Bookings
            </h1>

            <div className="card overflow-hidden animate-scaleIn">
                <div className="p-4 sm:p-5 lg:p-6 border-b border-sand-200 dark:border-sand-700">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex gap-2 flex-wrap">
                            {(['all', 'checked-out', 'checked-in', 'unconfirmed'] as BookingStatus[]).map((status) => (
                                <button
                                    key={status}
                                    onClick={() => handleFilterChange(status)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer capitalize transition-all ${filter === status
                                        ? 'bg-forest-600 text-white shadow-lg'
                                        : 'bg-sand-100 dark:bg-sand-700 text-sand-700 dark:text-sand-300 hover:bg-sand-200 dark:hover:bg-sand-600'
                                        }`}
                                >
                                    {status.replace('-', ' ')}
                                </button>
                            ))}
                        </div>
                        <div className="relative inline-block">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as SortOrder)}
                                className="appearance-none pl-4 pr-10 py-2 rounded-lg 
               bg-sand-100 dark:bg-sand-700 
               text-sand-900 dark:text-sand-100 
               border-none focus:ring-2 focus:ring-forest-500 
               outline-none text-sm cursor-pointer"
                            >
                                <option value="date-desc">Sort by date (recent first)</option>
                                <option value="date-asc">Sort by date (earlier first)</option>
                            </select>

                            {/* custom arrow */}
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sand-500">
                                ▼
                            </span>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-sand-50 dark:bg-sand-700">
                            <tr>
                                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-sand-700 dark:text-sand-300 uppercase tracking-wider">
                                    Cabin
                                </th>
                                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-sand-700 dark:text-sand-300 uppercase tracking-wider">
                                    Guest
                                </th>
                                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-sand-700 dark:text-sand-300 uppercase tracking-wider">
                                    Dates
                                </th>
                                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-sand-700 dark:text-sand-300 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-semibold text-sand-700 dark:text-sand-300 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-4 lg:px-6 py-3 lg:py-4 text-right text-xs font-semibold text-sand-700 dark:text-sand-300 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-sand-200 dark:divide-sand-700">
                            {paginatedBookings.map((booking) => (
                                <tr
                                    key={booking.id}
                                    className="hover:bg-sand-50 dark:hover:bg-sand-700 transition-colors"
                                >
                                    <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                                        <div className="font-medium text-sm lg:text-base text-sand-900 dark:text-sand-100">
                                            {booking.cabin.name}
                                        </div>
                                    </td>
                                    <td className="px-4 lg:px-6 py-3 lg:py-4">
                                        <div>
                                            <div className="font-medium text-sm lg:text-base text-sand-900 dark:text-sand-100">
                                                {booking.guestName}
                                            </div>
                                            <div className="text-xs lg:text-sm text-sand-600 dark:text-sand-400">
                                                {booking.guestEmail}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                                        <div className="text-xs lg:text-sm text-sand-900 dark:text-sand-100">
                                            {new Date(booking.startDate).toLocaleDateString()} →
                                        </div>
                                        <div className="text-xs lg:text-sm text-sand-600 dark:text-sand-400">
                                            {booking.numNights} night stay
                                        </div>
                                    </td>
                                    <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2.5 lg:px-3 py-1 rounded-full text-xs font-medium uppercase ${booking.status === 'checked-in'
                                                ? 'bg-sage-100 dark:bg-sage-900 text-sage-700 dark:text-sage-300'
                                                : booking.status === 'checked-out'
                                                    ? 'bg-sand-200 dark:bg-sand-600 text-sand-700 dark:text-sand-300'
                                                    : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                                }`}
                                        >
                                            {booking.status.replace('-', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap font-semibold text-sm lg:text-base text-sand-900 dark:text-sand-100">
                                        ${booking.totalPrice.toLocaleString()}
                                    </td>
                                    <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-right">
                                        <div className="relative inline-block" ref={openMenuId === booking.id ? menuRef : null}>
                                            <button
                                                onClick={() => setOpenMenuId(openMenuId === booking.id ? null : booking.id)}
                                                className="p-2 cursor-pointer hover:bg-sand-200 dark:hover:bg-sand-600 rounded-lg transition-colors"
                                            >
                                                <MoreIcon className="w-5 h-5 text-sand-700 dark:text-sand-300" />
                                            </button>
                                            {openMenuId === booking.id && (
                                                <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-sand-800 rounded-lg shadow-lg border border-sand-200 dark:border-sand-700 z-50 overflow-hidden">
                                                    <button
                                                        onClick={() => handleSeeDetails(booking)}
                                                        className="w-full px-4 py-2.5 cursor-pointer text-left text-sm text-sand-700 dark:text-sand-200 hover:bg-sand-100 dark:hover:bg-sand-700 flex items-center gap-3 transition-colors"
                                                    >
                                                        <EyeIcon className="w-4 h-4" />
                                                        See details
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteBooking(booking.id)}
                                                        className="w-full px-4 py-2.5 cursor-pointer text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 transition-colors"
                                                    >
                                                        <TrashIcon className="w-4 h-4" />
                                                        Delete booking
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 sm:p-5 lg:p-6 border-t border-sand-200 dark:border-sand-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs lg:text-sm text-sand-600 dark:text-sand-400">
                        Showing {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, sortedBookings.length)} of {sortedBookings.length} results
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="cursor-pointer px-4 py-2 rounded-lg bg-sand-100 dark:bg-sand-700 text-sand-700 dark:text-sand-300 hover:bg-sand-200 dark:hover:bg-sand-600 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="cursor-pointer px-4 py-2 rounded-lg bg-sand-100 dark:bg-sand-700 text-sand-700 dark:text-sand-300 hover:bg-sand-200 dark:hover:bg-sand-600 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={cancelDelete}
                    />
                    <div className="relative bg-white dark:bg-sand-800 rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 animate-scaleIn">
                        <button
                            onClick={cancelDelete}
                            className="absolute top-4 right-4 p-1 text-sand-500 hover:text-sand-700 dark:hover:text-sand-300 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h3 className="text-xl font-semibold text-sand-900 dark:text-sand-100 mb-2">
                            Delete booking
                        </h3>
                        <p className="text-sand-600 dark:text-sand-400 mb-6">
                            Are you sure you want to delete this booking permanently? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 rounded-lg bg-sand-100 dark:bg-sand-700 text-sand-700 dark:text-sand-300 hover:bg-sand-200 dark:hover:bg-sand-600 transition-colors font-medium cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
}