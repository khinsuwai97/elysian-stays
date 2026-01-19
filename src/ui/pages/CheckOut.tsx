import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { mockBookings } from '../../mockData';
import { CabinIcon, DollarIcon } from '../components/Icons';

export default function CheckOut() {
    const { bookingId } = useParams<{ bookingId: string }>();
    const navigate = useNavigate();
    const [confirmCheckout, setConfirmCheckout] = useState(false);

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

    if (booking.status !== 'checked-in') {
        return (
            <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto">
                <div className="card p-8 text-center">
                    <h2 className="text-xl font-semibold text-sand-900 dark:text-sand-100 mb-2">
                        Cannot check out
                    </h2>
                    <p className="text-sand-600 dark:text-sand-400 mb-4">
                        {booking.status === 'unconfirmed'
                            ? 'This booking has not been checked in yet.'
                            : 'This booking has already been checked out.'}
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

    const handleCheckOut = () => {
        // In a real app, this would update the booking status in the database
        toast.success(`Booking #${booking.id} has been checked out successfully!`);
        navigate('/bookings');
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
                <h1 className="text-2xl lg:text-3xl font-display font-semibold text-sand-900 dark:text-sand-100">
                    Check out Booking #{booking.id}
                </h1>
                <button
                    onClick={() => navigate(`/bookings/${bookingId}`)}
                    className="text-forest-600 dark:text-forest-400 hover:text-forest-700 dark:hover:text-forest-300 font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                    ← Back
                </button>
            </div>

            {/* Booking Summary Card */}
            <div className="card overflow-hidden mb-6">
                {/* Header Banner */}
                <div className="bg-sage-600 dark:bg-sage-700 text-white p-4 lg:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <CabinIcon className="w-6 h-6" />
                            <span className="text-lg font-medium">
                                {booking.numNights} nights in {booking.cabin.name}
                            </span>
                        </div>
                        <div className="text-sm lg:text-base opacity-90">
                            {formatDate(booking.startDate)} — {formatDate(booking.endDate)}
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
                        <span>{booking.numGuests} guest{booking.numGuests > 1 ? 's' : ''}</span>
                    </div>

                    {/* Stay Summary */}
                    <div className="bg-sand-50 dark:bg-sand-800 rounded-lg p-4 space-y-3">
                        <h3 className="font-medium text-sand-900 dark:text-sand-100">Stay Summary</h3>

                        <div className="flex justify-between text-sm">
                            <span className="text-sand-600 dark:text-sand-400">Cabin ({booking.numNights} nights)</span>
                            <span className="text-sand-900 dark:text-sand-100">${(booking.cabin.regularPrice * booking.numNights).toLocaleString()}</span>
                        </div>

                        {booking.cabin.discount > 0 && (
                            <div className="flex justify-between text-sm">
                                <span className="text-sand-600 dark:text-sand-400">Discount</span>
                                <span className="text-green-600 dark:text-green-400">-${(booking.cabin.discount * booking.numNights).toLocaleString()}</span>
                            </div>
                        )}

                        {booking.hasBreakfast && (
                            <div className="flex justify-between text-sm">
                                <span className="text-sand-600 dark:text-sand-400">Breakfast</span>
                                <span className="text-sand-900 dark:text-sand-100">Included</span>
                            </div>
                        )}

                        <div className="border-t border-sand-200 dark:border-sand-700 pt-3 flex justify-between font-semibold">
                            <span className="text-sand-900 dark:text-sand-100">Total paid</span>
                            <span className="text-sand-900 dark:text-sand-100">${booking.totalPrice.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Payment Status */}
                    <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4 flex items-center gap-3">
                        <DollarIcon className="w-5 h-5 text-green-700 dark:text-green-400" />
                        <span className="font-medium text-green-800 dark:text-green-300">
                            Payment confirmed — ${booking.totalPrice.toLocaleString()} paid at check-in
                        </span>
                    </div>
                </div>
            </div>

            {/* Checkout Confirmation */}
            <div className="card p-4 lg:p-6 mb-6">
                <label className="flex items-start gap-3 p-4 rounded-lg border border-sand-200 dark:border-sand-700 hover:bg-sand-50 dark:hover:bg-sand-800 cursor-pointer transition-colors">
                    <input
                        type="checkbox"
                        checked={confirmCheckout}
                        onChange={(e) => setConfirmCheckout(e.target.checked)}
                        className="mt-1 w-5 h-5 rounded border-sand-300 text-forest-600 focus:ring-forest-500 cursor-pointer"
                    />
                    <div>
                        <p className="font-medium text-sand-900 dark:text-sand-100">
                            I confirm that the room has been inspected and is ready for checkout
                        </p>
                        <p className="text-sm text-sand-600 dark:text-sand-400">
                            Please verify that all amenities are in order and there are no outstanding charges
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
                    onClick={handleCheckOut}
                    disabled={!confirmCheckout}
                    className="px-6 py-2.5 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Check out booking #{booking.id}
                </button>
            </div>
        </div>
    );
}
