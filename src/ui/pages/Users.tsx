export default function Users() {
    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
            <div className="mb-6 lg:mb-8 animate-fadeIn">
                <h1 className="text-3xl lg:text-4xl font-display font-semibold text-sand-900 dark:text-sand-100">
                    Create a new user
                </h1>
            </div>

            <div className="card p-6 lg:p-8 max-w-2xl animate-scaleIn">
                <form className="space-y-5 lg:space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-sand-700 dark:text-sand-300 mb-2">
                            Full name
                        </label>
                        <input type="text" className="input-field" placeholder="Enter full name" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-sand-700 dark:text-sand-300 mb-2">
                            Email address
                        </label>
                        <input type="email" className="input-field" placeholder="Enter email address" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-sand-700 dark:text-sand-300 mb-2">
                            Password (min 8 characters)
                        </label>
                        <input type="password" className="input-field" placeholder="Enter password" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-sand-700 dark:text-sand-300 mb-2">
                            Repeat password
                        </label>
                        <input type="password" className="input-field" placeholder="Repeat password" />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button type="button" className="flex-1 btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="flex-1 btn-primary">
                            Create new user
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}