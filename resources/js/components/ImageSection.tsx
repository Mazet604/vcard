import React from 'react';
import { FormDataType } from '../pages/welcome';

interface ImageSectionProps {
    data: FormDataType;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    renderError: (field: keyof FormDataType) => React.ReactNode;
    photoPreview: string | null;
    logoPreview: string | null;
}

export default function ImageSection({ data, handleChange, renderError, photoPreview, logoPreview }: ImageSectionProps) {
    return (
        <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Profile Images</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Profile Photo <span className="text-red-500">*</span>
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors">
                        {photoPreview ? (
                            <div className="space-y-4">
                                <img src={photoPreview} alt="Photo Preview" className="mx-auto h-24 w-24 rounded-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('img_photo')?.click()}
                                    className="hover:cursor-pointer bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    Change Photo
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="mx-auto w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('img_photo')?.click()}
                                    className="hover:cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    Upload Photo
                                </button>
                                <p className="text-sm text-gray-500">JPG, PNG up to 10MB</p>
                            </div>
                        )}
                        <input
                            id="img_photo"
                            name="img_photo"
                            type="file"
                            accept="image/*"
                            onChange={handleChange}
                            className="hidden"
                            required
                        />
                    </div>
                    {renderError('img_photo')}
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Logo <span className="text-red-500">*</span>
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors">
                        {logoPreview ? (
                            <div className="space-y-4">
                                <img src={logoPreview} alt="Logo Preview" className="mx-auto h-24 w-24 rounded-lg object-cover" />
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('img_logo')?.click()}
                                    className="hover:cursor-pointer bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    Change Logo
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="mx-auto w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('img_logo')?.click()}
                                    className="hover:cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
                                >
                                    Upload Logo
                                </button>
                                <p className="text-sm text-gray-500">JPG, PNG up to 10MB</p>
                            </div>
                        )}
                        <input
                            id="img_logo"
                            name="img_logo"
                            type="file"
                            accept="image/*"
                            onChange={handleChange}
                            className="hidden"
                            required
                        />
                    </div>
                    {renderError('img_logo')}
                </div>
            </div>
        </div>
    );
}