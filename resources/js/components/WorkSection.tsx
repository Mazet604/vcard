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
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" strokeWidth="2"/>
                        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeWidth="2"/>
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm placeholder:text-sm"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm placeholder:text-sm" 
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm placeholder:text-sm"
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm placeholder:text-sm"
                            placeholder="Senior Accountant"
                            required 
                        />
                        {renderError('wrk_role')}
                    </div>
                </div>
                <div>
                    <div>
                        <label htmlFor="wrk_URL" className="block text-sm font-medium text-gray-700 mb-2">Company Website</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                            </div>
                        <input 
                            id="wrk_URL" 
                            name="wrk_URL" 
                            value={data.wrk_URL} 
                            onChange={handleChange} 
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm placeholder:text-sm"
                            placeholder="https://company.com"
                        />
                        </div>
                        {renderError('wrk_URL')}
                    </div>
                </div>
            </div>
        </div>
    );
}