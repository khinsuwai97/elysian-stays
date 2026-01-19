import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { mockCabins as initialCabins } from '../../mockData';
import { UsersIcon, EditIcon, TrashIcon } from '../components/Icons';
import type { Cabin } from '../../types';

interface FormData {
    name: string;
    maxCapacity: string;
    regularPrice: string;
    discount: string;
    description: string;
    image: string;
}

interface FormErrors {
    name?: string;
    maxCapacity?: string;
    regularPrice?: string;
    discount?: string;
    description?: string;
    image?: string;
}

export default function Cabins() {
    const [showModal, setShowModal] = useState(false);
    const [cabins, setCabins] = useState<Cabin[]>(initialCabins);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        maxCapacity: '',
        regularPrice: '',
        discount: '',
        description: '',
        image: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Edit and Delete state
    const [editingCabin, setEditingCabin] = useState<Cabin | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [cabinToDelete, setCabinToDelete] = useState<Cabin | null>(null);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close dropdown menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Cabin name is required';
        } else if (formData.name.trim().length < 3) {
            newErrors.name = 'Cabin name must be at least 3 characters';
        }

        if (!formData.maxCapacity) {
            newErrors.maxCapacity = 'Maximum capacity is required';
        } else if (parseInt(formData.maxCapacity) < 1 || parseInt(formData.maxCapacity) > 20) {
            newErrors.maxCapacity = 'Capacity must be between 1 and 20';
        }

        if (!formData.regularPrice) {
            newErrors.regularPrice = 'Regular price is required';
        } else if (parseInt(formData.regularPrice) < 1) {
            newErrors.regularPrice = 'Price must be greater than 0';
        }

        if (formData.discount && parseInt(formData.discount) < 0) {
            newErrors.discount = 'Discount cannot be negative';
        } else if (formData.discount && parseInt(formData.regularPrice) && parseInt(formData.discount) >= parseInt(formData.regularPrice)) {
            newErrors.discount = 'Discount must be less than regular price';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (formData.description.trim().length < 10) {
            newErrors.description = 'Description must be at least 10 characters';
        }

        if (!formData.image && !imagePreview) {
            newErrors.image = 'Please upload an image or provide an image URL';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setErrors(prev => ({ ...prev, image: 'Please select a valid image file' }));
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({ ...prev, image: 'Image size must be less than 5MB' }));
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                setFormData(prev => ({ ...prev, image: '' }));
                setErrors(prev => ({ ...prev, image: undefined }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        setFormData(prev => ({ ...prev, image: url }));
        if (url) {
            setImagePreview(url);
        } else {
            setImagePreview(null);
        }
        setErrors(prev => ({ ...prev, image: undefined }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (editingCabin) {
            // Update existing cabin
            const updatedCabin: Cabin = {
                ...editingCabin,
                name: formData.name.trim(),
                maxCapacity: parseInt(formData.maxCapacity),
                regularPrice: parseInt(formData.regularPrice),
                discount: formData.discount ? parseInt(formData.discount) : 0,
                description: formData.description.trim(),
                image: imagePreview || formData.image,
            };
            setCabins(prev => prev.map(cabin => cabin.id === editingCabin.id ? updatedCabin : cabin));
            toast.success(`Cabin "${updatedCabin.name}" updated successfully`);
        } else {
            // Create new cabin
            const newCabin: Cabin = {
                id: crypto.randomUUID(),
                name: formData.name.trim(),
                maxCapacity: parseInt(formData.maxCapacity),
                regularPrice: parseInt(formData.regularPrice),
                discount: formData.discount ? parseInt(formData.discount) : 0,
                description: formData.description.trim(),
                image: imagePreview || formData.image,
            };
            setCabins(prev => [newCabin, ...prev]);
            toast.success(`Cabin "${newCabin.name}" created successfully`);
        }

        resetForm();
        setShowModal(false);
        setEditingCabin(null);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            maxCapacity: '',
            regularPrice: '',
            discount: '',
            description: '',
            image: '',
        });
        setErrors({});
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleCloseModal = () => {
        resetForm();
        setShowModal(false);
        setEditingCabin(null);
    };

    const handleEdit = (cabin: Cabin) => {
        setEditingCabin(cabin);
        setFormData({
            name: cabin.name,
            maxCapacity: String(cabin.maxCapacity),
            regularPrice: String(cabin.regularPrice),
            discount: cabin.discount ? String(cabin.discount) : '',
            description: cabin.description,
            image: cabin.image,
        });
        setImagePreview(cabin.image);
        setShowModal(true);
        setOpenMenuId(null);
    };

    const handleDeleteClick = (cabin: Cabin) => {
        setCabinToDelete(cabin);
        setDeleteModalOpen(true);
        setOpenMenuId(null);
    };

    const handleDeleteConfirm = () => {
        if (cabinToDelete) {
            const deletedName = cabinToDelete.name;
            setCabins(prev => prev.filter(cabin => cabin.id !== cabinToDelete.id));
            setCabinToDelete(null);
            setDeleteModalOpen(false);
            toast.success(`Cabin "${deletedName}" deleted successfully`);
        }
    };

    const toggleMenu = (cabinId: string) => {
        setOpenMenuId(openMenuId === cabinId ? null : cabinId);
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8 animate-fadeIn">
                <h1 className="text-4xl font-display font-semibold text-sand-900 dark:text-sand-100">
                    All Cabins
                </h1>
                <button onClick={() => setShowModal(true)} className="btn-primary cursor-pointer">
                    Add new cabin
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cabins.map((cabin, index) => (
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
                                {/* Actions Dropdown */}
                                <div className="relative " ref={openMenuId === cabin.id ? menuRef : null}>
                                    <button
                                        onClick={() => toggleMenu(cabin.id)}
                                        className="p-2 cursor-pointer hover:bg-sand-100 dark:hover:bg-sand-700 rounded-lg transition-colors"
                                    >
                                        <svg className="w-6 h-6 text-sand-700 dark:text-sand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                        </svg>
                                    </button>
                                    {openMenuId === cabin.id && (
                                        <div className="absolute z-50 right-0 bottom-full mb-2 w-40 bg-white dark:bg-sand-800 rounded-lg shadow-xl border border-sand-200 dark:border-sand-700 py-1 animate-fadeIn">
                                            <button
                                                onClick={() => handleEdit(cabin)}
                                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-sand-700 dark:text-sand-300 hover:bg-sand-100 dark:hover:bg-sand-700 transition-colors cursor-pointer"
                                            >
                                                <EditIcon className="w-4 h-4" />
                                                Edit cabin
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(cabin)}
                                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                                Delete cabin
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create/Edit Modal */}
            {showModal && (
                <div className="fixed bg-black/50 backdrop-blur-sm inset-0 z-50 flex items-center justify-center animate-fadeIn"
                    onClick={handleCloseModal}
                >
                    <div
                        className="card p-8 max-w-lg w-full mx-4 shadow-2xl animate-scaleIn max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-display font-semibold text-sand-900 dark:text-sand-100 mb-6">
                            {editingCabin ? 'Edit cabin' : 'Create new cabin'}
                        </h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-sand-700 dark:text-sand-300 mb-2">
                                    Cabin name <span className="text-terracotta">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={`input-field ${errors.name ? 'border-terracotta focus:ring-terracotta' : ''}`}
                                    placeholder="Enter cabin name"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-terracotta">{errors.name}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-sand-700 dark:text-sand-300 mb-2">
                                    Maximum capacity <span className="text-terracotta">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="maxCapacity"
                                    value={formData.maxCapacity}
                                    onChange={handleInputChange}
                                    className={`input-field ${errors.maxCapacity ? 'border-terracotta focus:ring-terracotta' : ''}`}
                                    placeholder="Enter max capacity"
                                    min="1"
                                    max="20"
                                />
                                {errors.maxCapacity && (
                                    <p className="mt-1 text-sm text-terracotta">{errors.maxCapacity}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-sand-700 dark:text-sand-300 mb-2">
                                    Regular price <span className="text-terracotta">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="regularPrice"
                                    value={formData.regularPrice}
                                    onChange={handleInputChange}
                                    className={`input-field ${errors.regularPrice ? 'border-terracotta focus:ring-terracotta' : ''}`}
                                    placeholder="Enter regular price"
                                    min="1"
                                />
                                {errors.regularPrice && (
                                    <p className="mt-1 text-sm text-terracotta">{errors.regularPrice}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-sand-700 dark:text-sand-300 mb-2">
                                    Discount
                                </label>
                                <input
                                    type="number"
                                    name="discount"
                                    value={formData.discount}
                                    onChange={handleInputChange}
                                    className={`input-field ${errors.discount ? 'border-terracotta focus:ring-terracotta' : ''}`}
                                    placeholder="Enter discount amount"
                                    min="0"
                                />
                                {errors.discount && (
                                    <p className="mt-1 text-sm text-terracotta">{errors.discount}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-sand-700 dark:text-sand-300 mb-2">
                                    Description <span className="text-terracotta">*</span>
                                </label>
                                <textarea
                                    rows={3}
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className={`input-field ${errors.description ? 'border-terracotta focus:ring-terracotta' : ''}`}
                                    placeholder="Enter description"
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-terracotta">{errors.description}</p>
                                )}
                            </div>

                            {/* Image Upload Section */}
                            <div>
                                <label className="block text-sm font-medium text-sand-700 dark:text-sand-300 mb-2">
                                    Cabin Image <span className="text-terracotta">*</span>
                                </label>

                                {/* Image Preview */}
                                {imagePreview && (
                                    <div className="relative mb-3 rounded-lg overflow-hidden">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-40 object-cover rounded-lg"
                                            onError={() => {
                                                setImagePreview(null);
                                                setErrors(prev => ({ ...prev, image: 'Invalid image URL' }));
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImagePreview(null);
                                                setFormData(prev => ({ ...prev, image: '' }));
                                                if (fileInputRef.current) {
                                                    fileInputRef.current.value = '';
                                                }
                                            }}
                                            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                )}

                                {/* File Upload */}
                                <div className="flex flex-col gap-3">
                                    <div
                                        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors
                                            ${errors.image
                                                ? 'border-terracotta bg-terracotta/5'
                                                : 'border-sand-300 dark:border-sand-600 hover:border-forest-500 dark:hover:border-forest-400 hover:bg-forest-50 dark:hover:bg-forest-900/20'
                                            }`}
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                        <svg className="w-8 h-8 mx-auto mb-2 text-sand-400 dark:text-sand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-sm text-sand-600 dark:text-sand-400">
                                            Click to upload an image
                                        </p>
                                        <p className="text-xs text-sand-500 dark:text-sand-500 mt-1">
                                            PNG, JPG, GIF up to 5MB
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 border-t border-sand-200 dark:border-sand-700"></div>
                                        <span className="text-sm text-sand-500 dark:text-sand-400">or</span>
                                        <div className="flex-1 border-t border-sand-200 dark:border-sand-700"></div>
                                    </div>

                                    {/* URL Input */}
                                    <input
                                        type="url"
                                        value={formData.image}
                                        onChange={handleImageUrlChange}
                                        className={`input-field ${errors.image ? 'border-terracotta focus:ring-terracotta' : ''}`}
                                        placeholder="Enter image URL"
                                    />
                                </div>

                                {errors.image && (
                                    <p className="mt-1 text-sm text-terracotta">{errors.image}</p>
                                )}
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 mt-6 btn-secondary cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 mt-6 btn-primary cursor-pointer">
                                    {editingCabin ? 'Update cabin' : 'Create cabin'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteModalOpen && cabinToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setDeleteModalOpen(false)}
                    />
                    <div className="relative bg-white dark:bg-sand-800 rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 animate-scaleIn">
                        <button
                            onClick={() => setDeleteModalOpen(false)}
                            className="absolute top-4 right-4 p-1 text-sand-500 hover:text-sand-700 dark:hover:text-sand-300 transition-colors cursor-pointer"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h3 className="text-xl font-semibold text-sand-900 dark:text-sand-100 mb-2">
                            Delete cabin
                        </h3>
                        <p className="text-sand-600 dark:text-sand-400 mb-6">
                            Are you sure you want to delete <span className="font-semibold">{cabinToDelete.name}</span>? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteModalOpen(false)}
                                className="px-4 py-2 rounded-lg bg-sand-100 dark:bg-sand-700 text-sand-700 dark:text-sand-300 hover:bg-sand-200 dark:hover:bg-sand-600 transition-colors font-medium cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
