import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";

interface FormData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface FormErrors {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

const initialFormData: FormData = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

export default function Users() {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Full name validation
        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        } else if (formData.fullName.trim().length < 2) {
            newErrors.fullName = "Full name must be at least 2 characters";
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name as keyof FormErrors]) {
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
            setSuccessMessage("User created successfully!");
            setFormData(initialFormData);
            setErrors({});
        } catch {
            setErrors({ fullName: "Failed to create user. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setFormData(initialFormData);
        setErrors({});
        setSuccessMessage("");
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
            <div className="mb-6 lg:mb-8 animate-fadeIn">
                <h1 className="text-3xl lg:text-4xl font-display font-semibold text-sand-900 dark:text-sand-100">
                    Create a new user
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
                            Full name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={`input-field ${errors.fullName ? "border-red-500 dark:border-red-400" : ""}`}
                            placeholder="Enter full name"
                        />
                        {errors.fullName && (
                            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.fullName}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-sand-700 dark:text-sand-300 mb-2">
                            Email address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`input-field ${errors.email ? "border-red-500 dark:border-red-400" : ""}`}
                            placeholder="Enter email address"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.email}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-sand-700 dark:text-sand-300 mb-2">
                            Password (min 8 characters)
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`input-field ${errors.password ? "border-red-500 dark:border-red-400" : ""}`}
                            placeholder="Enter password"
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.password}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-sand-700 dark:text-sand-300 mb-2">
                            Repeat password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`input-field ${errors.confirmPassword ? "border-red-500 dark:border-red-400" : ""}`}
                            placeholder="Repeat password"
                        />
                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.confirmPassword}</p>
                        )}
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex-1 btn-secondary cursor-pointer mt-6"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 btn-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Creating..." : "Create new user"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}