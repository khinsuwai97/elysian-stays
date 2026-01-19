import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { mockBookings } from '../../mockData';
import { CabinIcon, DollarIcon, CheckIcon, TrashIcon } from '../components/Icons';

export default function BookingDetails() {
    const { bookingId } = useParams<{ bookingId: string }>();
    const navigate = useNavigate();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const booking = mockBookings.find(b => b.id === bookingId);

    if (!booking) {
        return (
            <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto">
                <div className="card p-8 text-center">
                    <h2 className="text-xl font-semibold text-sand-900 dark:text-sand-100 mb-2">
                        Booking not found
                    </h2>
                    <p className="text-sand-600 dark:text-sand-400 mb-4">
                        The booking you're looking for doesn't exist or has been deleted.
                    </p>
                    <button
                        onClick={() => navigate('/bookings')}
                        className="px-4 py-2 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors cursor-pointer"
                    >
                        Back to Bookings
                    </button>
                </div>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getTimeUntil = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = date.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            const absDays = Math.abs(diffDays);
            if (absDays > 365) {
                return `${Math.floor(absDays / 365)} years ago`;
            }
            return `${absDays} days ago`;
        } else if (diffDays === 0) {
            return 'Today';
        } else if (diffDays > 365) {
            return `In ${Math.floor(diffDays / 365)} years`;
        }
        return `In ${diffDays} days`;
    };

    const formatCreatedAt = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'checked-in':
                return 'bg-sage-100 dark:bg-sage-900 text-sage-700 dark:text-sage-300';
            case 'checked-out':
                return 'bg-sand-200 dark:bg-sand-600 text-sand-700 dark:text-sand-300';
            default:
                return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
        }
    };

    const handleDelete = () => {
        setDeleteModalOpen(false);
        toast.success(`Booking #${booking.id} deleted successfully`);
        navigate('/bookings');
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl lg:text-3xl font-display font-semibold text-sand-900 dark:text-sand-100">
                        Booking #{booking.id}
                    </h1>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase ${getStatusColor(booking.status)}`}>
                        {booking.status.replace('-', ' ')}
                    </span>
                </div>
                <button
                    onClick={() => navigate('/bookings')}
                    className="text-forest-600 dark:text-forest-400 hover:text-forest-700 dark:hover:text-forest-300 font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                    ← Back
                </button>
            </div>

            {/* Main Card */}
            <div className="card overflow-hidden mb-6">
                {/* Header Banner */}
                <div className="bg-forest-600 dark:bg-forest-700 text-white p-4 lg:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <CabinIcon className="w-6 h-6" />
                            <span className="text-lg font-medium">
                                {booking.numNights} nights in {booking.cabin.name}
                            </span>
                        </div>
                        <div className="text-sm lg:text-base opacity-90">
                            {formatDate(booking.startDate)} ({getTimeUntil(booking.startDate)}) — {formatDate(booking.endDate)}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 lg:p-6 space-y-4">
                    {/* Guest Info */}
                    <div className="flex items-center gap-2 text-sand-700 dark:text-sand-300">
                        <span className="text-xl">👤</span>
                        <span className="font-medium text-sand-900 dark:text-sand-100">{booking.guestName}</span>
                        <span className="text-sand-400">•</span>
                        <span>{booking.guestEmail}</span>
                        <span className="text-sand-400">•</span>
                        <span>National ID: {booking.guestNationalId}</span>
                    </div>

                    {/* Guests Count */}
                    <div className="flex items-center gap-2 text-sand-700 dark:text-sand-300">
                        <span className="text-xl">👥</span>
                        <span>{booking.numGuests} guest{booking.numGuests > 1 ? 's' : ''}</span>
                    </div>

                    {/* Observations */}
                    {booking.observations && (
                        <div className="flex items-start gap-2 text-sand-700 dark:text-sand-300">
                            <span className="text-xl">💬</span>
                            <div>
                                <span className="font-medium text-sand-900 dark:text-sand-100">Observations: </span>
                                <span>{booking.observations}</span>
                            </div>
                        </div>
                    )}

                    {/* Breakfast */}
                    <div className="flex items-center gap-2 text-sand-700 dark:text-sand-300">
                        <span className="text-xl">🍳</span>
                        <span className="font-medium text-sand-900 dark:text-sand-100">Breakfast included?</span>
                        <span>{booking.hasBreakfast ? 'Yes' : 'No'}</span>
                    </div>

                    {/* Price Footer */}
                    <div className="bg-amber-100 dark:bg-amber-900/30 rounded-lg p-4 mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <DollarIcon className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                            <span className="font-semibold text-amber-800 dark:text-amber-300">
                                Total price: ${booking.totalPrice.toLocaleString()}
                            </span>
                        </div>
                        <span className="text-xs font-medium uppercase text-amber-700 dark:text-amber-400 tracking-wide">
                            {booking.status === 'checked-out' ? 'Paid' : 'Will pay at property'}
                        </span>
                    </div>
                </div>

                {/* Booked Date Footer */}
                <div className="px-4 lg:px-6 pb-4 lg:pb-6 text-right text-sm text-sand-500 dark:text-sand-400">
                    Booked {formatCreatedAt(booking.createdAt)}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-end gap-3">
                {booking.status === 'unconfirmed' && (
                    <button
                        onClick={() => navigate(`/checkin/${booking.id}`)}
                        className="px-4 py-2.5 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors font-medium flex items-center gap-2 cursor-pointer"
                    >
                        <CheckIcon className="w-4 h-4" />
                        Check in
                    </button>
                )}
                {booking.status === 'checked-in' && (
                    <button
                        onClick={() => navigate(`/checkout/${booking.id}`)}
                        className="px-4 py-2.5 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors font-medium flex items-center gap-2 cursor-pointer"
                    >
                        <CheckIcon className="w-4 h-4" />
                        Check out
                    </button>
                )}
                <button
                    onClick={() => setDeleteModalOpen(true)}
                    className="px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2 cursor-pointer"
                >
                    <TrashIcon className="w-4 h-4" />
                    Delete booking
                </button>
                <button
                    onClick={() => navigate('/bookings')}
                    className="px-4 py-2.5 bg-sand-200 dark:bg-sand-700 text-sand-700 dark:text-sand-300 rounded-lg hover:bg-sand-300 dark:hover:bg-sand-600 transition-colors font-medium cursor-pointer"
                >
                    Back
                </button>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setDeleteModalOpen(false)}
                    />
                    <div className="relative bg-white dark:bg-sand-800 rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 animate-scaleIn">
                        <button
                            onClick={() => setDeleteModalOpen(false)}
                            className="absolute top-4 right-4 p-1 text-sand-500 hover:text-sand-700 dark:hover:text-sand-300 transition-colors cursor-pointer"
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
                                onClick={() => setDeleteModalOpen(false)}
                                className="px-4 py-2 rounded-lg bg-sand-100 dark:bg-sand-700 text-sand-700 dark:text-sand-300 hover:bg-sand-200 dark:hover:bg-sand-600 transition-colors font-medium cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
