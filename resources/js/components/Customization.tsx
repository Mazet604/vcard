import React, { useState } from 'react';

// Background gradient options
export const backgroundOptions = [
    { name: 'LAVA Orange', gradient: ['#ff1300', '#ff5f00'], id: 'lava' },
    { name: 'Ocean Blue', gradient: ['#667eea', '#764ba2'], id: 'ocean' },
    { name: 'Sunset', gradient: ['#f093fb', '#f5576c'], id: 'sunset' },
    { name: 'Forest', gradient: ['#134e5e', '#71b280'], id: 'forest' },
    { name: 'Royal Purple', gradient: ['#667eea', '#764ba2'], id: 'purple' },
    { name: 'Golden Hour', gradient: ['#f7971e', '#ffd200'], id: 'golden' },
    { name: 'Midnight', gradient: ['#2c3e50', '#4a6741'], id: 'midnight' },
    { name: 'Rose Gold', gradient: ['#f953c6', '#b91d73'], id: 'rose' }
];

// QR Code pattern options with working configurations
export const qrPatterns = [
    { 
        name: 'Classic', 
        id: 'classic',
        options: {
            errorCorrectionLevel: 'M' as const,
            margin: 1
        }
    },
    { 
        name: 'High Contrast', 
        id: 'high-contrast',
        options: {
            errorCorrectionLevel: 'H' as const,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        }
    },
    { 
        name: 'Compact', 
        id: 'compact',
        options: {
            errorCorrectionLevel: 'L' as const,
            margin: 0
        }
    },
    { 
        name: 'Robust', 
        id: 'robust',
        options: {
            errorCorrectionLevel: 'Q' as const,
            margin: 3
        }
    }
];

// Field icon options
export const fieldIcons = {
    phone: [
        { emoji: '📞', name: 'Classic Phone' },
        { emoji: '📱', name: 'Mobile Phone' },
        { emoji: '☎️', name: 'Telephone' },
        { emoji: '📲', name: 'Smartphone' },
        { emoji: '🔔', name: 'Bell' },
        { emoji: '💬', name: 'Speech Bubble' },
        { emoji: '📢', name: 'Megaphone' },
        { emoji: '🎤', name: 'Microphone' }
    ],
    email: [
        { emoji: '📧', name: 'Email' },
        { emoji: '✉️', name: 'Envelope' },
        { emoji: '📮', name: 'Postbox' },
        { emoji: '📬', name: 'Mailbox' },
        { emoji: '📩', name: 'Incoming Mail' },
        { emoji: '💌', name: 'Love Letter' },
        { emoji: '📨', name: 'Outgoing Mail' },
        { emoji: '🔔', name: 'Notification' }
    ],
    address: [
        { emoji: '📍', name: 'Pin Location' },
        { emoji: '🏠', name: 'House' },
        { emoji: '🏢', name: 'Office Building' },
        { emoji: '🌍', name: 'Globe' },
        { emoji: '🗺️', name: 'Map' },
        { emoji: '📌', name: 'Pushpin' },
        { emoji: '🏘️', name: 'Houses' },
        { emoji: '🏙️', name: 'Cityscape' }
    ],
    website: [
        { emoji: '🌐', name: 'Globe' },
        { emoji: '💻', name: 'Laptop' },
        { emoji: '🖥️', name: 'Desktop' },
        { emoji: '📱', name: 'Mobile' },
        { emoji: '🔗', name: 'Link' },
        { emoji: '⭐', name: 'Star' },
        { emoji: '🚀', name: 'Rocket' },
        { emoji: '💡', name: 'Light Bulb' }
    ],
    company: [
        { emoji: '🏢', name: 'Office Building' },
        { emoji: '🏭', name: 'Factory' },
        { emoji: '🏪', name: 'Store' },
        { emoji: '🏛️', name: 'Institution' },
        { emoji: '💼', name: 'Briefcase' },
        { emoji: '🏆', name: 'Trophy' },
        { emoji: '⭐', name: 'Star' },
        { emoji: '🎯', name: 'Target' }
    ],
    title: [
        { emoji: '👔', name: 'Tie' },
        { emoji: '💼', name: 'Briefcase' },
        { emoji: '🎯', name: 'Target' },
        { emoji: '🏆', name: 'Trophy' },
        { emoji: '⭐', name: 'Star' },
        { emoji: '👑', name: 'Crown' },
        { emoji: '🎖️', name: 'Medal' },
        { emoji: '🥇', name: 'Gold Medal' }
    ]
};

