interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    fullScreen?: boolean;
}

export function LoadingSpinner({ size = 'md', fullScreen = false }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'h-4 w-4 border-2',
        md: 'h-8 w-8 border-4',
        lg: 'h-12 w-12 border-4'
    };

    const spinner = (
        <div className={`animate-spin ${sizeClasses[size]} border-forest-500 border-t-transparent rounded-full`} />
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-sand-50/80 backdrop-blur-sm z-50">
                <div className="text-center">
                    {spinner}
                    <p className="mt-4 text-forest-800 font-display text-lg">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center">
            {spinner}
        </div>
    );
}
