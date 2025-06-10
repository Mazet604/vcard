import React, { useState } from 'react';
import { usePage, useForm } from '@inertiajs/react';

type Suffix = {
    id: number;
    sfx_name: string;
};

export default function WelcomeForm() {
    const { suffixes } = usePage<{ suffixes: Suffix[] }>().props;

    const {data, setData, post, processing, errors} = useForm({
        vcard_fname: '',
        vcard_mname: '',
        vcard_lname: '',
        vcard_suffix: '',
        con_email: '',
        con_phone: '',
        img_photo: '',
        img_logo: '',
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setData(e.target.name as keyof typeof data, e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('vcard.store'));
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#FDFDFC]">
            <form onSubmit={handleSubmit} className="text-black bg-white p-8 rounded shadow-md w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">Create Your VCard</h2>
                <div className="mb-2">
                    <label>First Name</label>
                    <input name="vcard_fname" value={data.vcard_fname} onChange={handleChange} className="input" required />
                </div>
                <div className="mb-2">
                    <label>Middle Name</label>
                    <input name="vcard_mname" value={data.vcard_mname} onChange={handleChange} className="input" />
                </div>
                <div className="mb-2">
                    <label>Last Name</label>
                    <input name="vcard_lname" value={data.vcard_lname} onChange={handleChange} className="input" required />
                </div>
                <div className="mb-2">
                    <label>Suffix</label>
                    <select
                        name="vcard_suffix"
                        value={data.vcard_suffix}
                        onChange={handleChange}
                        className="input"
                    >
                        <option value="">Select Suffix</option>
                        {suffixes.map((opt: Suffix) => (
                            <option key={opt.id} value={opt.id}>
                                {opt.sfx_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-2">
                    <label>Email</label>
                    <input name="con_email" value={data.con_email} onChange={handleChange} className="input" type="email" />
                </div>
                <div className="mb-2">
                    <label>Phone</label>
                    <input name="con_phone" value={data.con_phone} onChange={handleChange} className="input" type="tel" />
                </div>
                <div className="mb-2">
                    <label>Photo URL</label>
                    <input name="img_photo" value={data.img_photo} onChange={handleChange} className="input" />
                </div>
                <div className="mb-2">
                    <label>Logo URL</label>
                    <input name="img_logo" value={data.img_logo} onChange={handleChange} className="input" />
                </div>
                <div className="mb-2">
                    <label>LinkedIn</label>
                    <input name="soc_linkedin" value={data.soc_linkedin} onChange={handleChange} className="input" />
                </div>
                <div className="mb-2">
                    <label>Twitter</label>
                    <input name="soc_twitter" value={data.soc_twitter} onChange={handleChange} className="input" />
                </div>
                <div className="mb-2">
                    <label>Facebook</label>
                    <input name="soc_facebook" value={data.soc_facebook} onChange={handleChange} className="input" />
                </div>
                <div className="mb-2">
                    <label>Instagram</label>
                    <input name="soc_instagram" value={data.soc_instagram} onChange={handleChange} className="input" />
                </div>
                <div className="mb-2">
                    <label>YouTube</label>
                    <input name="soc_youtube" value={data.soc_youtube} onChange={handleChange} className="input" />
                </div>
                <div className="mb-2">
                    <label>Custom Link</label>
                    <input name="soc_customlink" value={data.soc_customlink} onChange={handleChange} className="input" />
                </div>
                <div className="mb-2">
                    <label>Organization</label>
                    <input name="wrk_org" value={data.wrk_org} onChange={handleChange} className="input" />
                </div>
                <div className="mb-2">
                    <label>Work Email</label>
                    <input name="wkr_email" value={data.wkr_email} onChange={handleChange} className="input" type="email" />
                </div>
                <div className="mb-2">
                    <label>Title</label>
                    <input name="wrk_title" value={data.wrk_title} onChange={handleChange} className="input" />
                </div>
                <div className="mb-2">
                    <label>Role</label>
                    <input name="wrk_role" value={data.wrk_role} onChange={handleChange} className="input" />
                </div>
                <div className="mb-2">
                    <label>Work URL</label>
                    <input name="wrk_URL" value={data.wrk_URL} onChange={handleChange} className="input" />
                </div>
                <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Save VCard</button>
            </form>
        </div>
    );
}