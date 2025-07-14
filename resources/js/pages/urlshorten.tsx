import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

type ShortenedUrl = {
    id: number;
    original_url: string;
    short_code: string;
    short_url: string;
    clicks: number;
    created_at: string;
};

type FormDataType = {
    url: string;
};

export default function UrlShorten() {
    const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [copiedId, setCopiedId] = useState<number | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm<FormDataType>({
        url: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/shorten', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ url: data.url }),
            });

            if (response.ok) {
                const result = await response.json();
                setShortenedUrls(prev => [result, ...prev]);
                reset();
            } else {
                const errorData = await response.json();
                console.error('Error shortening URL:', errorData);
            }
        } catch (error) {
            console.error('Error shortening URL:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = async (url: string, id: number) => {
        try {
            await navigator.clipboard.writeText(url);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (error) {
            console.error('Failed to copy URL:', error);
        }
    };

    const isValidUrl = (string: string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" 
                         style={{ background: 'linear-gradient(to right, #3b82f6, #1d4ed8)' }}>
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">LAVA URL - tentative title</h1>
                    <p className="text-lg text-gray-600">URL Shortener tool powered by LAVA Automation</p>
                </div>

                {/* URL Shortener Form */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                    <div className="h-2" style={{ background: 'linear-gradient(to right, #3b82f6, #1d4ed8)' }}></div>
                    
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="url" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Enter URL to shorten
                                </label>
                                <div className="relative">
                                    <input
                                        type="url"
                                        id="url"
                                        name="url"
                                        value={data.url}
                                        onChange={(e) => setData('url', e.target.value)}
                                        placeholder="https://example.com/very-long-url-that-needs-shortening"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 pr-12"
                                        required
                                    />
                                    <svg className="absolute right-3 top-3 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                </div>
                                {errors.url && (
                                    <div className="text-red-500 text-sm mt-1 flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {errors.url}
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing || isLoading || !data.url || !isValidUrl(data.url)}
                                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Shortening...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        Shorten URL
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Shortened URLs List */}
                {shortenedUrls.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Your Shortened URLs
                            </h2>
                        </div>
                        
                        <div className="divide-y divide-gray-200">
                            {shortenedUrls.map((urlItem) => (
                                <div key={urlItem.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                                    <div className="space-y-3">
                                        {/* Short URL */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 min-w-0">
                                                <a 
                                                    href={urlItem.short_url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-lg font-semibold text-blue-600 hover:text-blue-800 break-all"
                                                >
                                                    {urlItem.short_url}
                                                </a>
                                            </div>
                                            <button
                                                onClick={() => copyToClipboard(urlItem.short_url, urlItem.id)}
                                                className="ml-4 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors duration-200 flex items-center space-x-1"
                                            >
                                                {copiedId === urlItem.id ? (
                                                    <>
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span className="text-sm">Copied!</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                        <span className="text-sm">Copy</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                        
                                        {/* Original URL */}
                                        <div className="text-sm text-gray-600">
                                            <span className="font-medium">Original: </span>
                                            <span className="break-all">{urlItem.original_url}</span>
                                        </div>
                                        
                                        {/* Stats */}
                                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                                            <div className="flex items-center space-x-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                <span>{urlItem.clicks} clicks</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>{new Date(urlItem.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Footer */}
                <p className="text-center mt-10 text-gray-500">© 2025 LAVA Automation. All Rights Reserved.</p>
            </div>
        </div>
    );
}

export type { FormDataType, ShortenedUrl };