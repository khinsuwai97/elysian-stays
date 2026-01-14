import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    trend?: string;
}

export default function StatCard({ title, value, icon: Icon, color, trend }: StatCardProps) {
    return (
        <div className="card p-6 animate-scaleIn">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-sand-600 dark:text-sand-400 mb-1">
                        {title}
                    </p>
                    <h3 className="text-3xl font-display font-semibold text-sand-900 dark:text-sand-100">
                        {value}
                    </h3>
                    {trend && (
                        <p className="text-xs text-sage-600 dark:text-sage-400 mt-2">
                            {trend}
                        </p>
                    )}
                </div>
                <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
        </div>
    );
}