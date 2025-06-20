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
                {/* LinkedIn */}
                <div>
                    <label htmlFor="soc_linkedin" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        LinkedIn <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                        </div>
                        <input 
                            id="soc_linkedin" 
                            name="soc_linkedin" 
                            value={data.soc_linkedin} 
                            onChange={handleChange} 
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-sm"
                            placeholder="linkedin.com/in/username"
                            required 
                        />
                    </div>
                    {renderError('soc_linkedin')}
                </div>

                {/* Twitter */}
                <div>
                    <label htmlFor="soc_twitter" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        Twitter
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </div>
                        <input 
                            id="soc_twitter" 
                            name="soc_twitter" 
                            value={data.soc_twitter} 
                            onChange={handleChange} 
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-sm"
                            placeholder="twitter.com/username"
                        />
                    </div>
                    {renderError('soc_twitter')}
                </div>

                {/* Facebook */}
                <div>
                    <label htmlFor="soc_facebook" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        Facebook
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </div>
                        <input 
                            id="soc_facebook" 
                            name="soc_facebook" 
                            value={data.soc_facebook} 
                            onChange={handleChange} 
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-sm"
                            placeholder="facebook.com/username"
                        />
                    </div>
                    {renderError('soc_facebook')}
                </div>

                {/* Instagram */}
                <div>
                    <label htmlFor="soc_instagram" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        Instagram
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986 6.618 0 11.986-5.368 11.986-11.986C24.003 5.367 18.635.001 12.017.001zM8.449 20.25c-2.021 0-3.658-1.637-3.658-3.658V7.408c0-2.021 1.637-3.658 3.658-3.658h7.102c2.021 0 3.658 1.637 3.658 3.658v9.184c0 2.021-1.637 3.658-3.658 3.658H8.449zm7.581-13.804c-.294 0-.533-.239-.533-.533s.239-.533.533-.533.533.239.533.533-.239.533-.533.533zM12 7.864c-2.287 0-4.136 1.849-4.136 4.136s1.849 4.136 4.136 4.136 4.136-1.849 4.136-4.136S14.287 7.864 12 7.864zm0 6.531c-1.322 0-2.395-1.073-2.395-2.395S10.678 9.605 12 9.605s2.395 1.073 2.395 2.395S13.322 14.395 12 14.395z"/>
                            </svg>
                        </div>
                        <input 
                            id="soc_instagram" 
                            name="soc_instagram" 
                            value={data.soc_instagram} 
                            onChange={handleChange} 
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-sm"
                            placeholder="instagram.com/username"
                        />
                    </div>
                    {renderError('soc_instagram')}
                </div>

                {/* YouTube */}
                <div>
                    <label htmlFor="soc_youtube" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        YouTube
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                        </div>
                        <input 
                            id="soc_youtube" 
                            name="soc_youtube" 
                            value={data.soc_youtube} 
                            onChange={handleChange} 
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-sm"
                            placeholder="youtube.com/channel/id"
                        />
                    </div>
                    {renderError('soc_youtube')}
                </div>

                {/* Custom Link */}
                <div>
                    <label htmlFor="soc_customlink" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        Custom Link
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                        </div>
                        <input 
                            id="soc_customlink" 
                            name="soc_customlink" 
                            value={data.soc_customlink} 
                            onChange={handleChange} 
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-sm"
                            placeholder="https://your-website.com"
                        />
                    </div>
                    {renderError('soc_customlink')}
                </div>
            </div>
        </div>
    );
}