export type FieldIconType = keyof typeof fieldIcons;
export type FieldIcon = typeof fieldIcons[FieldIconType][0];
export type BackgroundOption = typeof backgroundOptions[0];
export type QRPattern = typeof qrPatterns[0];

export interface FieldIcons {
    phone: FieldIcon;
    email: FieldIcon;
    address: FieldIcon;
    website: FieldIcon;
    company: FieldIcon;
    title: FieldIcon;
}

interface CustomizationProps {
    selectedBackground: BackgroundOption;
    selectedQRPattern: QRPattern;
    selectedFieldIcons: FieldIcons;
    onBackgroundSelect: (bg: BackgroundOption) => void;
    onQRPatternSelect: (pattern: QRPattern) => void;
    onFieldIconSelect: (field: FieldIconType, icon: FieldIcon) => void;
}

// Animation component for smooth expand/collapse
const AnimatedCollapse: React.FC<{ 
    isOpen: boolean; 
    children: React.ReactNode;
    className?: string;
}> = ({ isOpen, children, className = '' }) => {
    return (
        <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
            <div className={`transform transition-all duration-300 ease-in-out ${
                isOpen ? 'translate-y-0 scale-100' : '-translate-y-2 scale-98'
            } ${className}`}>
                {children}
            </div>
        </div>
    );
};

