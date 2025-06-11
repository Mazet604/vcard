import React from 'react';
import { FormDataType } from '../pages/welcome';

interface ContactSectionProps {
    data: FormDataType;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    renderError: (field: keyof FormDataType) => React.ReactNode;
}

export default function ContactSection({ data, handleChange, renderError }: ContactSectionProps) {
    return (
        <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
            </div>
            
            <div className="space-y-4">
                <div>
                    <label htmlFor="con_email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                    </label>
                    <input 
                        id="con_email" 
                        name="con_email" 
                        value={data.con_email} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                        type="email"
                        placeholder="your.email@example.com"
                        required 
                    />
                    {renderError('con_email')}
                </div>
                <div>
                    <label htmlFor="con_phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input 
                        id="con_phone" 
                        name="con_phone" 
                        value={data.con_phone} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        required 
                    />
                    {renderError('con_phone')}
                </div>
            </div>
        </div>
    );
}