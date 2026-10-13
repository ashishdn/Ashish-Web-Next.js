import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import { useProperties } from '../context/PropertyContext.jsx';
import { useRouter, Link } from '../context/RouterContext.jsx';
import { districts } from '../data/districts.js';
import { getThanasByDistrict, getAreasByThana } from '../data/locations.js';
import {
  Building2,
  Upload,
  CheckCircle2,
  AlertCircle,
  X,
  FileText,
  DollarSign,
  ShieldCheck,
  User,
  Phone,
  Image,
} from 'lucide-react';

export default function AddPropertyPage() {
  const { t, lang } = useLanguage();
  const { addProperty } = useProperties();
  const { navigate } = useRouter();
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    titleBn: '',
    titleEn: '',
    descriptionBn: '',
    propertyType: 'room',
    monthlyRent: '',
    advance: '',
    availableFrom: '2026-11-01',
    districtSlug: 'dhaka',
    thanaSlug: 'mirpur',
    areaSlug: 'mirpur-10',
    addressBn: '',
    rooms: '1',
    baths: '1',
    floor: '৩য় তলা',
    furnished: 'semi',
    acceptMale: true,
    acceptFemale: false,
    curfewBn: 'রাত ১১:০০ টা',
    cookingBn: 'রান্নার জন্য আলাদা গ্যাস ও চুলা আছে',
    smokingBn: 'রুমের ভেতর ধূমপান নিষেধ',
    guestBn: 'দিনের বেলা অনুমতি সাপেক্ষ',
    customRulesBn: '',
    electricityType: 'মিটার অনুযায়ী আলাদা',
    gasType: 'অন্তর্ভুক্ত',
    serviceChargeAmt: '৫০০',
    landlordName: '',
    landlordPhone: '',
    preferredContact: 'call',
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([
    '/src/assets/images/property_room_interior_1791874098305.jpg',
  ]);
  const [errors, setErrors] = useState({});
  const [submittedPropertySlug, setSubmittedPropertySlug] = useState(null);

  // Thanas and areas based on selected district
  const availableThanas = getThanasByDistrict(formData.districtSlug);
  const availableAreas = getAreasByThana(formData.districtSlug, formData.thanaSlug);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleDistrictChange = (dist) => {
    const newThanas = getThanasByDistrict(dist);
    const firstThana = newThanas.length > 0 ? newThanas[0].thanaSlug : '';
    const newAreas = getAreasByThana(dist, firstThana);
    const firstArea = newAreas.length > 0 ? newAreas[0].slug : '';

    setFormData((prev) => ({
      ...prev,
      districtSlug: dist,
      thanaSlug: firstThana,
      areaSlug: firstArea,
    }));
  };

  const handleThanaChange = (thana) => {
    const newAreas = getAreasByThana(formData.districtSlug, thana);
    const firstArea = newAreas.length > 0 ? newAreas[0].slug : '';
    setFormData((prev) => ({
      ...prev,
      thanaSlug: thana,
      areaSlug: firstArea,
    }));
  };

  const handleImageFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const oversized = files.find((file) => file.size > 2 * 1024 * 1024);
    if (oversized) {
      setSubmitError('Each photo must be 2 MB or smaller.');
      e.target.value = '';
      return;
    }
    Promise.all(files.map((file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    }))).then((newUrls) => setImageUrls((prev) => [...prev, ...newUrls]))
      .catch(() => setSubmitError('Could not read the selected photos.'));
    e.target.value = '';
  };

  const handleRemoveImage = (index) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const err = {};
    if (!formData.titleBn.trim()) err.titleBn = 'বিজ্ঞাপনের বাংলা শিরোনাম আবশ্যক';
    if (!formData.monthlyRent || Number(formData.monthlyRent) <= 0)
      err.monthlyRent = 'সঠিক মাসিক ভাড়ার পরিমাণ দিন';
    if (!formData.addressBn.trim()) err.addressBn = 'বাসার পূর্ণ ঠিকানা দিন';
    if (!formData.landlordName.trim()) err.landlordName = 'আপনার নাম দিন';
    if (!formData.landlordPhone.trim()) err.landlordPhone = 'মোবাইল নম্বর দিন';
    if (!formData.acceptMale && !formData.acceptFemale)
      err.tenants = 'অন্তত পুরুষ অথবা নারী ব্যাচেলর যেকোনো একটি নির্বাচন করুন';

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    // Determine accepted tenants
    const acceptedTenants = [];
    if (formData.acceptMale && formData.acceptFemale) {
      acceptedTenants.push('all');
    } else if (formData.acceptMale) {
      acceptedTenants.push('male');
    } else if (formData.acceptFemale) {
      acceptedTenants.push('female');
    }

    const slug = `property-${Date.now()}`;

    const newProperty = {
      id: `prop-user-${Date.now()}`,
      slug,
      title: {
        bn: formData.titleBn,
        en: formData.titleEn || formData.titleBn,
      },
      districtSlug: formData.districtSlug,
      thanaSlug: formData.thanaSlug,
      areaSlug: formData.areaSlug,
      propertyType: formData.propertyType,
      monthlyRent: Number(formData.monthlyRent),
      advance: Number(formData.advance) || 0,
      status: 'available',
      acceptedTenants,
      rooms: Number(formData.rooms) || 1,
      baths: Number(formData.baths) || 1,
      floor: {
        bn: formData.floor,
        en: formData.floor,
      },
      furnished: formData.furnished,
      availableFrom: formData.availableFrom,
      images: imageUrls.length > 0 ? imageUrls : ['/src/assets/images/property_room_interior_1791874098305.jpg'],
      amenities: ['wifi', 'attached-bath', 'water-filter'],
      rules: {
        curfew: {
          bn: formData.curfewBn,
          en: formData.curfewBn,
        },
        cooking: {
          bn: formData.cookingBn,
          en: formData.cookingBn,
        },
        guests: {
          bn: formData.guestBn,
          en: formData.guestBn,
        },
        smoking: {
          bn: formData.smokingBn,
          en: formData.smokingBn,
        },
        customRules: formData.customRulesBn ? [{ bn: formData.customRulesBn, en: formData.customRulesBn }] : [],
      },
      utilities: {
        included: formData.electricityType.includes('অন্তর্ভুক্ত'),
        details: {
          bn: `বিদ্যুৎ: ${formData.electricityType}, গ্যাস: ${formData.gasType}`,
          en: `Electricity: ${formData.electricityType}, Gas: ${formData.gasType}`,
        },
        electricity: { bn: formData.electricityType, en: formData.electricityType },
        gas: { bn: formData.gasType, en: formData.gasType },
        serviceCharge: { bn: `৳ ${formData.serviceChargeAmt}`, en: `BDT ${formData.serviceChargeAmt}` },
      },
      address: {
        bn: formData.addressBn,
        en: formData.addressBn,
      },
      description: {
        bn: formData.descriptionBn || formData.titleBn,
        en: formData.descriptionBn || formData.titleBn,
      },
      landlordId: 'landlord-001',
    };

    newProperty.landlordName = formData.landlordName;
    newProperty.landlordPhone = formData.landlordPhone;
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const saved = await addProperty(newProperty);
      setSubmittedPropertySlug(saved.slug || slug);
    } catch (error) {
      setSubmitError(error.message || 'Could not submit your listing.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page Heading */}
      <div className="border-b border-stone-200 pb-5 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
          {t.addProperty.title}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-stone-500">
          {t.addProperty.subtitle}
        </p>

        {/* Demo disclaimer banner */}
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertCircle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <span>{t.addProperty.demoNotice}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {submitError && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{submitError}</p>}
        {/* SECTION 1: BASIC PROPERTY INFORMATION */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
          <h2 className="text-base font-bold text-stone-900 mb-5 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-emerald-800" />
            <span>{t.addProperty.section1}</span>
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t.addProperty.propertyTitle} *
              </label>
              <input
                type="text"
                value={formData.titleBn}
                onChange={(e) => handleInputChange('titleBn', e.target.value)}
                placeholder={t.addProperty.propertyTitlePlaceholder}
                className={`w-full rounded-lg border p-2.5 text-xs sm:text-sm text-stone-800 focus:outline-hidden ${
                  errors.titleBn ? 'border-red-500 bg-red-50/30' : 'border-stone-200 focus:border-emerald-700'
                }`}
              />
              {errors.titleBn && (
                <p className="mt-1 text-[11px] text-red-600">{errors.titleBn}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t.addProperty.description}
              </label>
              <textarea
                rows={3}
                value={formData.descriptionBn}
                onChange={(e) => handleInputChange('descriptionBn', e.target.value)}
                placeholder={t.addProperty.descriptionPlaceholder}
                className="w-full rounded-lg border border-stone-200 p-2.5 text-xs sm:text-sm text-stone-800 focus:border-emerald-700 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t.addProperty.district}
                </label>
                <select
                  value={formData.districtSlug}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                  className="w-full rounded-lg border border-stone-200 bg-white p-2.5 text-xs sm:text-sm text-stone-800 focus:border-emerald-700 focus:outline-hidden"
                >
                  {districts.map((d) => (
                    <option key={d.slug} value={d.slug}>
                      {d.name[lang] || d.name.bn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t.addProperty.thana}
                </label>
                <select
                  value={formData.thanaSlug}
                  onChange={(e) => handleThanaChange(e.target.value)}
                  className="w-full rounded-lg border border-stone-200 bg-white p-2.5 text-xs sm:text-sm text-stone-800 focus:border-emerald-700 focus:outline-hidden"
                >
                  {availableThanas.map((loc) => (
                    <option key={loc.thanaSlug} value={loc.thanaSlug}>
                      {loc.thanaName[lang] || loc.thanaName.bn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t.addProperty.area}
                </label>
                <select
                  value={formData.areaSlug}
                  onChange={(e) => handleInputChange('areaSlug', e.target.value)}
                  className="w-full rounded-lg border border-stone-200 bg-white p-2.5 text-xs sm:text-sm text-stone-800 focus:border-emerald-700 focus:outline-hidden"
                >
                  {availableAreas.map((ar) => (
                    <option key={ar.slug} value={ar.slug}>
                      {ar.name[lang] || ar.name.bn}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t.addProperty.address} *
              </label>
              <input
                type="text"
                value={formData.addressBn}
                onChange={(e) => handleInputChange('addressBn', e.target.value)}
                placeholder={t.addProperty.addressPlaceholder}
                className={`w-full rounded-lg border p-2.5 text-xs sm:text-sm text-stone-800 focus:outline-hidden ${
                  errors.addressBn ? 'border-red-500 bg-red-50/30' : 'border-stone-200 focus:border-emerald-700'
                }`}
              />
              {errors.addressBn && (
                <p className="mt-1 text-[11px] text-red-600">{errors.addressBn}</p>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 2: ROOMS & FEATURES */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
          <h2 className="text-base font-bold text-stone-900 mb-5 flex items-center gap-2">
            <FileText className="h-5 w-5 text-emerald-800" />
            <span>{t.addProperty.section2}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t.hero.selectType}
              </label>
              <select
                value={formData.propertyType}
                onChange={(e) => handleInputChange('propertyType', e.target.value)}
                className="w-full rounded-lg border border-stone-200 bg-white p-2.5 text-xs sm:text-sm text-stone-800 focus:border-emerald-700 focus:outline-hidden"
              >
                <option value="room">{t.propertyTypes.room}</option>
                <option value="full-flat">{t.propertyTypes['full-flat']}</option>
                <option value="shared-room">{t.propertyTypes['shared-room']}</option>
                <option value="seat">{t.propertyTypes.seat}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t.addProperty.rooms}
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={formData.rooms}
                onChange={(e) => handleInputChange('rooms', e.target.value)}
                className="w-full rounded-lg border border-stone-200 p-2.5 text-xs sm:text-sm text-stone-800 focus:border-emerald-700 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t.addProperty.baths}
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={formData.baths}
                onChange={(e) => handleInputChange('baths', e.target.value)}
                className="w-full rounded-lg border border-stone-200 p-2.5 text-xs sm:text-sm text-stone-800 focus:border-emerald-700 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t.addProperty.floor}
              </label>
              <input
                type="text"
                value={formData.floor}
                onChange={(e) => handleInputChange('floor', e.target.value)}
                placeholder={t.addProperty.floorPlaceholder}
                className="w-full rounded-lg border border-stone-200 p-2.5 text-xs sm:text-sm text-stone-800 focus:border-emerald-700 focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: BACHELOR RULES */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
          <h2 className="text-base font-bold text-stone-900 mb-5 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-800" />
            <span>{t.addProperty.section3}</span>
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-2">
                কাদের ভাড়া দেওয়া হবে? *
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-xs sm:text-sm text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.acceptMale}
                    onChange={(e) => handleInputChange('acceptMale', e.target.checked)}
                    className="rounded border-stone-300 text-emerald-800 focus:ring-emerald-700"
                  />
                  <span>{t.addProperty.maleAllowed}</span>
                </label>
                <label className="flex items-center gap-2 text-xs sm:text-sm text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.acceptFemale}
                    onChange={(e) => handleInputChange('acceptFemale', e.target.checked)}
                    className="rounded border-stone-300 text-emerald-800 focus:ring-emerald-700"
                  />
                  <span>{t.addProperty.femaleAllowed}</span>
                </label>
              </div>
              {errors.tenants && (
                <p className="mt-1 text-[11px] text-red-600">{errors.tenants}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t.addProperty.curfewTime}
                </label>
                <input
                  type="text"
                  value={formData.curfewBn}
                  onChange={(e) => handleInputChange('curfewBn', e.target.value)}
                  placeholder={t.addProperty.curfewPlaceholder}
                  className="w-full rounded-lg border border-stone-200 p-2.5 text-xs sm:text-sm text-stone-800 focus:border-emerald-700 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t.addProperty.cookingPolicy}
                </label>
                <input
                  type="text"
                  value={formData.cookingBn}
                  onChange={(e) => handleInputChange('cookingBn', e.target.value)}
                  className="w-full rounded-lg border border-stone-200 p-2.5 text-xs sm:text-sm text-stone-800 focus:border-emerald-700 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t.addProperty.guestPolicy}
                </label>
                <input
                  type="text"
                  value={formData.guestBn}
                  onChange={(e) => handleInputChange('guestBn', e.target.value)}
                  className="w-full rounded-lg border border-stone-200 p-2.5 text-xs sm:text-sm text-stone-800 focus:border-emerald-700 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t.addProperty.smokingPolicy}
                </label>
                <input
                  type="text"
                  value={formData.smokingBn}
                  onChange={(e) => handleInputChange('smokingBn', e.target.value)}
                  className="w-full rounded-lg border border-stone-200 p-2.5 text-xs sm:text-sm text-stone-800 focus:border-emerald-700 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t.addProperty.customRules}
              </label>
              <textarea
                rows={2}
                value={formData.customRulesBn}
                onChange={(e) => handleInputChange('customRulesBn', e.target.value)}
                placeholder={t.addProperty.customRulesPlaceholder}
                className="w-full rounded-lg border border-stone-200 p-2.5 text-xs sm:text-sm text-stone-800 focus:border-emerald-700 focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: FINANCIALS & RENT */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
          <h2 className="text-base font-bold text-stone-900 mb-5 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-800" />
            <span>{t.addProperty.section4}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t.addProperty.rent} *
              </label>
              <input
                type="number"
                value={formData.monthlyRent}
                onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                placeholder="যেমন: 6500"
                className={`w-full rounded-lg border p-2.5 text-xs sm:text-sm text-stone-800 focus:outline-hidden ${
                  errors.monthlyRent ? 'border-red-500 bg-red-50/30' : 'border-stone-200 focus:border-emerald-700'
                }`}
              />
              {errors.monthlyRent && (
                <p className="mt-1 text-[11px] text-red-600">{errors.monthlyRent}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t.addProperty.advance}
              </label>
              <input
                type="number"
                value={formData.advance}
                onChange={(e) => handleInputChange('advance', e.target.value)}
                placeholder="যেমন: 10000"
                className="w-full rounded-lg border border-stone-200 p-2.5 text-xs sm:text-sm text-stone-800 focus:border-emerald-700 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t.addProperty.availableDate}
              </label>
              <input
                type="date"
                value={formData.availableFrom}
                onChange={(e) => handleInputChange('availableFrom', e.target.value)}
                className="w-full rounded-lg border border-stone-200 p-2.5 text-xs sm:text-sm text-stone-800 focus:border-emerald-700 focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* SECTION 5: PHOTOS */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
          <h2 className="text-base font-bold text-stone-900 mb-5 flex items-center gap-2">
            <Image className="h-5 w-5 text-emerald-800" />
            <span>{t.addProperty.section5}</span>
          </h2>

          <p className="text-xs text-stone-500 mb-4">
            {t.addProperty.uploadNotice}
          </p>

          {/* Upload input button */}
          <div className="mb-4">
            <label className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-stone-50 px-4 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 cursor-pointer transition-colors">
              <Upload className="h-4 w-4 text-emerald-700" />
              <span>{t.addProperty.choosePhotos}</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Image Previews */}
          {imageUrls.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {imageUrls.map((url, idx) => (
                <div
                  key={idx}
                  className="relative aspect-4/3 rounded-lg overflow-hidden border border-stone-200 group"
                >
                  <img
                    src={url}
                    alt={`Uploaded preview ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white shadow-xs hover:bg-red-700"
                    title="ছবি মুছুন"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 6: LANDLORD CONTACT */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
          <h2 className="text-base font-bold text-stone-900 mb-5 flex items-center gap-2">
            <User className="h-5 w-5 text-emerald-800" />
            <span>{t.addProperty.section6}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t.addProperty.landlordName} *
              </label>
              <input
                type="text"
                value={formData.landlordName}
                onChange={(e) => handleInputChange('landlordName', e.target.value)}
                placeholder="যেমন: ইঞ্জি. মো. শফিকুল ইসলাম"
                className={`w-full rounded-lg border p-2.5 text-xs sm:text-sm text-stone-800 focus:outline-hidden ${
                  errors.landlordName ? 'border-red-500 bg-red-50/30' : 'border-stone-200 focus:border-emerald-700'
                }`}
              />
              {errors.landlordName && (
                <p className="mt-1 text-[11px] text-red-600">{errors.landlordName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {t.addProperty.landlordPhone} *
              </label>
              <input
                type="text"
                value={formData.landlordPhone}
                onChange={(e) => handleInputChange('landlordPhone', e.target.value)}
                placeholder="যেমন: 017XXXXXXXX"
                className={`w-full rounded-lg border p-2.5 text-xs sm:text-sm text-stone-800 focus:outline-hidden ${
                  errors.landlordPhone ? 'border-red-500 bg-red-50/30' : 'border-stone-200 focus:border-emerald-700'
                }`}
              />
              {errors.landlordPhone && (
                <p className="mt-1 text-[11px] text-red-600">{errors.landlordPhone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Link
            to="/landlord/dashboard"
            className="rounded-xl border border-stone-200 bg-white px-5 py-3 text-xs sm:text-sm font-semibold text-stone-700 hover:bg-stone-50"
          >
            {lang === 'bn' ? 'বাতিল' : 'Cancel'}
          </Link>

          <button
            type="submit"
            className="rounded-xl bg-emerald-800 px-7 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-emerald-900 active:scale-98 transition-all"
          >
            {isSubmitting ? 'Submitting for review…' : t.addProperty.submitBtn}
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {submittedPropertySlug && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-stone-200 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 mb-4">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <h3 className="text-lg font-bold text-stone-900">
              {t.addProperty.successTitle}
            </h3>

            <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">Your post is saved and waiting for admin review. It will appear publicly after approval. You can follow its status in your dashboard.</p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/landlord/dashboard"
                className="w-full sm:w-auto rounded-lg border border-stone-200 bg-stone-50 px-5 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-100"
              >
                {t.addProperty.goToDashboard}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
