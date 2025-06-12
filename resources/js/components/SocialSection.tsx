import React from 'react';
import { FormDataType } from '../pages/welcome';

interface SocialSectionProps {
    data: FormDataType;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    renderError: (field: keyof FormDataType) => React.ReactNode;
}

export default function SocialSection({ data, handleChange, renderError }: SocialSectionProps) {
    return (
        <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Social Links</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="soc_linkedin" className="block text-sm font-medium text-gray-700 mb-2">
                        LinkedIn <span className="text-red-500">*</span>
                    </label>
                    <input 
                        id="soc_linkedin" 
                        name="soc_linkedin" 
                        value={data.soc_linkedin} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="linkedin.com/in/username"
                        required 
                    />
                    {renderError('soc_linkedin')}
                </div>
                <div>
                    <label htmlFor="soc_twitter" className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                    <input 
                        id="soc_twitter" 
                        name="soc_twitter" 
                        value={data.soc_twitter} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="twitter.com/username"
                    />
                    {renderError('soc_twitter')}
                </div>
                <div>
                    <label htmlFor="soc_facebook" className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                    <input 
                        id="soc_facebook" 
                        name="soc_facebook" 
                        value={data.soc_facebook} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="facebook.com/username"
                    />
                    {renderError('soc_facebook')}
                </div>
                <div>
                    <label htmlFor="soc_instagram" className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                    <input 
                        id="soc_instagram" 
                        name="soc_instagram" 
                        value={data.soc_instagram} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="instagram.com/username"
                    />
                    {renderError('soc_instagram')}
                </div>
                <div>
                    <label htmlFor="soc_youtube" className="block text-sm font-medium text-gray-700 mb-2">YouTube</label>
                    <input 
                        id="soc_youtube" 
                        name="soc_youtube" 
                        value={data.soc_youtube} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="youtube.com/channel/id"
                    />
                    {renderError('soc_youtube')}
                </div>
                <div>
                    <label htmlFor="soc_customlink" className="block text-sm font-medium text-gray-700 mb-2">Custom Link</label>
                    <input 
                        id="soc_customlink" 
                        name="soc_customlink" 
                        value={data.soc_customlink} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="https://your-website.com"
                    />
                    {renderError('soc_customlink')}
                </div>
            </div>
        </div>
    );
}