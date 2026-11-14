'use client';

import React, { useState, useRef } from 'react';
import { useSiteSettings } from '@/lib/site-settings';
import { useSiteCMS, SitePageKey, DEFAULT_CMS_CONTENT_EN } from '@/lib/site-cms';
import { PAGE_SECTIONS_SCHEMA, PageConfig, PageSection, SectionField, useCustomSections, CustomSection } from '@/lib/page-sections';
import ImageSelectorField from './ImageSelectorField';

// =========================================================
// FIELD RENDERER — renders a single editable field (Bilingual)
// =========================================================
function FieldRenderer({
  field,
  editorLang,
  valueBn,
  valueEn,
  placeholderEn,
  onChangeBn,
  onChangeEn,
}: {
  field: SectionField;
  editorLang: 'bn' | 'en' | 'both';
  valueBn: string;
  valueEn: string;
  placeholderEn?: string;
  onChangeBn: (val: string) => void;
  onChangeEn: (val: string) => void;
}) {
  const baseInput = 'w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition-colors';
  const enInput = 'w-full px-3 py-2 bg-white border border-purple-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-600/30 focus:border-purple-500 transition-colors';

  if (field.type === 'image') {
    return (
      <ImageSelectorField
        label={editorLang === 'en' ? (field.labelEn || field.label) : field.label}
        value={valueBn}
        onChange={val => {
          onChangeBn(val);
          onChangeEn(val);
        }}
        helpText={field.helpText}
      />
    );
  }

  if (field.type === 'url') {
    if (editorLang === 'bn') {
      return (
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center justify-between">
            <span>{field.label}</span>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.2 rounded border border-emerald-200">🇧🇩 BN</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[16px]">link</span>
            <input
              type="url"
              className={baseInput + ' pl-8'}
              placeholder={field.placeholder || 'https://...'}
              value={valueBn}
              onChange={e => onChangeBn(e.target.value)}
            />
          </div>
        </div>
      );
    }
    if (editorLang === 'en') {
      return (
        <div>
          <label className="text-xs font-bold text-purple-900 block mb-1 flex items-center justify-between">
            <span>{field.labelEn || field.label} [English URL]</span>
            <span className="text-[10px] bg-purple-50 text-purple-700 font-bold px-1.5 py-0.2 rounded border border-purple-200">🇬🇧 EN</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[16px]">link</span>
            <input
              type="url"
              className={enInput + ' pl-8'}
              placeholder={field.placeholderEn || field.placeholder || 'https://...'}
              value={valueEn || valueBn}
              onChange={e => onChangeEn(e.target.value)}
            />
          </div>
        </div>
      );
    }
    // both
    return (
      <div className="space-y-2 bg-slate-50/70 p-3 rounded-xl border border-slate-200/80">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center justify-between">
            <span>{field.label} (বাংলা)</span>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.2 rounded border border-emerald-200">🇧🇩 BN</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[16px]">link</span>
            <input
              type="url"
              className={baseInput + ' pl-8'}
              placeholder={field.placeholder || 'https://...'}
              value={valueBn}
              onChange={e => onChangeBn(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-purple-900 block mb-1 flex items-center justify-between">
            <span>{field.labelEn || field.label} (English URL)</span>
            <span className="text-[10px] bg-purple-50 text-purple-700 font-bold px-1.5 py-0.2 rounded border border-purple-200">🇬🇧 EN</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[16px]">link</span>
            <input
              type="url"
              className={enInput + ' pl-8'}
              placeholder={field.placeholderEn || field.placeholder || 'https://...'}
              value={valueEn || valueBn}
              onChange={e => onChangeEn(e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  }

  if (field.type === 'textarea') {
    if (editorLang === 'bn') {
      return (
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center justify-between">
            <span>{field.label}</span>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.2 rounded border border-emerald-200">🇧🇩 BN</span>
          </label>
          {field.helpText && <p className="text-[11px] text-slate-400 mb-1">{field.helpText}</p>}
          <textarea
            rows={field.rows || 2}
            className={baseInput}
            placeholder={field.placeholder}
            value={valueBn}
            onChange={e => onChangeBn(e.target.value)}
          />
        </div>
      );
    }
    if (editorLang === 'en') {
      return (
        <div>
          <label className="text-xs font-bold text-purple-900 block mb-1 flex items-center justify-between">
            <span>{field.labelEn || field.label} (English Description)</span>
            <span className="text-[10px] bg-purple-50 text-purple-700 font-bold px-1.5 py-0.2 rounded border border-purple-200">🇬🇧 EN</span>
          </label>
          <textarea
            rows={field.rows || 2}
            className={enInput}
            placeholder={field.placeholderEn || placeholderEn || 'Enter English description...'}
            value={valueEn}
            onChange={e => onChangeEn(e.target.value)}
          />
        </div>
      );
    }
    // both
    return (
      <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200 space-y-3">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center justify-between">
            <span>{field.label} (বাংলা)</span>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.2 rounded border border-emerald-200">🇧🇩 BN</span>
          </label>
          <textarea
            rows={field.rows || 2}
            className={baseInput}
            placeholder={field.placeholder}
            value={valueBn}
            onChange={e => onChangeBn(e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs font-bold text-purple-900 block mb-1 flex items-center justify-between">
            <span>{field.labelEn || field.label} (English)</span>
            <span className="text-[10px] bg-purple-50 text-purple-700 font-bold px-1.5 py-0.2 rounded border border-purple-200">🇬🇧 EN</span>
          </label>
          <textarea
            rows={field.rows || 2}
            className={enInput}
            placeholder={field.placeholderEn || placeholderEn || 'Enter English description...'}
            value={valueEn}
            onChange={e => onChangeEn(e.target.value)}
          />
        </div>
      </div>
    );
  }

  // Default: text / number
  if (editorLang === 'bn') {
    return (
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center justify-between">
          <span>{field.label}</span>
          <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.2 rounded border border-emerald-200">🇧🇩 BN</span>
        </label>
        {field.helpText && <p className="text-[11px] text-slate-400 mb-1">{field.helpText}</p>}
        <input
          type={field.type === 'number' ? 'number' : 'text'}
          className={baseInput}
          placeholder={field.placeholder}
          value={valueBn}
          onChange={e => onChangeBn(e.target.value)}
        />
      </div>
    );
  }

  if (editorLang === 'en') {
    return (
      <div>
        <label className="text-xs font-bold text-purple-900 block mb-1 flex items-center justify-between">
          <span>{field.labelEn || field.label} [English]</span>
          <span className="text-[10px] bg-purple-50 text-purple-700 font-bold px-1.5 py-0.2 rounded border border-purple-200">🇬🇧 EN</span>
        </label>
        <input
          type={field.type === 'number' ? 'number' : 'text'}
          className={enInput}
          placeholder={field.placeholderEn || placeholderEn || 'Enter English text...'}
          value={valueEn}
          onChange={e => onChangeEn(e.target.value)}
        />
      </div>
    );
  }

  // both
  return (
    <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200 space-y-2.5">
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center justify-between">
          <span>{field.label} (বাংলা)</span>
          <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.2 rounded border border-emerald-200">🇧🇩 BN</span>
        </label>
        <input
          type={field.type === 'number' ? 'number' : 'text'}
          className={baseInput}
          placeholder={field.placeholder}
          value={valueBn}
          onChange={e => onChangeBn(e.target.value)}
        />
      </div>
      <div>
        <label className="text-xs font-bold text-purple-900 block mb-1 flex items-center justify-between">
          <span>{field.labelEn || field.label} (English)</span>
          <span className="text-[10px] bg-purple-50 text-purple-700 font-bold px-1.5 py-0.2 rounded border border-purple-200">🇬🇧 EN</span>
        </label>
        <input
          type={field.type === 'number' ? 'number' : 'text'}
          className={enInput}
          placeholder={field.placeholderEn || placeholderEn || 'Enter English text...'}
          value={valueEn}
          onChange={e => onChangeEn(e.target.value)}
        />
      </div>
    </div>
  );
}

// =========================================================
// SECTION ACCORDION — a single collapsible section card
// =========================================================
function SectionAccordion({
  section,
  pageData,
  selectedPageKey,
  editorLang,
  onFieldChange,
  onToggleVisibility,
  onDelete,
  isCustom = false,
  customData,
  onCustomFieldChange,
}: {
  section: PageSection | CustomSection;
  pageData: Record<string, string>;
  selectedPageKey: string;
  editorLang: 'bn' | 'en' | 'both';
  onFieldChange: (key: string, val: string) => void;
  onToggleVisibility: () => void;
  onDelete?: () => void;
  isCustom?: boolean;
  customData?: Record<string, string>;
  onCustomFieldChange?: (key: string, val: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isVisible = section.isVisible !== false;

  const data = isCustom ? (customData || {}) : pageData;
  const handleChange = isCustom ? (onCustomFieldChange || (() => {})) : onFieldChange;
  const enDefaults = (DEFAULT_CMS_CONTENT_EN as any)[selectedPageKey] || {};

  return (
    <div className={`rounded-2xl border transition-all overflow-hidden ${
      isVisible
        ? 'border-slate-200 bg-white shadow-xs'
        : 'border-slate-100 bg-slate-50/60 opacity-60'
    }`}>
      {/* Section Header */}
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Drag Handle (visual only) */}
        <span className="material-symbols-outlined text-slate-300 text-[18px] cursor-grab shrink-0">drag_indicator</span>

        {/* Section Icon */}
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
          isOpen ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-500'
        }`}>
          <span className="material-symbols-outlined text-[16px]">{section.icon}</span>
        </div>

        {/* Section Label */}
        <button
          type="button"
          className="flex-1 text-left min-w-0 cursor-pointer"
          onClick={() => setIsOpen(o => !o)}
        >
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-slate-800 truncate">
              {editorLang === 'en' ? (section.labelEn || section.label) : section.label}
            </p>
            {editorLang === 'both' && section.labelEn && (
              <span className="text-[11px] text-purple-700 font-medium">({section.labelEn})</span>
            )}
          </div>
          <p className="text-[11px] text-slate-400">
            {section.fields.length} {editorLang === 'en' ? 'Fields (Bilingual)' : 'টি ফিল্ড (বাংলা ও English)'}
          </p>
        </button>

        {/* Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Visibility Toggle */}
          <button
            type="button"
            onClick={onToggleVisibility}
            title={isVisible ? (editorLang === 'en' ? 'Hide this section' : 'এই সেকশনটি লুকান') : (editorLang === 'en' ? 'Show this section' : 'এই সেকশনটি দেখান')}
            className={`p-1.5 rounded-lg transition-colors ${
              isVisible
                ? 'text-emerald-600 hover:bg-emerald-50'
                : 'text-slate-400 hover:bg-slate-100'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{isVisible ? 'visibility' : 'visibility_off'}</span>
          </button>

          {/* Delete (non-core sections only) */}
          {(isCustom || (!('isCore' in section) || !section.isCore)) && onDelete && (
            <button
              type="button"
              onClick={onDelete}
              title={editorLang === 'en' ? "Delete this section" : "এই সেকশনটি মুছুন"}
              className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">delete</span>
            </button>
          )}

          {/* Core Badge */}
          {'isCore' in section && section.isCore && !isCustom && (
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-bold">CORE</span>
          )}
          {isCustom && (
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-700 font-bold">CUSTOM</span>
          )}

          {/* Expand/Collapse */}
          <button
            type="button"
            onClick={() => setIsOpen(o => !o)}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <span className={`material-symbols-outlined text-[18px] transition-transform ${isOpen ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </button>
        </div>
      </div>

      {/* Section Fields (Collapsible) */}
      {isOpen && (
        <div className="px-4 pb-4 pt-2 border-t border-slate-100 space-y-3.5 bg-slate-50/40">
          {section.fields.map(field => {
            const valBn = data[field.key] || '';
            const valEn = data[`${field.key}En`] !== undefined ? data[`${field.key}En`] : (enDefaults[field.key] || '');
            const placeholderEn = enDefaults[field.key] || '';

            return (
              <FieldRenderer
                key={field.key}
                field={field}
                editorLang={editorLang}
                valueBn={valBn}
                valueEn={valEn}
                placeholderEn={placeholderEn}
                onChangeBn={val => handleChange(field.key, val)}
                onChangeEn={val => handleChange(`${field.key}En`, val)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

// =========================================================
// ADD CUSTOM SECTION MODAL
// =========================================================
function AddCustomSectionModal({
  pageKey,
  onClose,
  onAdd,
}: {
  pageKey: string;
  onClose: () => void;
  onAdd: (section: Omit<CustomSection, 'id'>) => void;
}) {
  const [label, setLabel] = useState('');
  const [icon, setIcon] = useState('add_box');
  const [fieldCount, setFieldCount] = useState(1);
  const [fields, setFields] = useState<Array<{ key: string; label: string; type: SectionField['type'] }>>([
    { key: 'customField1', label: '', type: 'text' },
  ]);

  const ICON_PRESETS = [
    'add_box', 'announcement', 'article', 'campaign', 'diversity_3',
    'emoji_people', 'event', 'favorite', 'help', 'history_edu',
    'hub', 'info', 'list_alt', 'local_activity', 'newspaper',
    'notifications', 'policy', 'quiz', 'receipt_long', 'sell',
    'settings', 'star', 'support', 'timeline', 'workspace_premium',
  ];

  const updateField = (idx: number, key: string, val: string) => {
    setFields(prev => prev.map((f, i) => i === idx ? { ...f, [key]: val } : f));
  };

  const addField = () => {
    const nextIdx = fields.length + 1;
    setFields(prev => [...prev, { key: `customField${nextIdx}`, label: '', type: 'text' }]);
  };

  const removeField = (idx: number) => {
    setFields(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = () => {
    if (!label.trim()) return;
    const validFields: SectionField[] = fields
      .filter(f => f.label.trim())
      .map(f => ({
        key: f.key || `field_${Date.now()}`,
        label: f.label,
        type: f.type,
      }));
    if (validFields.length === 0) return;

    onAdd({
      pageKey,
      label: label.trim(),
      icon,
      fields: validFields,
      data: {},
      isVisible: true,
      order: 999,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90dvh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div>
            <h4 className="text-base font-bold text-slate-900">নতুন কাস্টম সেকশন যোগ করুন</h4>
            <p className="text-xs text-slate-500 mt-0.5">আপনার নিজের সেকশন তৈরি করুন যেকোনো পেজে</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          {/* Section Name */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">সেকশন নাম / লেবেল *</label>
            <input
              type="text"
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30"
              placeholder="যেমন: বিশেষ ঘোষণা সেকশন"
              value={label}
              onChange={e => setLabel(e.target.value)}
            />
          </div>

          {/* Icon Picker */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">আইকন নির্বাচন করুন</label>
            <div className="grid grid-cols-10 gap-1.5">
              {ICON_PRESETS.map(ic => (
                <button
                  key={ic}
                  type="button"
                  onClick={() => setIcon(ic)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    icon === ic
                      ? 'bg-purple-700 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  title={ic}
                >
                  <span className="material-symbols-outlined text-[16px]">{ic}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Fields */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700">ফিল্ড যোগ করুন *</label>
              <button
                type="button"
                onClick={addField}
                className="text-xs text-purple-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">add</span>
                আরো ফিল্ড যোগ করুন
              </button>
            </div>

            <div className="space-y-2.5">
              {fields.map((f, idx) => (
                <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-500 w-14 shrink-0">ফিল্ড {idx + 1}</span>
                    <input
                      type="text"
                      className="flex-1 px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs bg-white"
                      placeholder="ফিল্ড লেবেল"
                      value={f.label}
                      onChange={e => updateField(idx, 'label', e.target.value)}
                    />
                    <select
                      className="px-2 py-1.5 border border-slate-200 rounded-lg text-xs bg-white cursor-pointer"
                      value={f.type}
                      onChange={e => updateField(idx, 'type', e.target.value)}
                    >
                      <option value="text">টেক্সট</option>
                      <option value="textarea">বড় টেক্সট</option>
                      <option value="image">ছবি</option>
                      <option value="url">URL লিংক</option>
                      <option value="number">নম্বর</option>
                    </select>
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeField(idx)}
                        className="text-rose-500 hover:text-rose-700 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer">
            বাতিল
          </button>
          <button
            onClick={handleSubmit}
            disabled={!label.trim() || fields.every(f => !f.label.trim())}
            className="px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-sm font-bold transition-colors cursor-pointer disabled:opacity-50"
          >
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">add</span>
              সেকশন যোগ করুন
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// =========================================================
// MAIN COMPONENT: AdminSectionEditor
// =========================================================
export default function AdminSectionEditor() {
  const { language } = useSiteSettings();
  const isBn = language === 'bn';
  const { cms, updatePageContent, isSaving } = useSiteCMS();
  const { getPageCustomSections, addCustomSection, updateCustomSection, deleteCustomSection } = useCustomSections();

  const [selectedPageKey, setSelectedPageKey] = useState<string>('home');
  const [editorLang, setEditorLang] = useState<'bn' | 'en' | 'both'>('bn');
  const [localData, setLocalData] = useState<Record<string, string>>({});
  const [sectionVisibility, setSectionVisibility] = useState<Record<string, boolean>>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [saveToast, setSaveToast] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  // Load local data when page changes
  const handleSelectPage = (pageKey: string) => {
    setSelectedPageKey(pageKey);
    const pageConfig = PAGE_SECTIONS_SCHEMA.find(p => p.pageKey === pageKey);
    if (pageConfig) {
      const cmsPage = (cms as any)[pageKey] || {};
      setLocalData({ ...cmsPage });
    }
  };

  // Initialize with home page data
  React.useEffect(() => {
    const cmsPage = (cms as any)['home'] || {};
    setLocalData({ ...cmsPage });
  }, []);

  const handleFieldChange = (key: string, val: string) => {
    setLocalData(prev => ({ ...prev, [key]: val }));
  };

  const handleSave = () => {
    updatePageContent(selectedPageKey as SitePageKey, localData);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleToggleSectionVisibility = (sectionId: string, currentVal: boolean) => {
    setSectionVisibility(prev => ({ ...prev, [sectionId]: !currentVal }));
  };

  const selectedPageConfig = PAGE_SECTIONS_SCHEMA.find(p => p.pageKey === selectedPageKey);
  const pageCustomSections = getPageCustomSections(selectedPageKey);

  // Sorted sections from schema
  const coreSections = selectedPageConfig?.sections.slice().sort((a, b) => a.order - b.order) || [];

  return (
    <div className="p-3 sm:p-5 bg-slate-50/70 flex-1 min-h-0">

      {/* Top Header */}
      <div className="bg-white rounded-xl p-3 sm:p-4 border border-slate-200 shadow-2xs mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-medium border border-purple-200 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse"></span>
              <span>{isBn ? 'WordPress-স্টাইল পেজ বাই পেজ সেকশন এডিটর' : 'WordPress-Style Section by Section Editor'}</span>
            </div>
            <h3 style={{ fontSize: '13px' }} className="font-semibold text-slate-800 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-purple-700 text-[16px]">web</span>
              <span>{isBn ? 'পেজ সেকশন কন্ট্রোল প্যানেল' : 'Page Section Control Panel'}</span>
            </h3>
            <p style={{ fontSize: '11px' }} className="text-slate-400 mt-0.5">
              {isBn ? 'প্রতিটি পেজের প্রতিটি সেকশন দেখুন, এডিট করুন, লুকান বা নতুন কাস্টম সেকশন যোগ করুন।' : 'View, edit, toggle visibility, or add custom sections for each page.'}
            </p>
          </div>

          {/* Save Toast & Button */}
          <div className="flex items-center gap-3 shrink-0">
            {saveToast && (
              <div className="px-3.5 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 shadow-xs animate-in fade-in">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                {isBn ? 'লাইভ আপডেট হয়েছে!' : 'Live updated!'}
              </div>
            )}
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white rounded-xl text-sm font-bold shadow-md shadow-purple-900/20 flex items-center gap-2 cursor-pointer transition-all active:scale-95 disabled:opacity-60"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              <span>{isSaving ? (isBn ? 'সংরক্ষণ হচ্ছে...' : 'Saving...') : (isBn ? 'পরিবর্তন সংরক্ষণ করুন' : 'Save Changes')}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* ===== LEFT: Page Selector ===== */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/60">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{isBn ? 'পেজ বাই পেজ এডিটর' : 'PAGE BY PAGE EDITOR'}</p>
          </div>

          <nav className="p-2 space-y-1">
            {PAGE_SECTIONS_SCHEMA.map(page => {
              const isSelected = selectedPageKey === page.pageKey;
              const totalSections = page.sections.length + getPageCustomSections(page.pageKey).length;
              return (
                <button
                  key={page.pageKey}
                  type="button"
                  onClick={() => handleSelectPage(page.pageKey)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-purple-700 text-white shadow-sm ring-2 ring-purple-400/30'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <span className="material-symbols-outlined text-[18px]">{page.pageIcon}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold truncate leading-tight">{isBn ? page.pageTitle : (page.pageTitleEn || page.pageTitle)}</p>
                    <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-purple-200' : 'text-slate-400'}`}>
                      {totalSections} {isBn ? 'সেকশন' : 'Sections'}
                    </p>
                  </div>
                  {isSelected && (
                    <span className="material-symbols-outlined text-[16px] shrink-0">chevron_right</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* ===== RIGHT: Section Editor ===== */}
        <div className="lg:col-span-9 space-y-4">

          {/* Page Toolbar */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">{selectedPageConfig?.pageIcon}</span>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{isBn ? selectedPageConfig?.pageTitle : (selectedPageConfig?.pageTitleEn || selectedPageConfig?.pageTitle)}</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] text-slate-500">
                    {coreSections.length} {isBn ? 'কোর' : 'Core'} + {pageCustomSections.length} {isBn ? 'কাস্টম সেকশন' : 'Custom Sections'}
                  </span>
                  <a
                    href={selectedPageConfig?.pageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-purple-700 hover:underline flex items-center gap-0.5"
                  >
                    <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                    {isBn ? 'পেজ দেখুন' : 'View Page'}
                  </a>
                </div>
              </div>
            </div>

            {/* Add Custom Section Button */}
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed border-purple-300 text-purple-700 text-sm font-bold hover:bg-purple-50 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              {isBn ? 'নতুন সেকশন যোগ করুন' : 'Add New Section'}
            </button>
          </div>

          {/* Bilingual Language Control for Section Editor */}
          <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-emerald-50 rounded-2xl border border-purple-200/80 p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-purple-700 text-[20px]">translate</span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                  {isBn ? 'সেকশন কন্টেন্ট এডিটর ভাষা (Content Language)' : 'Section Content Editor Language'}
                </h4>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {isBn ? 'ইংরেজি বা বাংলা উভয় ভাষার কন্টেন্ট সরাসরি এডিট ও আপডেট করুন।' : 'Directly edit and update content for both Bengali and English.'}
              </p>
            </div>

            <div className="inline-flex items-center p-1 rounded-xl bg-white border border-slate-200 shadow-2xs self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setEditorLang('bn')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  editorLang === 'bn'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>🇧🇩 বাংলা</span>
              </button>
              <button
                type="button"
                onClick={() => setEditorLang('en')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  editorLang === 'en'
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>🇬🇧 English</span>
              </button>
              <button
                type="button"
                onClick={() => setEditorLang('both')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  editorLang === 'both'
                    ? 'bg-indigo-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>🌐 উভয় ভাষা (Dual View)</span>
              </button>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-[11px] text-slate-500 px-1">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-emerald-600">visibility</span>
              = {isBn ? 'সেকশন দৃশ্যমান' : 'Section Visible'}
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-slate-400">visibility_off</span>
              = {isBn ? 'সেকশন লুকানো' : 'Section Hidden'}
            </span>
            <span className="flex items-center gap-1">
              <span className="text-[9px] px-1 rounded bg-slate-100 font-bold text-slate-500">CORE</span>
              = {isBn ? 'ডিলেট করা যাবে না' : 'Cannot Delete'}
            </span>
            <span className="flex items-center gap-1">
              <span className="text-[9px] px-1 rounded bg-purple-100 font-bold text-purple-700">CUSTOM</span>
              = {isBn ? 'আপনার নিজস্ব' : 'Custom Added'}
            </span>
          </div>

          {/* Core Sections List */}
          {coreSections.map(section => {
            const visibility = sectionVisibility[section.id] ?? (section.isVisible !== false);
            return (
              <SectionAccordion
                key={section.id}
                section={{ ...section, isVisible: visibility }}
                pageData={localData}
                selectedPageKey={selectedPageKey}
                editorLang={editorLang}
                onFieldChange={handleFieldChange}
                onToggleVisibility={() => handleToggleSectionVisibility(section.id, visibility)}
              />
            );
          })}

          {/* Custom Sections List */}
          {pageCustomSections.length > 0 && (
            <>
              <div className="flex items-center gap-2 pt-2">
                <div className="h-px flex-1 bg-slate-200"></div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{isBn ? 'কাস্টম সেকশনসমূহ' : 'Custom Sections'}</span>
                <div className="h-px flex-1 bg-slate-200"></div>
              </div>

              {pageCustomSections.map(cs => (
                <SectionAccordion
                  key={cs.id}
                  section={cs}
                  pageData={{}}
                  selectedPageKey={selectedPageKey}
                  editorLang={editorLang}
                  onFieldChange={() => {}}
                  isCustom
                  customData={cs.data}
                  onCustomFieldChange={(key, val) =>
                    updateCustomSection(cs.id, { data: { ...cs.data, [key]: val } })
                  }
                  onToggleVisibility={() =>
                    updateCustomSection(cs.id, { isVisible: !cs.isVisible })
                  }
                  onDelete={() => setPendingDeleteId(cs.id)}
                />
              ))}
            </>
          )}

          {/* Empty State */}
          {coreSections.length === 0 && pageCustomSections.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <span className="material-symbols-outlined text-5xl text-slate-200 block mb-3">web_stories</span>
              <p className="text-slate-500 font-medium">{isBn ? 'এই পেজে এখনো কোনো সেকশন নেই' : 'No sections on this page yet'}</p>
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="mt-4 px-4 py-2 bg-purple-700 text-white rounded-xl text-sm font-bold cursor-pointer hover:bg-purple-800"
              >
                {isBn ? 'প্রথম সেকশন যোগ করুন' : 'Add First Section'}
              </button>
            </div>
          )}

          {/* Bottom Save Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              {isBn ? 'পরিবর্তন সংরক্ষণ করলে সাথে সাথে মূল ওয়েবসাইটে প্রতিফলিত হবে।' : 'Saving changes immediately reflects on live website.'}
            </span>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white rounded-xl text-sm font-bold shadow-md shadow-purple-900/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-60"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              <span>{isSaving ? (isBn ? 'সংরক্ষণ হচ্ছে...' : 'Saving...') : (isBn ? 'পরিবর্তন সংরক্ষণ করুন' : 'Save Changes')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add Custom Section Modal */}
      {showAddModal && (
        <AddCustomSectionModal
          pageKey={selectedPageKey}
          onClose={() => setShowAddModal(false)}
          onAdd={section => {
            addCustomSection(section);
            setSaveToast(true);
            setTimeout(() => setSaveToast(false), 2000);
          }}
        />
      )}

      {/* Delete Confirm Modal */}
      {pendingDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <span className="material-symbols-outlined">warning</span>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{isBn ? 'সেকশন মুছে ফেলবেন?' : 'Delete Section?'}</h4>
                <p className="text-xs text-slate-500">{isBn ? 'এই কাজ আর ফেরানো যাবে না।' : 'This action cannot be undone.'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setPendingDeleteId(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                {isBn ? 'বাতিল' : 'Cancel'}
              </button>
              <button
                onClick={() => {
                  deleteCustomSection(pendingDeleteId);
                  setPendingDeleteId(null);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold cursor-pointer"
              >
                {isBn ? 'হ্যাঁ, মুছে দিন' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
