import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LoadingSpinner } from './LoadingSpinner';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sand-100 via-sage-50 to-forest-50 dark:from-sand-900 dark:via-forest-900 dark:to-sage-900 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-10 animate-fadeIn">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-forest-600 to-sage-700 flex items-center justify-center shadow-2xl">
              <svg
                className="w-11 h-11 text-cream"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-display font-semibold text-forest-800 dark:text-sand-100 mb-2">
            Elysian Stays
          </h1>
          <p className="text-base text-sand-600 dark:text-sand-400 font-body">
            Luxury Hotel Management System
          </p>
        </div>

        <div className="glass-effect rounded-2xl shadow-2xl animate-scaleIn">
          <h2 className="text-2xl font-display font-semibold text-sand-900 dark:text-sand-100 mb-6 text-center">
            Log in to your account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
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
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sand-500 hover:text-sand-700 dark:text-sand-400 dark:hover:text-sand-200 transition-colors"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            {/* {isLoading ? 'Logging in...' : 'Log in'} */}
            {/* <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-primary cursor-pointer"
                        >
                            {isLoading ? <LoadingSpinner size='sm' /> : "Log in"}

                        </button> */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary cursor-pointer h-12 flex items-center justify-center relative"
            >
              <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
                Log in
              </span>

              {isLoading && (
                <span className="absolute">
                  <LoadingSpinner size="sm" />
                </span>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-sand-100 dark:bg-sand-700 rounded-lg">
            <p className="text-xs text-sand-600 dark:text-sand-400 text-center leading-relaxed">
              <strong className="font-semibold block mb-2">
                Demo credentials:
              </strong>
              <span className="block text-sand-700 dark:text-sand-300 mb-1">
                Email: demo@example.com
              </span>
              <span className="block text-sand-700 dark:text-sand-300">
                Password: password123
              </span>
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
