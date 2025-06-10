<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Suffix;
use App\Models\FullName;
use App\Models\Contact;
use App\Models\Image;
use App\Models\Social;
use App\Models\Work;
use App\Models\WorkAddress;

class VCardController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'vcard_fname' => 'required|string|max:255',
            'vcard_mname' => 'nullable|string|max:255',
            'vcard_lname' => 'required|string|max:255',
            'vcard_suffix' => 'nullable|exists:suffixes,id',
            'con_email' => 'nullable|email|max:255',
            'con_phone' => 'nullable|string|max:255',
            'img_photo' => 'nullable|string|max:255',
            'img_logo' => 'nullable|string|max:255',
            'soc_linkedin' => 'nullable|string|max:255',
            'soc_twitter' => 'nullable|string|max:255',
            'soc_facebook' => 'nullable|string|max:255',
            'soc_instagram' => 'nullable|string|max:255',
            'soc_youtube' => 'nullable|string|max:255',
            'soc_customlink' => 'nullable|string|max:255',
            'wrk_org' => 'nullable|string|max:255',
            'wkr_email' => 'nullable|email|max:255',
            'wrk_title' => 'nullable|string|max:255',
            'wrk_role' => 'nullable|string|max:255',
            'wrk_URL' => 'nullable|string|max:255',
            'wa_street' => 'nullable|string|max:255',
            'wa_city' => 'nullable|string|max:255',
            'wa_state' => 'nullable|string|max:255',
            'wa_postal_code' => 'nullable|string|max:255',
            'wa_country' => 'nullable|string|max:255',
        ]);

        DB::transaction(function () use ($validated) {
            // 1. Save full_names
            $fullName = \App\Models\FullName::create([
                'vcard_fname' => $validated['vcard_fname'],
                'vcard_mname' => $validated['vcard_mname'] ?? null,
                'vcard_lname' => $validated['vcard_lname'],
                'vcard_suffix' => $validated['vcard_suffix'] ?? null,
            ]);

            // 2. Save contacts
            \App\Models\Contact::create([
                'vcard_id' => $fullName->vcard_id,
                'con_email' => $validated['con_email'] ?? null,
                'con_phone' => $validated['con_phone'] ?? null,
            ]);

            // 3. Save images
            \App\Models\Image::create([
                'vcard_id' => $fullName->vcard_id,
                'img_photo' => $validated['img_photo'] ?? null,
                'img_logo' => $validated['img_logo'] ?? null,
            ]);

            // 4. Save socials
            \App\Models\Social::create([
                'vcard_id' => $fullName->vcard_id,
                'soc_linkedin' => $validated['soc_linkedin'] ?? null,
                'soc_twitter' => $validated['soc_twitter'] ?? null,
                'soc_facebook' => $validated['soc_facebook'] ?? null,
                'soc_instagram' => $validated['soc_instagram'] ?? null,
                'soc_youtube' => $validated['soc_youtube'] ?? null,
                'soc_customlink' => $validated['soc_customlink'] ?? null,
            ]);

            // 5. Save work
            $work = \App\Models\Work::create([
                'wrk_org' => $validated['wrk_org'] ?? null,
                'wkr_email' => $validated['wkr_email'] ?? null,
                'wrk_title' => $validated['wrk_title'] ?? null,
                'wrk_role' => $validated['wrk_role'] ?? null,
                'wrk_URL' => $validated['wrk_URL'] ?? null,
            ]);

            // 6. Save work address if provided
            if (
                !empty($validated['wa_street']) ||
                !empty($validated['wa_city']) ||
                !empty($validated['wa_state']) ||
                !empty($validated['wa_postal_code']) ||
                !empty($validated['wa_country'])
            ) {
                \App\Models\WorkAddress::create([
                    'wa_street' => $validated['wa_street'] ?? '',
                    'wa_city' => $validated['wa_city'] ?? '',
                    'wa_state' => $validated['wa_state'] ?? '',
                    'wa_postal_code' => $validated['wa_postal_code'] ?? '',
                    'wa_country' => $validated['wa_country'] ?? '',
                ]);
            }
        });

        return redirect()->route('home')->with('success', 'VCard saved!');
    }
}