import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState('demo@example.com');
    const [password, setPassword] = useState('password123');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await login(email, password);
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sand-100 via-sage-50 to-forest-50 dark:from-sand-900 dark:via-forest-900 dark:to-sage-900 p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8 animate-fadeIn">
                    <div className="flex justify-center mb-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-forest-600 to-sage-700 flex items-center justify-center shadow-2xl">
                            <svg className="w-12 h-12 text-cream" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-4xl font-display font-semibold text-forest-800 dark:text-sand-100 mb-2">
                        Elysian Stays
                    </h1>
                    <p className="text-sand-600 dark:text-sand-400 font-body">
                        Luxury Hotel Management System
                    </p>
                </div>

                <div className="glass-effect rounded-2xl p-8 shadow-2xl animate-scaleIn">
                    <h2 className="text-2xl font-display font-semibold text-sand-900 dark:text-sand-100 mb-6 text-center">
                        Log in to your account
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-sand-700 dark:text-sand-300 mb-2">
                                Email address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field"
                                placeholder="demo@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-sand-700 dark:text-sand-300 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-primary"
                        >
                            {isLoading ? 'Logging in...' : 'Log in'}
                        </button>
                    </form>

                    <div className="mt-6 p-4 bg-sand-100 dark:bg-sand-700 rounded-lg">
                        <p className="text-xs text-sand-600 dark:text-sand-400 text-center">
                            <strong>Demo credentials:</strong><br />
                            Email: demo@example.com<br />
                            Password: password123
                        </p>
                    </div>
                </div>

                <p className="text-center text-sm text-sand-600 dark:text-sand-400 mt-6">
                    Built with React, TypeScript & Tailwind CSS
                </p>
            </div>
        </div>
    );
}