const Customization: React.FC<CustomizationProps> = ({
    selectedBackground,
    selectedQRPattern,
    selectedFieldIcons,
    onBackgroundSelect,
    onQRPatternSelect,
    onFieldIconSelect
}) => {
    const [activeIconField, setActiveIconField] = useState<FieldIconType | null>(null);
    const [activeSection, setActiveSection] = useState<'background' | 'icons' | 'qr' | null>('background');

    // Handle background selection
    const handleBackgroundSelect = (e: React.MouseEvent, bg: BackgroundOption) => {
        e.preventDefault();
        e.stopPropagation();
        onBackgroundSelect(bg);
    };

    // Handle QR pattern selection
    const handleQRPatternSelect = (e: React.MouseEvent, pattern: QRPattern) => {
        e.preventDefault();
        e.stopPropagation();
        onQRPatternSelect(pattern);
    };

    // Handle field icon selection
    const handleFieldIconSelect = (field: FieldIconType, icon: FieldIcon) => {
        onFieldIconSelect(field, icon);
        setActiveIconField(null);
    };

    const fieldLabels = {
        phone: 'Phone',
        email: 'Email',
        address: 'Address',
        website: 'Website',
        company: 'Company',
        title: 'Job Title'
    };

    const toggleSection = (section: 'background' | 'icons' | 'qr') => {
        setActiveSection(activeSection === section ? null : section);
        if (section !== 'icons') {
            setActiveIconField(null);
        }
    };

    const handleSectionToggle = (e: React.MouseEvent, section: 'background' | 'icons' | 'qr') => {
        e.preventDefault();
        e.stopPropagation();
        toggleSection(section);
    };

    return (
        <div className="w-full lg:w-96 bg-gradient-to-br from-gray-50 to-gray-100 border-r border-gray-200 max-h-screen overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 shadow-sm z-10">
                <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center mr-3 transform transition-transform duration-200 hover:scale-110">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </div>
                    Design Studio
                </h3>
                <p className="text-sm text-gray-600">Customize your business card appearance</p>
            </div>

            <div className="p-6 space-y-6">
                {/* Background Colors Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transform transition-all duration-200 hover:shadow-md">
                    <button
                        onClick={(e) => handleSectionToggle(e, 'background')}
                        className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-all duration-200 hover:cursor-pointer"
                        type="button"
                    >
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center mr-3 transform transition-transform duration-200 hover:scale-110">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800">Background Theme</h4>
                                <p className="text-sm text-gray-500">{selectedBackground.name}</p>
                            </div>
                        </div>
                        <svg 
                            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ease-in-out ${activeSection === 'background' ? 'rotate-180' : ''}`}
                            fill="none" 
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    
                    <AnimatedCollapse isOpen={activeSection === 'background'}>
                        <div className="p-4 pt-0 border-t border-gray-100">
                            <div className="grid grid-cols-2 gap-3">
                                {backgroundOptions.map((bg, index) => (
                                    <button
                                        key={bg.id}
                                        onClick={(e) => handleBackgroundSelect(e, bg)}
                                        className={`hover:cursor-pointer group relative p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                                            selectedBackground.id === bg.id 
                                                ? 'border-blue-500 shadow-md ring-2 ring-blue-200' 
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                        style={{
                                            animationDelay: `${index * 50}ms`,
                                            animation: activeSection === 'background' ? 'slideInUp 0.4s ease-out forwards' : 'none'
                                        }}
                                    >
                                        <div 
                                            className="w-full h-12 rounded-lg mb-3 shadow-inner transform transition-transform duration-200 group-hover:scale-105"
                                            style={{ 
                                                background: `linear-gradient(135deg, ${bg.gradient[0]}, ${bg.gradient[1]})` 
                                            }}
                                        ></div>
                                        <span className="text-xs font-medium text-gray-700 block text-center">{bg.name}</span>
                                        {selectedBackground.id === bg.id && (
                                            <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </AnimatedCollapse>
                </div>

                {/* Field Icons Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transform transition-all duration-200 hover:shadow-md">
                    <button
                        onClick={() => toggleSection('icons')}
                        className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-all duration-200 hover:cursor-pointer"
                        type="button"
                    >
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center mr-3 transform transition-transform duration-200 hover:scale-110">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a1.5 1.5 0 001.5-1.5V7a1.5 1.5 0 00-1.5-1.5H9m0 0a1.5 1.5 0 00-1.5 1.5V9a1.5 1.5 0 001.5 1.5m0-2.5H7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800">Field Icons</h4>
                                <p className="text-sm text-gray-500">Customize contact field symbols</p>
                            </div>
                        </div>
                        <svg 
                            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ease-in-out ${activeSection === 'icons' ? 'rotate-180' : ''}`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    
                    <AnimatedCollapse isOpen={activeSection === 'icons'}>
                        <div className="p-4 pt-0 border-t border-gray-100">
                            <div className="space-y-3">
                                {Object.entries(fieldIcons).map(([field, icons], index) => (
                                    <div 
                                        key={field} 
                                        className="border border-gray-200 rounded-lg overflow-hidden transform transition-all duration-300"
                                        style={{
                                            animationDelay: `${index * 100}ms`,
                                            animation: activeSection === 'icons' ? 'slideInRight 0.4s ease-out forwards' : 'none'
                                        }}
                                    >
                                        <button
                                            onClick={() => setActiveIconField(activeIconField === field ? null : field as FieldIconType)}
                                            className="w-full p-3 flex items-center justify-between text-left hover:bg-gray-50 transition-all duration-200 hover:cursor-pointer"
                                            type="button"
                                        >
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 transform transition-transform duration-200 hover:scale-110">
                                                    <span className="text-lg">{selectedFieldIcons[field as FieldIconType].emoji}</span>
                                                </div>
                                                <span className="text-sm font-medium text-gray-700">{fieldLabels[field as FieldIconType]}</span>
                                            </div>
                                            <svg 
                                                className={`w-4 h-4 text-gray-400 transition-transform duration-300 ease-in-out ${activeIconField === field ? 'rotate-180' : ''}`}
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        
                                        <AnimatedCollapse isOpen={activeIconField === field}>
                                            <div className="p-3 pt-0 bg-gray-50 border-t border-gray-200">
                                                <div className="grid grid-cols-4 gap-2">
                                                    {icons.map((icon, iconIndex) => (
                                                        <button
                                                            key={icon.emoji}
                                                            onClick={() => handleFieldIconSelect(field as FieldIconType, icon)}
                                                            className={`hover:cursor-pointer relative p-3 rounded-lg border-2 text-center transition-all duration-300 hover:scale-110 hover:shadow-md ${
                                                                selectedFieldIcons[field as FieldIconType].emoji === icon.emoji
                                                                    ? 'border-blue-500 bg-blue-50 shadow-md'
                                                                    : 'border-gray-200 hover:border-gray-300 bg-white'
                                                            }`}
                                                            type="button"
                                                            title={icon.name}
                                                            style={{
                                                                animationDelay: `${iconIndex * 30}ms`,
                                                                animation: activeIconField === field ? 'bounceIn 0.4s ease-out forwards' : 'none'
                                                            }}
                                                        >
                                                            <span className="text-xl">{icon.emoji}</span>
                                                            {selectedFieldIcons[field as FieldIconType].emoji === icon.emoji && (
                                                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                                                                    <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                </div>
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </AnimatedCollapse>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AnimatedCollapse>
                </div>
                
                {/* QR Code Patterns Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transform transition-all duration-200 hover:shadow-md">
                    <button
                        onClick={() => toggleSection('qr')}
                        className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-all duration-200 hover:cursor-pointer"
                        type="button"
                    >
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center justify-center mr-3 transform transition-transform duration-200 hover:scale-110">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800">QR Code Style</h4>
                                <p className="text-sm text-gray-500">{selectedQRPattern.name}</p>
                            </div>
                        </div>
                        <svg 
                            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ease-in-out ${activeSection === 'qr' ? 'rotate-180' : ''}`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    
                    <AnimatedCollapse isOpen={activeSection === 'qr'}>
                        <div className="p-4 pt-0 border-t border-gray-100">
                            <div className="space-y-3">
                                {qrPatterns.map((pattern, index) => (
                                    <button
                                        key={pattern.id}
                                        onClick={(e) => handleQRPatternSelect(e, pattern)}
                                        className={`hover:cursor-pointer group w-full p-4 text-left rounded-xl border-2 transition-all duration-300 hover:shadow-md ${
                                            selectedQRPattern.id === pattern.id 
                                                ? 'border-blue-500 bg-blue-50 shadow-md' 
                                                : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                                        }`}
                                        style={{
                                            animationDelay: `${index * 75}ms`,
                                            animation: activeSection === 'qr' ? 'slideInLeft 0.4s ease-out forwards' : 'none'
                                        }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 mr-4 border border-gray-300 bg-black rounded-lg flex items-center justify-center relative overflow-hidden transform transition-transform duration-200 group-hover:scale-110">
                                                    <div className="absolute inset-1 bg-white"></div>
                                                    <div className="relative z-10 grid grid-cols-3 gap-px w-6 h-6">
                                                        {[...Array(9)].map((_, i) => (
                                                            <div key={i} className={`${Math.random() > 0.5 ? 'bg-black' : 'bg-white'} w-full h-full transition-all duration-300`}></div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="font-medium text-gray-800 block">{pattern.name}</span>
                                                    <span className="text-xs text-gray-500">
                                                        Error Level: {pattern.options.errorCorrectionLevel} • Margin: {pattern.options.margin}
                                                    </span>
                                                </div>
                                            </div>
                                            {selectedQRPattern.id === pattern.id && (
                                                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </AnimatedCollapse>
                </div>
            </div>
            
            {/* Footer */}
            <div className="sticky bottom-0 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 p-4">
                <div className="flex items-center justify-center text-xs text-gray-500">
                    <svg className="w-4 h-4 mr-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Changes apply instantly to preview
                </div>
            </div>
            
            {/* CSS for custom animations */}
            <style>{`
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes bounceIn {
                    0% {
                        opacity: 0;
                        transform: scale(0.3);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.05);
                    }
                    70% {
                        transform: scale(0.9);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>
    );
};

export default Customization;