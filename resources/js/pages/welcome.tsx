import React, { useState, useRef, useEffect } from 'react';
import { usePage, useForm } from '@inertiajs/react';
import ContactSection from '../components/ContactSection';
import ImageSection from '../components/ImageSection';
import SocialSection from '../components/SocialSection';
import WorkSection from '../components/WorkSection';
import WorkAddressSection from '../components/WorkAddressSection';
import PersonalInformationComponent from '../components/PersonalInformationComponent';
import LivePreview, { LivePreviewRef } from '../components/LivePreview';

type Suffix = {
    id: number;
    sfx_name: string;
};

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

export default function WelcomeForm() {
    const { suffixes } = usePage<{ suffixes: Suffix[] }>().props;
    const livePreviewRef = useRef<LivePreviewRef>(null);

    const { data, setData, post, processing, errors } = useForm<FormDataType>({
        vcard_fname: '',
        vcard_mname: '',
        vcard_lname: '',
        vcard_suffix: '',
        con_email: '',
        con_phone: '',
        img_photo: null,
        img_logo: null,
        soc_linkedin: '',
        soc_twitter: '',
        soc_facebook: '',
        soc_instagram: '',
        soc_youtube: '',
        soc_customlink: '',
        wrk_org: '',
        wkr_email: '',
        wrk_title: '',
        wrk_role: '',
        wrk_URL: '',
        wa_street: '',
        wa_city: '',
        wa_state: '',
        wa_postal_code: '',
        wa_country: '',
    });

    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (e.target instanceof HTMLInputElement && e.target.type === "file") {
            const file = e.target.files ? e.target.files[0] : null;
            setData(e.target.name as keyof typeof data, file);

            // Preview for images
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (e.target.name === "img_photo") setPhotoPreview(reader.result as string);
                    if (e.target.name === "img_logo") setLogoPreview(reader.result as string);
                };
                reader.readAsDataURL(file);
            } else {
                if (e.target.name === "img_photo") setPhotoPreview(null);
                if (e.target.name === "img_logo") setLogoPreview(null);
            }
        } else {
            setData(e.target.name as keyof typeof data, e.target.value);
        }
    };

    const renderError = (field: keyof FormDataType) =>
        errors[field] && <div className="text-red-500 text-sm mt-1 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors[field]}
        </div>;

    const generateVCardData = async () => {
        let photoBase64 = '';
        
        // Convert photo to base64 if it exists
        if (data.img_photo && data.img_photo instanceof File) {
            try {
                photoBase64 = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const result = reader.result as string;
                        // Remove data URL prefix to get just the base64 data
                        const base64Data = result.split(',')[1];
                        resolve(base64Data);
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(data.img_photo as File);
                });
            } catch (error) {
                console.error('Error converting photo to base64:', error);
            }
        }

        const vCardData = [
            'BEGIN:VCARD',
            'VERSION:3.0',
            `FN:${data.vcard_fname} ${data.vcard_mname} ${data.vcard_lname}`,
            `N:${data.vcard_lname};${data.vcard_fname};${data.vcard_mname};;`,
            `EMAIL:${data.con_email}`,
            `TEL:${data.con_phone}`,
            `ORG:${data.wrk_org}`,
            `TITLE:${data.wrk_title}`,
            `ROLE:${data.wrk_role}`,
            `EMAIL;TYPE=WORK:${data.wkr_email}`,
            `URL:${data.wrk_URL}`,
            `ADR;TYPE=WORK:;;${data.wa_street};${data.wa_city};${data.wa_state};${data.wa_postal_code};${data.wa_country}`,
            data.soc_linkedin ? `URL;TYPE=LinkedIn:${data.soc_linkedin}` : '',
            data.soc_twitter ? `URL;TYPE=Twitter:${data.soc_twitter}` : '',
            data.soc_facebook ? `URL;TYPE=Facebook:${data.soc_facebook}` : '',
            data.soc_instagram ? `URL;TYPE=Instagram:${data.soc_instagram}` : '',
            data.soc_youtube ? `URL;TYPE=YouTube:${data.soc_youtube}` : '',
            data.soc_customlink ? `URL;TYPE=Custom:${data.soc_customlink}` : '',
            photoBase64 ? `PHOTO;ENCODING=BASE64;TYPE=JPEG:${photoBase64}` : '',
            'END:VCARD'
        ].filter(line => line.trim() !== '').join('\n');
        
        return vCardData;
    };

      const handleDownloadVCard = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const vCardData = await generateVCardData();
        const blob = new Blob([vCardData], { type: 'text/vcard' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${data.vcard_fname}_${data.vcard_lname}_vcard.vcf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    const handleDownloadJPG = async () => {
        if (livePreviewRef.current) {
            await livePreviewRef.current.downloadAsJPG();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ background: 'linear-gradient(to right, #ff1300, #ff5f00)' }}>
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Your VCard</h1>
                    <p className="text-lg text-gray-600">Generate a professional digital business card powered by LAVA Automation</p>
                </div>

                <form className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Progress indicator */}
                    <div className="h-2" style={{ background: 'linear-gradient(to right, #ff1300, #ff5f00)' }}></div>
                    
                    <div className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column */}
                            <div className="space-y-8">
                                <PersonalInformationComponent 
                                    data={data}
                                    suffixes={suffixes}
                                    handleChange={handleChange}
                                    renderError={renderError}
                                />
                                <ContactSection data={data} handleChange={handleChange} renderError={renderError} />
                                <ImageSection 
                                    data={data} 
                                    handleChange={handleChange} 
                                    renderError={renderError}
                                    photoPreview={photoPreview}
                                    logoPreview={logoPreview}
                                />
                                <LivePreview ref={livePreviewRef} data={data} />
                            </div>

                            {/* Right Column */}
                            <div className="space-y-8">
                                <SocialSection data={data} handleChange={handleChange} renderError={renderError} />
                                <WorkSection data={data} handleChange={handleChange} renderError={renderError} />
                                <WorkAddressSection data={data} handleChange={handleChange} renderError={renderError} />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <div className="relative">
                                {/* Spinning border wrapper */}
                                <div className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin group-hover:animate-spin" 
                                    style={{ background: 'conic-gradient(from 0deg, #ff1300, #ff5f00, #ff8533, #ffaa55, #ff1300)' }}>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleDownloadVCard}
                                    className="relative text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:cursor-pointer hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center overflow-hidden group bg-white"
                                    style={{ 
                                        background: 'linear-gradient(45deg, #ff1300, #ff5f00)',
                                    }}
                                    disabled={!data.vcard_fname || !data.vcard_lname || !data.con_email}
                                >
                                    {/* Animated gradient overlay */}
                                    <div 
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{
                                            background: 'linear-gradient(45deg, #ff1300, #ff5f00, #ff8533, #ff1300)',
                                            backgroundSize: '400% 400%',
                                            animation: 'gradientShift 2s ease infinite'
                                        }}
                                    ></div>
                                    <svg className="w-5 h-5 mr-2 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span className="relative z-10">Download VCard (VCF)</span>
                                </button>
                            </div>
                            
                            <div className="relative">
                                {/* Spinning border wrapper */}
                                <div className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin group-hover:animate-spin" 
                                    style={{ background: 'conic-gradient(from 0deg, #ff5f00, #ff1300, #ff8533, #ffaa55, #ff5f00)' }}>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleDownloadJPG}
                                    className="relative text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:cursor-pointer transform hover:scale-105 transition-all duration-200 flex items-center overflow-hidden group bg-white"
                                    style={{ 
                                        background: 'linear-gradient(45deg, #ff5f00, #ff1300)',
                                    }}
                                    disabled={!data.vcard_fname || !data.vcard_lname || !data.con_email}
                                >
                                    {/* Animated gradient overlay */}
                                    <div 
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{
                                            background: 'linear-gradient(45deg, #ff5f00, #ff1300, #ff8533, #ff5f00)',
                                            backgroundSize: '400% 400%',
                                            animation: 'gradientShift 2s ease infinite'
                                        }}
                                    ></div>
                                    <svg className="w-5 h-5 mr-2 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span className="relative z-10">Download VCard (JPG)</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <p className="text-center mt-10">© 2025 LAVA Automation. All Rights Reserved.</p>
        </div>
    );
}

export type { FormDataType };