import React from 'react';

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

export type BackgroundOption = typeof backgroundOptions[0];
export type QRPattern = typeof qrPatterns[0];

interface CustomizationProps {
    selectedBackground: BackgroundOption;
    selectedQRPattern: QRPattern;
    onBackgroundSelect: (bg: BackgroundOption) => void;
    onQRPatternSelect: (pattern: QRPattern) => void;
}

const Customization: React.FC<CustomizationProps> = ({
    selectedBackground,
    selectedQRPattern,
    onBackgroundSelect,
    onQRPatternSelect
}) => {
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

    return (
        <div className="w-full lg:w-80 p-6 border-r border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Customize Design
            </h3>
            
            {/* Background Colors */}
            <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Background Color</h4>
                <div className="grid grid-cols-2 gap-2">
                    {backgroundOptions.map((bg) => (
                        <button
                            key={bg.id}
                            onClick={(e) => handleBackgroundSelect(e, bg)}
                            className={`p-3 rounded-lg border-2 transition-all duration-200 hover:cursor-pointer ${
                                selectedBackground.id === bg.id 
                                    ? 'border-blue-500 shadow-md' 
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            <div 
                                className="w-full h-8 rounded mb-2"
                                style={{ 
                                    background: `linear-gradient(45deg, ${bg.gradient[0]}, ${bg.gradient[1]})` 
                                }}
                            ></div>
                            <span className="text-xs font-medium text-gray-600">{bg.name}</span>
                        </button>
                    ))}
                </div>
            </div>
            
            {/* QR Code Patterns */}
            <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">QR Code Style</h4>
                <div className="space-y-2">
                    {qrPatterns.map((pattern) => (
                        <button
                            key={pattern.id}
                            onClick={(e) => handleQRPatternSelect(e, pattern)}
                            className={`w-full p-3 text-left rounded-lg border-2 transition-all duration-200 hover:cursor-pointer ${
                                selectedQRPattern.id === pattern.id 
                                    ? 'border-blue-500 bg-blue-50' 
                                    : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-6 h-6 mr-3 border border-gray-300 bg-black flex items-center justify-center">
                                        <div className="text-white text-xs font-bold">QR</div>
                                    </div>
                                    <span className="text-sm font-medium">{pattern.name}</span>
                                </div>
                                {selectedQRPattern.id === pattern.id && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}
                            </div>
                            <div className="text-xs text-gray-500 mt-1 ml-9">
                                Error correction: {pattern.options.errorCorrectionLevel}, 
                                Margin: {pattern.options.margin}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="text-xs text-gray-500">
                💡 Changes are applied instantly to the preview
            </div>
        </div>
    );
};

export default Customization;