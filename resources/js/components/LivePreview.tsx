import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import QRCode from 'qrcode';
import Customization, { 
    backgroundOptions, 
    qrPatterns, 
    fieldIcons,
    BackgroundOption, 
    QRPattern, 
    FieldIcons,
    FieldIconType,
    FieldIcon
} from './Customization';

type FormDataType = {
    vcard_fname: string;
    vcard_mname: string;
    vcard_lname: string;
    vcard_suffix: string;
    con_email: string;
    con_phone: string;
    img_photo: string | File | null;
    img_logo: string | File | null;
    soc_linkedin: string;
    soc_twitter: string;
    soc_facebook: string;
    soc_instagram: string;
    soc_youtube: string;
    soc_customlink: string;
    wrk_org: string;
    wkr_email: string;
    wrk_title: string;
    wrk_role: string;
    wrk_URL: string;
    wa_street: string;
    wa_city: string;
    wa_state: string;
    wa_postal_code: string;
    wa_country: string;
};

interface LivePreviewProps {
    data: FormDataType;
}

interface LivePreviewRef {
    downloadAsJPG: () => Promise<void>;
}

const LivePreview = forwardRef<LivePreviewRef, LivePreviewProps>(({ data }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const modalCanvasRef = useRef<HTMLCanvasElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBackground, setSelectedBackground] = useState<BackgroundOption>(backgroundOptions[0]);
    const [selectedQRPattern, setSelectedQRPattern] = useState<QRPattern>(qrPatterns[0]);
    
    // Initialize field icons with default selections (first icon of each type)
    const [selectedFieldIcons, setSelectedFieldIcons] = useState<FieldIcons>({
        phone: fieldIcons.phone[0],
        email: fieldIcons.email[0],
        address: fieldIcons.address[0],
        website: fieldIcons.website[0],
        company: fieldIcons.company[0],
        title: fieldIcons.title[0]
    });

    // Handle field icon selection
    const handleFieldIconSelect = (field: FieldIconType, icon: FieldIcon) => {
        setSelectedFieldIcons(prev => ({
            ...prev,
            [field]: icon
        }));
    };

    const generateLivePreview = async (canvas: HTMLCanvasElement, isModal = false, isDownload = false) => {
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        // Set canvas dimensions based on mode
        if (isDownload) {
            // High resolution for download (business card size: 3.5" x 2" at 300 DPI)
            canvas.width = 1050;  // 3.5 * 300
            canvas.height = 600;  // 2 * 300
        } else if (isModal) {
            canvas.width = 840;  // 2x the preview size for modal
            canvas.height = 480;
        } else {
            canvas.width = 420;  // 40% of original size for preview
            canvas.height = 240;
        }
        
        const scale = isDownload ? 2.5 : (isModal ? 2 : 1); // Scale factor
        
        // Background gradient with selected colors
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, selectedBackground.gradient[0]);
        gradient.addColorStop(1, selectedBackground.gradient[1]);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // White card background with rounded corners
        const cardPadding = 16 * scale;
        const cardX = cardPadding;
        const cardY = cardPadding;
        const cardWidth = canvas.width - (cardPadding * 2);
        const cardHeight = canvas.height - (cardPadding * 2);
        const cornerRadius = 8 * scale;
        
        // Helper function to draw rounded rectangle
        const drawRoundedRect = (x: number, y: number, width: number, height: number, radius: number) => {
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            ctx.lineTo(x + width, y + height - radius);
            ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            ctx.lineTo(x + radius, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
        };
        
        // Draw rounded rectangle
        ctx.fillStyle = '#ffffff';
        drawRoundedRect(cardX, cardY, cardWidth, cardHeight, cornerRadius);
        ctx.fill();
        
        // Add subtle shadow for download version
        if (isDownload) {
            ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 5;
        }
        
        // Reset shadow for text and images
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        // Image dimensions
        const photoSize = 50 * scale;
        const logoSize = 40 * scale;
        const imageMargin = 8 * scale;
        
        // Load images first
        const loadImages = async () => {
            const imagePromises: Promise<void>[] = [];
            
            // Load photo
            if (data.img_photo) {
                const photoPromise = new Promise<void>((resolve) => {
                    try {
                        const photoImage = new Image();
                        photoImage.onload = () => {
                            ctx.save();
                            // Create circular clipping path for photo
                            const photoX = cardX + imageMargin;
                            const photoY = cardY + imageMargin;
                            const radius = photoSize / 2;
                            
                            ctx.beginPath();
                            ctx.arc(photoX + radius, photoY + radius, radius, 0, Math.PI * 2);
                            ctx.closePath();
                            ctx.clip();
                            
                            // Draw the photo
                            ctx.drawImage(photoImage, photoX, photoY, photoSize, photoSize);
                            ctx.restore();
                            resolve();
                        };
                        photoImage.onerror = () => resolve();
                        
                        if (data.img_photo instanceof File) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                if (e.target?.result) {
                                    photoImage.src = e.target.result as string;
                                }
                            };
                            reader.readAsDataURL(data.img_photo);
                        } else if (typeof data.img_photo === 'string') {
                            photoImage.src = data.img_photo;
                        }
                    } catch (error) {
                        console.error('Error loading photo:', error);
                        resolve();
                    }
                });
                imagePromises.push(photoPromise);
            }
            
            // Load logo
            if (data.img_logo) {
                const logoPromise = new Promise<void>((resolve) => {
                    try {
                        const logoImage = new Image();
                        logoImage.onload = () => {
                            const logoX = cardX + cardWidth - logoSize - imageMargin;
                            const logoY = cardY + imageMargin;
                            
                            // Draw the logo with rounded corners
                            ctx.save();
                            drawRoundedRect(logoX, logoY, logoSize, logoSize, 4 * scale);
                            ctx.clip();
                            ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize);
                            ctx.restore();
                            resolve();
                        };
                        logoImage.onerror = () => resolve();
                        
                        if (data.img_logo instanceof File) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                if (e.target?.result) {
                                    logoImage.src = e.target.result as string;
                                }
                            };
                            reader.readAsDataURL(data.img_logo);
                        } else if (typeof data.img_logo === 'string') {
                            logoImage.src = data.img_logo;
                        }
                    } catch (error) {
                        console.error('Error loading logo:', error);
                        resolve();
                    }
                });
                imagePromises.push(logoPromise);
            }
            
            await Promise.all(imagePromises);
        };
        
        await loadImages();
        
        // Calculate layout areas - giving more space for photo
        const leftMargin = 80 * scale; // Increased from 32 to give photo more space
        const lineHeight = 18 * scale;
        
        // Text styling for left section
        ctx.fillStyle = '#333333';
        ctx.textAlign = 'left';
        
        // Name starts at the same level as photo but with more margin
        let yPosition = cardY + imageMargin + (20 * scale); // Aligned with photo but with some vertical spacing
        
        // Name (larger font)
        const fullName = `${data.vcard_fname} ${data.vcard_mname} ${data.vcard_lname}`.trim();
        if (fullName) {
            ctx.font = `bold ${16 * scale}px Arial, sans-serif`;
            ctx.fillStyle = '#2c3e50';
            ctx.fillText(fullName, leftMargin, yPosition);
            yPosition += 22 * scale;
        } else {
            ctx.font = `bold ${16 * scale}px Arial, sans-serif`;
            ctx.fillStyle = '#cccccc';
            ctx.fillText('Your Name Here', leftMargin, yPosition);
            yPosition += 22 * scale;
        }
        
        // Role/Organization with custom icon
        if (data.wrk_role || data.wrk_org) {
            ctx.font = `${11 * scale}px Arial, sans-serif`;
            ctx.fillStyle = '#7f8c8d';
            const roleOrg = [data.wrk_role, data.wrk_org].filter(Boolean).join(' at ');
            ctx.fillText(`${selectedFieldIcons.title.emoji} ${roleOrg}`, leftMargin, yPosition);
            yPosition += 18 * scale;
        }
        
        // Contact information with custom icons
        ctx.font = `${9 * scale}px Arial, sans-serif`;
        ctx.fillStyle = '#34495e';
        
        if (data.con_phone) {
            ctx.fillText(`${selectedFieldIcons.phone.emoji} ${data.con_phone}`, leftMargin, yPosition);
            yPosition += lineHeight;
        }
        
        if (data.con_email) {
            ctx.fillText(`${selectedFieldIcons.email.emoji} ${data.con_email}`, leftMargin, yPosition);
            yPosition += lineHeight;
        }
        
        if (data.wkr_email && data.wkr_email !== data.con_email) {
            ctx.fillText(`${selectedFieldIcons.email.emoji} ${data.wkr_email}`, leftMargin, yPosition);
            yPosition += lineHeight;
        }
        
        // Address (if available) with custom icon
        const address = [
            data.wa_street,
            [data.wa_city, data.wa_state].filter(Boolean).join(', '),
            data.wa_postal_code,
            data.wa_country
        ].filter(Boolean).join(', ');
        
        if (address) {
            ctx.font = `${8 * scale}px Arial, sans-serif`;
            // Truncate long addresses for preview
            const maxLength = isDownload ? 100 : (isModal ? 60 : 40);
            const shortAddress = address.length > maxLength ? address.substring(0, maxLength - 3) + '...' : address;
            ctx.fillText(`${selectedFieldIcons.address.emoji} ${shortAddress}`, leftMargin, yPosition);
        }
        
        // Generate QR Code with selected pattern if website URL is available
        if (data.wrk_URL) {
            try {
                const qrSize = isDownload ? 400 : (isModal ? 160 : 80);
                
                // Build QR options with selected pattern
                const qrOptions = {
                    width: qrSize,
                    type: 'image/png' as const,
                    rendererOpts: {
                        quality: 0.92
                    },
                    ...selectedQRPattern.options
                };
                
                console.log('Generating QR with pattern:', selectedQRPattern.name, qrOptions); // Debug log
                
                const qrCodeDataURL = await QRCode.toDataURL(data.wrk_URL, qrOptions);
                
                // Load QR code image
                const qrImage = new Image();
                await new Promise<void>((resolve) => {
                    qrImage.onload = () => {
                        // Position QR code in the bottom right corner
                        const displaySize = 60 * scale;
                        const qrX = cardX + cardWidth - displaySize - imageMargin;
                        const qrY = cardY + cardHeight - displaySize - imageMargin - (20 * scale); // Bottom right with margin
                        
                        // Draw QR code
                        ctx.drawImage(qrImage, qrX, qrY, displaySize, displaySize);
                        
                        // Add "Visit Website" text below QR code with custom icon
                        ctx.font = `bold ${6 * scale}px Arial, sans-serif`;
                        ctx.fillStyle = '#000000';
                        ctx.textAlign = 'center';
                        ctx.fillText(`${selectedFieldIcons.website.emoji} Visit Website`, qrX + displaySize/2, qrY + displaySize + (10 * scale));
                        
                        // Add website URL below
                        ctx.font = `${5 * scale}px Arial, sans-serif`;
                        ctx.fillStyle = '#666666';
                        const displayURL = data.wrk_URL.replace(/^https?:\/\//, '');
                        const maxURLLength = isDownload ? 50 : (isModal ? 30 : 20);
                        const shortURL = displayURL.length > maxURLLength ? displayURL.substring(0, maxURLLength - 3) + '...' : displayURL;
                        ctx.fillText(shortURL, qrX + displaySize/2, qrY + displaySize + (18 * scale));
                        resolve();
                    };
                    qrImage.onerror = () => resolve();
                    qrImage.src = qrCodeDataURL;
                });
            } catch (error) {
                console.error('Error generating QR code for preview:', error);
            }
        }
    };

    // Expose download function via ref
    useImperativeHandle(ref, () => ({
        downloadAsJPG: async () => {
            const downloadCanvas = document.createElement('canvas');
            await generateLivePreview(downloadCanvas, false, true);
            
            downloadCanvas.toBlob((blob) => {
                if (!blob) {
                    console.error('Failed to create blob from canvas');
                    return;
                }
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                const fullName = `${data.vcard_fname} ${data.vcard_mname} ${data.vcard_lname}`.trim();
                a.download = `${fullName || 'contact'}_card.jpg`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 'image/jpeg', 0.9);
        }
    }));

    // Generate preview for small canvas
    const generateSmallPreview = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            generateLivePreview(canvas, false);
        }
    };

    // Generate preview for modal canvas
    const generateModalPreview = () => {
        const canvas = modalCanvasRef.current;
        if (canvas) {
            generateLivePreview(canvas, true);
        }
    };

    // Update preview when data or customization options change
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            generateSmallPreview();
            if (isModalOpen) {
                generateModalPreview();
            }
        }, 300); // Debounce to avoid too many re-renders
        
        return () => clearTimeout(timeoutId);
    }, [data, isModalOpen, selectedBackground, selectedQRPattern, selectedFieldIcons]);

    // Initial preview render
    useEffect(() => {
        generateSmallPreview();
    }, []);

    // Handle canvas click to open modal
    const handleCanvasClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsModalOpen(true);
        // Generate modal preview after a short delay to ensure canvas is rendered
        setTimeout(() => {
            generateModalPreview();
        }, 100);
    };

    // Handle modal close
    const handleCloseModal = (e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setIsModalOpen(false);
    };

    // Handle escape key to close modal
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isModalOpen) {
                event.preventDefault();
                handleCloseModal();
            }
        };

        if (isModalOpen) {
            document.addEventListener('keydown', handleEscapeKey);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }
        
        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    return (
        <>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <h3 className="text-lg font-semibold text-gray-800">Live Preview</h3>
                </div>
                <div className="flex justify-center">
                    <div className="relative">
                        <canvas 
                            ref={canvasRef}
                            className="border border-gray-300 rounded-lg shadow-md hover:cursor-pointer hover:shadow-lg transition-shadow duration-200"
                            style={{ maxWidth: '100%', height: 'auto' }}
                            onClick={handleCanvasClick}
                            title="Click to enlarge and customize"
                        ></canvas>
                        <div className="absolute bottom-2 right-2 bg-orange-200 bg-opacity-75 text-black text-xs px-2 py-1 rounded flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            Click to customize
                        </div>
                    </div>
                </div>
                <p className="text-sm text-gray-600 text-center mt-3">
                    This is how your contact card will look when downloaded in JPG
                </p>
            </div>

            {/* Modal for enlarged preview with customization options */}
            {isModalOpen && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4" 
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)'
                    }}
                    onClick={handleCloseModal}
                >
                    <div 
                        className="relative max-w-6xl max-h-screen bg-white rounded-2xl overflow-hidden shadow-2xl" 
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={handleCloseModal}
                            className="hover:cursor-pointer absolute top-4 right-4 z-10 bg-white text-gray-600 hover:text-gray-800 rounded-full p-2 shadow-lg transition-colors duration-200"
                            title="Close preview (ESC)"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        <div className="flex flex-col lg:flex-row">
                            {/* Customization Panel */}
                            <Customization
                                selectedBackground={selectedBackground}
                                selectedQRPattern={selectedQRPattern}
                                selectedFieldIcons={selectedFieldIcons}
                                onBackgroundSelect={setSelectedBackground}
                                onQRPatternSelect={setSelectedQRPattern}
                                onFieldIconSelect={handleFieldIconSelect}
                            />
                            
                            {/* Preview Canvas */}
                            <div className="flex-1 p-6 flex flex-col items-center justify-center">
                                <canvas 
                                    ref={modalCanvasRef}
                                    className="border border-gray-300 rounded-lg shadow-2xl bg-white"
                                    style={{ maxWidth: '100%', maxHeight: '60vh', height: 'auto' }}
                                ></canvas>
                                
                                {/* Modal footer */}
                                <div className="text-center mt-4">
                                    <p className="text-gray-600 text-sm">
                                        Press <kbd className="bg-gray-200 px-2 py-1 rounded text-xs">ESC</kbd> or click outside to close
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
});

LivePreview.displayName = 'LivePreview';

export default LivePreview;
export type { LivePreviewRef };