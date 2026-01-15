import React from 'react';
import { mockSettings } from '../../mockData';


export default function Settings() {
    return (
        <div className="p-8 max-w-7xl mx-auto">
            <h1 className="text-4xl font-display font-semibold text-sand-900 dark:text-sand-100 mb-8 animate-fadeIn">
                Update hotel settings
            </h1>

            <div className="card p-8 max-w-2xl animate-scaleIn">
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-sand-700 dark:text-sand-300 mb-2">
                            Minimum nights/booking
                        </label>
                        <input
                            type="number"
                            defaultValue={mockSettings.minBookingLength}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-sand-700 dark:text-sand-300 mb-2">
                            Maximum nights/booking
                        </label>
                        <input
                            type="number"
                            defaultValue={mockSettings.maxBookingLength}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-sand-700 dark:text-sand-300 mb-2">
                            Maximum guests/booking
                        </label>
                        <input
                            type="number"
                            defaultValue={mockSettings.maxGuestsPerBooking}
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-sand-700 dark:text-sand-300 mb-2">
                            Breakfast price
                        </label>
                        <input
                            type="number"
                            defaultValue={mockSettings.breakfastPrice}
                            className="input-field"
                        />
                    </div>
                    <button type="submit" className="w-full btn-primary">
                        Update settings
                    </button>
                </form>
            </div>
        </div>
    );
}