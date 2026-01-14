import React from 'react';

export default function Logo() {
    return (
        <div className="flex items-center gap-3 mb-12">
            {/* Option 1: Use the detailed SVG logo */}
            <img
                src="/logo-detail.svg"
                alt="Elysian Stays Logo"
                className="w-14 h-14 rounded-full shadow-elegant"
            />
            {/* 
             Option 2: Keep the gradient circle with icon (comment out the img above and uncomment this) */}
            {/* <div className="w-14 h-14 rounded-full bg-gradient-to-br from-forest-600 to-sage-700 flex items-center justify-center shadow-elegant">
                <svg className="w-8 h-8 text-cream" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
                </svg>
            </div> */}


            <div>
                <h1 className="text-2xl font-display font-semibold text-forest-800 dark:text-sand-100">
                    Elysian Stays
                </h1>
                <p className="text-sm text-sand-600 dark:text-sand-400">Luxury Retreats</p>
            </div>
        </div>
    );
}