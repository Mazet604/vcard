import React from 'react';
import { Link } from '@inertiajs/react';

export default function Welcome() {
    const tools = [
        {
            title: 'VCard Generator',
            description: 'Generate professional digital business cards in VCF and JPG formats',
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0" />
                </svg>
            ),
            gradient: 'from-red-500 to-orange-500',
            hoverGradient: 'from-red-600 to-orange-600',
            route: '/vcard-generator',
            features: ['Personal & Business Info', 'Social Media Links', 'Photo & Logo Upload', 'VCF & JPG Export']
        },
        {
            title: 'URL Shortener',
            description: 'Create short, shareable links with click tracking and analytics',
            icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
            ),
            gradient: 'from-blue-500 to-indigo-500',
            hoverGradient: 'from-blue-600 to-indigo-600',
            route: '/url-shortener',
            features: ['Fast URL Shortening', 'Click Tracking', 'Custom Short Codes', 'Analytics Dashboard']
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-auto h-20 rounded-full mb-6 p-3 bg-white shadow-lg">
                        <img 
                            src="/images/lavawhite.png" 
                            alt="LAVA Logo" 
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        LAVA <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Automation</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Your all-in-one digital toolkit. Create professional business cards, shorten URLs, and more with our powerful automation tools.
                    </p>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {tools.map((tool, index) => (
                        <Link
                            key={index}
                            href={tool.route}
                            className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden"
                        >
                            {/* Gradient border effect */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${tool.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl`}></div>
                            <div className="relative bg-white m-1 rounded-3xl p-8 h-full">
                                {/* Icon */}
                                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${tool.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {tool.icon}
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                                    {tool.title}
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {tool.description}
                                </p>

                                {/* Features */}
                                <ul className="space-y-2 mb-8">
                                    {tool.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center text-sm text-gray-500">
                                            <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <div className={`inline-flex items-center text-white px-6 py-3 rounded-xl font-semibold bg-gradient-to-r ${tool.gradient} group-hover:${tool.hoverGradient} transition-all duration-300 group-hover:shadow-lg`}>
                                    <span>Get Started</span>
                                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Features Section */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose LAVA Automation?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
                            <p className="text-gray-600">Generate professional content in seconds with our optimized tools. <b>Tentative</b></p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Quality</h3>
                            <p className="text-gray-600">Create high-quality digital assets that make a lasting impression. <b>Tentative</b></p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
                            <p className="text-gray-600">Your data is processed securely with enterprise-grade encryption. <b>Tentative</b></p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center">
                    <p className="text-gray-500">© 2025 LAVA Automation. All Rights Reserved.</p>
                </div>
            </div>
        </div>
    );
}