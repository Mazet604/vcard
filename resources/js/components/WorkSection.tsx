import React from 'react';
import { FormDataType } from '../pages/welcome';

interface WorkSectionProps {
    data: FormDataType;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    renderError: (field: keyof FormDataType) => React.ReactNode;
}

export default function WorkSection({ data, handleChange, renderError }: WorkSectionProps) {
    return (
        <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 002 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8a2 2 0 012-2V8" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Work Information</h3>
            </div>
            
            <div className="space-y-4">
                <div>
                    <label htmlFor="wrk_org" className="block text-sm font-medium text-gray-700 mb-2">
                        Organization <span className="text-red-500">*</span>
                    </label>
                    <input 
                        id="wrk_org" 
                        name="wrk_org" 
                        value={data.wrk_org} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-sm"
                        placeholder="Company name"
                        required 
                    />
                    {renderError('wrk_org')}
                </div>
                <div>
                    <label htmlFor="wkr_email" className="block text-sm font-medium text-gray-700 mb-2">
                        Work Email <span className="text-red-500">*</span>
                    </label>
                    <input 
                        id="wkr_email" 
                        name="wkr_email" 
                        value={data.wkr_email} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-sm" 
                        type="email"
                        placeholder="work.email@company.com"
                        required 
                    />
                    {renderError('wkr_email')}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="wrk_title" className="block text-sm font-medium text-gray-700 mb-2">
                            Job Title <span className="text-red-500">*</span>
                        </label>
                        <input 
                            id="wrk_title" 
                            name="wrk_title" 
                            value={data.wrk_title} 
                            onChange={handleChange} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-sm"
                            placeholder="Accountant"
                            required 
                        />
                        {renderError('wrk_title')}
                    </div>
                    <div>
                        <label htmlFor="wrk_role" className="block text-sm font-medium text-gray-700 mb-2">
                            Role <span className="text-red-500">*</span>
                        </label>
                        <input 
                            id="wrk_role" 
                            name="wrk_role" 
                            value={data.wrk_role} 
                            onChange={handleChange} 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-sm"
                            placeholder="Senior Accountant"
                            required 
                        />
                        {renderError('wrk_role')}
                    </div>
                </div>
                <div>
                    <label htmlFor="wrk_URL" className="block text-sm font-medium text-gray-700 mb-2">Company Website</label>
                    <input 
                        id="wrk_URL" 
                        name="wrk_URL" 
                        value={data.wrk_URL} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-sm"
                        placeholder="https://company.com"
                    />
                    {renderError('wrk_URL')}
                </div>
            </div>
        </div>
    );
}