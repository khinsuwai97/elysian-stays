import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { mockBookings, mockSettings } from '../../mockData';
import { CabinIcon, DollarIcon } from '../components/Icons';

export default function CheckIn() {
    const { bookingId } = useParams<{ bookingId: string }>();
    const navigate = useNavigate();
    const [addBreakfast, setAddBreakfast] = useState(false);
    const [confirmPaid, setConfirmPaid] = useState(false);

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

    if (booking.status !== 'unconfirmed') {
        return (
            <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto">
                <div className="card p-8 text-center">
                    <h2 className="text-xl font-semibold text-sand-900 dark:text-sand-100 mb-2">
                        Cannot check in
                    </h2>
                    <p className="text-sand-600 dark:text-sand-400 mb-4">
                        This booking has already been {booking.status === 'checked-in' ? 'checked in' : 'checked out'}.
                    </p>
                    <button
                        onClick={() => navigate(`/bookings/${bookingId}`)}
                        className="px-4 py-2 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors cursor-pointer"
                    >
                        View Booking
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

    const breakfastPrice = mockSettings.breakfastPrice * booking.numNights * booking.numGuests;
    const totalWithBreakfast = booking.totalPrice + (addBreakfast ? breakfastPrice : 0);

    const handleCheckIn = () => {
        // In a real app, this would update the booking status in the database
        toast.success(`Booking #${booking.id} has been checked in successfully!`);
        navigate('/bookings');
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
                <h1 className="text-2xl lg:text-3xl font-display font-semibold text-sand-900 dark:text-sand-100">
                    Check in Booking #{booking.id}
                </h1>
                <button
                    onClick={() => navigate(`/bookings/${bookingId}`)}
                    className="text-forest-600 dark:text-forest-400 hover:text-forest-700 dark:hover:text-forest-300 font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                    ← Back
                </button>
            </div>

            {/* Booking Info Card */}
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

                    {/* Current Breakfast Status */}
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
                                Total price: ${totalWithBreakfast.toLocaleString()}
                                {addBreakfast && !booking.hasBreakfast && (
                                    <span className="text-sm font-normal ml-2">
                                        (${booking.totalPrice.toLocaleString()} + ${breakfastPrice.toLocaleString()} breakfast)
                                    </span>
                                )}
                            </span>
                        </div>
                        <span className="text-xs font-medium uppercase text-amber-700 dark:text-amber-400 tracking-wide">
                            Will pay at property
                        </span>
                    </div>
                </div>
            </div>

            {/* Check-in Options */}
            <div className="card p-4 lg:p-6 mb-6 space-y-4">
                {/* Add Breakfast Option (only show if not already included) */}
                {!booking.hasBreakfast && (
                    <label className="flex items-start gap-3 p-4 rounded-lg border border-sand-200 dark:border-sand-700 hover:bg-sand-50 dark:hover:bg-sand-800 cursor-pointer transition-colors">
                        <input
                            type="checkbox"
                            checked={addBreakfast}
                            onChange={(e) => setAddBreakfast(e.target.checked)}
                            className="mt-1 w-5 h-5 rounded border-sand-300 text-forest-600 focus:ring-forest-500 cursor-pointer"
                        />
                        <div>
                            <p className="font-medium text-sand-900 dark:text-sand-100">
                                Want to add breakfast for ${breakfastPrice.toLocaleString()}?
                            </p>
                            <p className="text-sm text-sand-600 dark:text-sand-400">
                                ${mockSettings.breakfastPrice} per person per night × {booking.numGuests} guests × {booking.numNights} nights
                            </p>
                        </div>
                    </label>
                )}

                {/* Confirm Payment */}
                <label className="flex items-start gap-3 p-4 rounded-lg border border-sand-200 dark:border-sand-700 hover:bg-sand-50 dark:hover:bg-sand-800 cursor-pointer transition-colors">
                    <input
                        type="checkbox"
                        checked={confirmPaid}
                        onChange={(e) => setConfirmPaid(e.target.checked)}
                        className="mt-1 w-5 h-5 rounded border-sand-300 text-forest-600 focus:ring-forest-500 cursor-pointer"
                    />
                    <div>
                        <p className="font-medium text-sand-900 dark:text-sand-100">
                            I confirm that {booking.guestName} has paid the total amount of ${totalWithBreakfast.toLocaleString()}
                        </p>
                        <p className="text-sm text-sand-600 dark:text-sand-400">
                            Payment must be confirmed before checking in the guest
                        </p>
                    </div>
                </label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-end gap-3">
                <button
                    onClick={() => navigate(`/bookings/${bookingId}`)}
                    className="px-4 py-2.5 bg-sand-200 dark:bg-sand-700 text-sand-700 dark:text-sand-300 rounded-lg hover:bg-sand-300 dark:hover:bg-sand-600 transition-colors font-medium cursor-pointer"
                >
                    Back
                </button>
                <button
                    onClick={handleCheckIn}
                    disabled={!confirmPaid}
                    className="px-6 py-2.5 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Check in booking #{booking.id}
                </button>
            </div>
        </div>
    );
}
