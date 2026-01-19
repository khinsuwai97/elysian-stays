import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { mockSettings } from "../../mockData";

interface SettingsData {
    minBookingLength: number;
    maxBookingLength: number;
    maxGuestsPerBooking: number;
    breakfastPrice: number;
}

interface SettingsErrors {
    minBookingLength?: string;
    maxBookingLength?: string;
    maxGuestsPerBooking?: string;
    breakfastPrice?: string;
}

const initialSettings: SettingsData = {
    minBookingLength: mockSettings.minBookingLength,
    maxBookingLength: mockSettings.maxBookingLength,
    maxGuestsPerBooking: mockSettings.maxGuestsPerBooking,
    breakfastPrice: mockSettings.breakfastPrice,
};

export default function Settings() {
    const [settings, setSettings] = useState<SettingsData>(initialSettings);
    const [errors, setErrors] = useState<SettingsErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const validateForm = (): boolean => {
        const newErrors: SettingsErrors = {};

        // Min booking length validation
        if (settings.minBookingLength < 1) {
            newErrors.minBookingLength = "Minimum nights must be at least 1";
        } else if (settings.minBookingLength > settings.maxBookingLength) {
            newErrors.minBookingLength = "Minimum nights cannot exceed maximum nights";
        }

        // Max booking length validation
        if (settings.maxBookingLength < 1) {
            newErrors.maxBookingLength = "Maximum nights must be at least 1";
        } else if (settings.maxBookingLength > 365) {
            newErrors.maxBookingLength = "Maximum nights cannot exceed 365";
        }

        // Max guests validation
        if (settings.maxGuestsPerBooking < 1) {
            newErrors.maxGuestsPerBooking = "Maximum guests must be at least 1";
        } else if (settings.maxGuestsPerBooking > 20) {
            newErrors.maxGuestsPerBooking = "Maximum guests cannot exceed 20";
        }

        // Breakfast price validation
        if (settings.breakfastPrice < 0) {
            newErrors.breakfastPrice = "Breakfast price cannot be negative";
        } else if (settings.breakfastPrice > 500) {
            newErrors.breakfastPrice = "Breakfast price cannot exceed $500";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numValue = value === "" ? 0 : Number(value);
        setSettings((prev) => ({ ...prev, [name]: numValue }));
        // Clear error when user starts typing
        if (errors[name as keyof SettingsErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSuccessMessage("");

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // On success
            setSuccessMessage("Settings updated successfully!");
            setErrors({});
        } catch {
            setErrors({ minBookingLength: "Failed to update settings. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setSettings(initialSettings);
        setErrors({});
        setSuccessMessage("");
    };

    const hasChanges =
        settings.minBookingLength !== initialSettings.minBookingLength ||
        settings.maxBookingLength !== initialSettings.maxBookingLength ||
        settings.maxGuestsPerBooking !== initialSettings.maxGuestsPerBooking ||
        settings.breakfastPrice !== initialSettings.breakfastPrice;

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
            <div className="mb-6 lg:mb-8 animate-fadeIn">
                <h1 className="text-3xl lg:text-4xl font-display font-semibold text-sand-900 dark:text-sand-100">
                    Update hotel settings
                </h1>
            </div>

            <div className="card p-6 lg:p-8 max-w-2xl animate-scaleIn">
                {successMessage && (
                    <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300">
                        {successMessage}
                    </div>
                )}

                <form className="space-y-5 lg:space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-sand-700 dark:text-sand-300 mb-2">
                            Minimum nights/booking
                        </label>
                        <input
                            type="number"
                            name="minBookingLength"
                            value={settings.minBookingLength}
                            onChange={handleChange}
                            min={1}
                            className={`input-field ${errors.minBookingLength ? "border-red-500 dark:border-red-400" : ""}`}
                        />
                        {errors.minBookingLength && (
                            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.minBookingLength}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-sand-700 dark:text-sand-300 mb-2">
                            Maximum nights/booking
                        </label>
                        <input
                            type="number"
                            name="maxBookingLength"
                            value={settings.maxBookingLength}
                            onChange={handleChange}
                            min={1}
                            max={365}
                            className={`input-field ${errors.maxBookingLength ? "border-red-500 dark:border-red-400" : ""}`}
                        />
                        {errors.maxBookingLength && (
                            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.maxBookingLength}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-sand-700 dark:text-sand-300 mb-2">
                            Maximum guests/booking
                        </label>
                        <input
                            type="number"
                            name="maxGuestsPerBooking"
                            value={settings.maxGuestsPerBooking}
                            onChange={handleChange}
                            min={1}
                            max={20}
                            className={`input-field ${errors.maxGuestsPerBooking ? "border-red-500 dark:border-red-400" : ""}`}
                        />
                        {errors.maxGuestsPerBooking && (
                            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.maxGuestsPerBooking}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-sand-700 dark:text-sand-300 mb-2">
                            Breakfast price
                        </label>
                        <input
                            type="number"
                            name="breakfastPrice"
                            value={settings.breakfastPrice}
                            onChange={handleChange}
                            min={0}
                            max={500}
                            className={`input-field ${errors.breakfastPrice ? "border-red-500 dark:border-red-400" : ""}`}
                        />
                        {errors.breakfastPrice && (
                            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.breakfastPrice}</p>
                        )}
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex-1 btn-secondary mt-6 cursor-pointer"
                            disabled={isSubmitting || !hasChanges}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 btn-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting || !hasChanges}
                        >
                            {isSubmitting ? "Updating..." : "Update settings"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}