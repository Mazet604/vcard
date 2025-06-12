import React from 'react';
import { FormDataType } from '../pages/welcome';

type Suffix = {
    id: number;
    sfx_name: string;
};

type PersonalInformationProps = {
    data: FormDataType;
    suffixes: Suffix[];
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    renderError: (field: keyof FormDataType) => React.ReactNode;
};

export default function PersonalInformationComponent({ 
    data, 
    suffixes, 
    handleChange, 
    renderError 
}: PersonalInformationProps) {
    return (
        <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="vcard_fname" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                        id="vcard_fname" 
                        name="vcard_fname" 
                        value={data.vcard_fname} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200" 
                        placeholder="Enter first name"
                        required 
                    />
                    {renderError('vcard_fname')}
                </div>
                <div>
                    <label htmlFor="vcard_mname" className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
                    <input 
                        id="vcard_mname" 
                        name="vcard_mname" 
                        value={data.vcard_mname} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter middle name"
                    />
                    {renderError('vcard_mname')}
                </div>
                <div>
                    <label htmlFor="vcard_lname" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                        id="vcard_lname" 
                        name="vcard_lname" 
                        value={data.vcard_lname} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter last name"
                        required 
                    />
                    {renderError('vcard_lname')}
                </div>
                <div>
                    <label htmlFor="vcard_suffix" className="block text-sm font-medium text-gray-700 mb-2">Suffix</label>
                    <select
                        id="vcard_suffix"
                        name="vcard_suffix"
                        value={data.vcard_suffix}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                    >
                        <option value="">Select Suffix</option>
                        {suffixes.map((opt: Suffix) => (
                            <option key={opt.id} value={opt.id}>
                                {opt.sfx_name}
                            </option>
                        ))}
                    </select>
                    {renderError('vcard_suffix')}
                </div>
            </div>
        </div>
    );
}