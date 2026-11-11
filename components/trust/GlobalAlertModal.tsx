'use client';

import { useModalState } from '@/lib/modal-context';
import { useSiteSettings } from '@/lib/site-settings';

export default function GlobalAlertModal() {
  const { alertDetails, closeAlert } = useModalState();
  const { language } = useSiteSettings();
  const isBn = language === 'bn';

  if (!alertDetails) return null;

  const type = alertDetails.type || 'info';

  const icons = {
    success: 'check_circle',
    warning: 'warning',
    error: 'error',
    info: 'notifications',
  };

  const bgColors = {
    success: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-100 text-amber-900 border-amber-200',
    error: 'bg-red-100 text-red-800 border-red-200',
    info: 'bg-teal-100 text-teal-900 border-teal-200',
  };

  const buttonColors = {
    success: 'bg-emerald-800 hover:bg-emerald-900 text-white',
    warning: 'bg-amber-600 hover:bg-amber-700 text-white',
    error: 'bg-red-600 hover:bg-red-700 text-white',
    info: 'bg-emerald-800 hover:bg-emerald-900 text-white',
  };

  return (
    <div
      data-l10n="off"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn"
      onClick={closeAlert}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 p-6 text-center transform transition-all animate-scaleUp"
        onClick={e => e.stopPropagation()}
      >
        <div
          className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center border shadow-xs mb-4 ${bgColors[type]}`}
        >
          <span className="material-symbols-outlined text-[32px]">
            {icons[type]}
          </span>
        </div>

        {alertDetails.title && (
          <h3 className="text-lg font-bold text-slate-900 font-serif-heading mb-2">
            {alertDetails.title}
          </h3>
        )}

        <p className="text-sm text-slate-700 leading-relaxed font-medium">
          {alertDetails.message}
        </p>

        <div className="mt-6">
          <button
            type="button"
            onClick={closeAlert}
            className={`w-full py-3 px-5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${buttonColors[type]}`}
          >
            {alertDetails.confirmText || (isBn ? 'ঠিক আছে' : 'OK')}
          </button>
        </div>
      </div>
    </div>
  );
}
