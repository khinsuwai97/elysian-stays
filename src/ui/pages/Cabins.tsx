import React, { useState } from 'react';
import { mockCabins } from '../../mockData';
import { UsersIcon,MoreIcon } from '../components/Icons';

export default function Cabins() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8 animate-fadeIn">
                <h1 className="text-4xl font-display font-semibold text-sand-900 dark:text-sand-100">
                    All Cabins
                </h1>
                <button onClick={() => setShowModal(true)} className="btn-primary">
                    Add new cabin
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockCabins.map((cabin, index) => (
                    <div
                        key={cabin.id}
                        className="card overflow-hidden hover:shadow-2xl transition-all duration-300 animate-scaleIn group"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="relative h-56 overflow-hidden">
                            <img
                                src={cabin.image}
                                alt={cabin.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {cabin.discount > 0 && (
                                <div className="absolute top-4 right-4 bg-terracotta text-white px-3 py-1 rounded-full text-sm font-medium">
                                    ${cabin.discount} OFF
                                </div>
                            )}
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-display font-semibold text-sand-900 dark:text-sand-100 mb-2">
                                {cabin.name}
                            </h3>
                            <p className="text-sand-600 dark:text-sand-400 text-sm mb-4">
                                {cabin.description}
                            </p>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 text-sand-700 dark:text-sand-300">
                                    <UsersIcon className="w-5 h-5" />
                                    <span className="text-sm">Fits up to {cabin.maxCapacity} guests</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-sand-200 dark:border-sand-700">
                                <div>
                                    <p className="text-2xl font-display font-semibold text-forest-700 dark:text-forest-400">
                                        ${cabin.regularPrice - cabin.discount}
                                    </p>
                                    {cabin.discount > 0 && (
                                        <p className="text-sm text-sand-500 dark:text-sand-500 line-through">
                                            ${cabin.regularPrice}
                                        </p>
                                    )}
                                </div>
                                <button className="p-2 hover:bg-sand-100 dark:hover:bg-sand-700 rounded-lg transition-colors">
                                    <MoreIcon className="w-6 h-6 text-sand-700 dark:text-sand-300" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
                    <div className="card p-8 max-w-md w-full mx-4 shadow-2xl animate-scaleIn">
                        <h2 className="text-2xl font-display font-semibold text-sand-900 dark:text-sand-100 mb-6">
                            Create new cabin
                        </h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-sand-700 dark:text-sand-300 mb-2">
                                    Cabin name
                                </label>
                                <input type="text" className="input-field" placeholder="Enter cabin name" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-sand-700 dark:text-sand-300 mb-2">
                                    Maximum capacity
                                </label>
                                <input type="number" className="input-field" placeholder="Enter max capacity" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-sand-700 dark:text-sand-300 mb-2">
                                    Regular price
                                </label>
                                <input type="number" className="input-field" placeholder="Enter regular price" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-sand-700 dark:text-sand-300 mb-2">
                                    Discount
                                </label>
                                <input type="number" className="input-field" placeholder="Enter discount amount" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-sand-700 dark:text-sand-300 mb-2">
                                    Description
                                </label>
                                <textarea rows={3} className="input-field" placeholder="Enter description" />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 btn-secondary">
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 btn-primary">
                                    Create cabin
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}