import React from 'react';
import { FormDataType } from '../pages/welcome';

interface WorkAddressSectionProps {
    data: FormDataType;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    renderError: (field: keyof FormDataType) => React.ReactNode;
}

export default function WorkAddressSection({ data, handleChange, renderError }: WorkAddressSectionProps) {
    return (
        <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Work Address</h3>
            </div>
            
            <div className="space-y-4">
                <div>
                    <label htmlFor="wa_street" className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address <span className="text-red-500">*</span>
                    </label>
                    <input 
                        id="wa_street" 
                        name="wa_street" 
                        value={data.wa_street} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="123 Main Street"
                        required 
                    />
                    {renderError('wa_street')}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="wa_city" className="block text-sm font-medium text-gray-700 mb-2">
                            City <span className="text-red-500">*</span>
                        </label>
                        <input 
                            id="wa_city" 
                            name="wa_city" 
                            value={data.wa_city} 
                            onChange={handleChange} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="New York"
                            required 
                        />
                        {renderError('wa_city')}
                    </div>
                    <div>
                        <label htmlFor="wa_state" className="block text-sm font-medium text-gray-700 mb-2">
                            State <span className="text-red-500">*</span>
                        </label>
                        <input 
                            id="wa_state" 
                            name="wa_state" 
                            value={data.wa_state} 
                            onChange={handleChange} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="NY"
                            required 
                        />
                        {renderError('wa_state')}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="wa_postal_code" className="block text-sm font-medium text-gray-700 mb-2">
                            Postal Code <span className="text-red-500">*</span>
                        </label>
                        <input 
                            id="wa_postal_code" 
                            name="wa_postal_code" 
                            value={data.wa_postal_code} 
                            onChange={handleChange} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="10001"
                            required 
                        />
                        {renderError('wa_postal_code')}
                    </div>
                    <div>
                        <label htmlFor="wa_country" className="block text-sm font-medium text-gray-700 mb-2">
                            Country <span className="text-red-500">*</span>
                        </label>
                        <input 
                            id="wa_country" 
                            name="wa_country" 
                            value={data.wa_country} 
                            onChange={handleChange} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="United States"
                            required 
                        />
                        {renderError('wa_country')}
                    </div>
                </div>
            </div>
        </div>
    );
}