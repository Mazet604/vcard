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
                            <svg className="w-4 h-4 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                        </div>
                        <input 
                            id="soc_linkedin" 
                            name="soc_linkedin" 
                            value={data.soc_linkedin} 
                            onChange={handleChange} 
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm placeholder:text-sm"
                            placeholder="linkedin.com/in/username"
                            required 
                        />
                    </div>
                    {renderError('soc_linkedin')}
                </div>

                {/* X (formerly Twitter) */}
                <div>
                    <label htmlFor="soc_twitter" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        X (Twitter)
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                            </svg>
                        </div>
                        <input 
                            id="soc_twitter" 
                            name="soc_twitter" 
                            value={data.soc_twitter} 
                            onChange={handleChange} 
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm placeholder:text-sm"
                            placeholder="x.com/username"
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
                            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 3.667h-3.533v7.98H9.101z"/>
                            </svg>
                        </div>
                        <input 
                            id="soc_facebook" 
                            name="soc_facebook" 
                            value={data.soc_facebook} 
                            onChange={handleChange} 
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm placeholder:text-sm"
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
                        <svg width="0" height="0">
                            <defs>
                                <linearGradient id="instagram-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#f9ce34" />
                                    <stop offset="25%" stopColor="#ee2a7b" />
                                    <stop offset="50%" stopColor="#6228d7" />
                                    <stop offset="100%" stopColor="#6228d7" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-4 h-4" fill="url(#instagram-gradient)" viewBox="0 0 24 24">
                                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                            </svg>
                        </div>
                        <input 
                            id="soc_instagram" 
                            name="soc_instagram" 
                            value={data.soc_instagram} 
                            onChange={handleChange} 
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm placeholder:text-sm"
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
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm placeholder:text-sm"
                            placeholder="youtube.com/@username"
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
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm placeholder:text-sm"
                            placeholder="https://your-website.com"
                        />
                    </div>
                    {renderError('soc_customlink')}
                </div>
            </div>
        </div>
    );
}