'use client';

import { useState } from 'react';
import { useModalState } from '@/lib/modal-context';

type PaymentMethodType = 'bkash' | 'nagad' | 'rocket' | 'upay' | 'card' | 'bank';

export default function EpsPaymentModal() {
  const { isOpen, closePaymentModal, paymentDetails } = useModalState();
  
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('bkash');
  const [step, setStep] = useState<'select' | 'input' | 'otp' | 'success'>('select');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [pin, setPin] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [trxId, setTrxId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const amountDisplay = `${paymentDetails.currency === 'BDT' ? '৳' : '$'}${paymentDetails.amount.toLocaleString()}`;

  const handleStartPayment = (method: PaymentMethodType) => {
    setSelectedMethod(method);
    setStep('input');
  };

  const handleProceedToOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('otp');
    }, 700);
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const generatedTrx = 'EPS' + Math.floor(100000000 + Math.random() * 900000000);
      setTrxId(generatedTrx);
      setStep('success');

      // Save dummy donation to localStorage for the Admin Dashboard to read
      try {
        const existing = JSON.parse(localStorage.getItem('gmcf:donations') || '[]');
        const newDonation = {
          id: generatedTrx,
          donorName: paymentDetails.donorName || 'Anonymous Donor',
          donorPhone: phoneNumber || '01913119525',
          donorEmail: paymentDetails.donorEmail || 'donor@gmcf.org',
          amount: paymentDetails.amount,
          currency: paymentDetails.currency,
          cause: paymentDetails.cause || 'Emergency Food & Water Relief',
          method: selectedMethod.toUpperCase(),
          status: 'SUCCESS',
          date: new Date().toISOString().replace('T', ' ').substring(0, 19),
          gateway: 'EPS Easy Payment System',
        };
        localStorage.setItem('gmcf:donations', JSON.stringify([newDonation, ...existing]));
      } catch (err) {
        console.error('Error saving donation', err);
      }
    }, 1200);
  };

  const handleResetAndClose = () => {
    setStep('select');
    setPhoneNumber('');
    setOtp('');
    setPin('');
    setCardNumber('');
    closePaymentModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 transform transition-all duration-300"
        onClick={e => e.stopPropagation()}
      >
        {/* EPS Official Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 text-white p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                <span className="material-symbols-outlined text-[24px] text-amber-400">
                  verified_user
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold tracking-wider text-base sm:text-lg text-white font-mono">
                    EPS
                  </span>
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/30 px-1.5 py-0.5 rounded font-medium">
                    Easy Payment System
                  </span>
                </div>
                <p className="text-[11px] text-emerald-200/90 font-light">
                  Bangladesh Bank Licensed PSP Payment Gateway
                </p>
              </div>
            </div>
            <button
              onClick={handleResetAndClose}
              className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* Amount Badge */}
          <div className="mt-4 pt-3 border-t border-emerald-700/60 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-emerald-200 uppercase tracking-wider block font-medium">
                Donation Amount
              </span>
              <span className="text-2xl font-black text-amber-300 tracking-tight">
                {amountDisplay}
              </span>
            </div>
            <div className="text-right max-w-[200px]">
              <span className="text-[11px] text-emerald-200 block truncate font-medium">
                Fund: {paymentDetails.cause}
              </span>
              <span className="text-[10px] text-emerald-300/80">
                100% Secure SSL 256-bit
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body Based on Step */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
          {step === 'select' && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Select Your Payment Channel
              </h4>

              {/* Mobile Banking Section */}
              <div className="mb-4">
                <span className="text-xs font-semibold text-slate-700 mb-2 block">
                  Mobile Financial Services (MFS)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleStartPayment('bkash')}
                    className="p-3 border rounded-xl flex flex-col items-center justify-center gap-2 hover:border-pink-500 hover:bg-pink-50/50 transition-all group border-slate-200 cursor-pointer shadow-xs"
                  >
                    <div className="h-8 w-auto flex items-center justify-center">
                      <img
                        src="/images/payment/bkash.svg"
                        alt="bKash"
                        className="h-7 w-auto object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 group-hover:text-pink-600">bKash</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStartPayment('nagad')}
                    className="p-3 border rounded-xl flex flex-col items-center justify-center gap-2 hover:border-orange-500 hover:bg-orange-50/50 transition-all group border-slate-200 cursor-pointer shadow-xs"
                  >
                    <div className="h-8 w-auto flex items-center justify-center">
                      <img
                        src="/images/payment/nagad.svg"
                        alt="Nagad"
                        className="h-7 w-auto object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 group-hover:text-orange-600">নগদ (Nagad)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStartPayment('rocket')}
                    className="p-3 border rounded-xl flex flex-col items-center justify-center gap-2 hover:border-purple-500 hover:bg-purple-50/50 transition-all group border-slate-200 cursor-pointer shadow-xs"
                  >
                    <div className="h-8 w-auto flex items-center justify-center">
                      <img
                        src="/images/payment/rocket.svg"
                        alt="Rocket"
                        className="h-7 w-auto object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 group-hover:text-purple-600">Rocket</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStartPayment('upay')}
                    className="p-3 border rounded-xl flex flex-col items-center justify-center gap-2 hover:border-blue-500 hover:bg-blue-50/50 transition-all group border-slate-200 cursor-pointer shadow-xs"
                  >
                    <div className="h-8 w-auto flex items-center justify-center">
                      <img
                        src="/images/payment/upay.svg"
                        alt="Upay"
                        className="h-7 w-auto object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 group-hover:text-blue-600">Upay</span>
                  </button>
                </div>
              </div>

              {/* Cards Section */}
              <div className="mb-4">
                <span className="text-xs font-semibold text-slate-700 mb-2 block">
                  Debit / Credit Cards (Local &amp; International)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleStartPayment('card')}
                    className="p-3 border rounded-xl flex items-center gap-3 hover:border-emerald-600 hover:bg-emerald-50/40 transition-all border-slate-200 text-left cursor-pointer shadow-xs group"
                  >
                    <div className="flex items-center gap-1.5 shrink-0">
                      <img
                        src="/images/payment/visa.svg"
                        alt="Visa"
                        className="h-6 w-auto object-contain"
                      />
                      <img
                        src="/images/payment/mastercard.svg"
                        alt="Mastercard"
                        className="h-6 w-auto object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-slate-800 block group-hover:text-emerald-800">
                        Visa &amp; Mastercard
                      </span>
                      <span className="text-[10px] text-slate-500 block truncate">
                        EPS Instant 3D Secure Processing
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStartPayment('bank')}
                    className="p-3 border rounded-xl flex items-center gap-3 hover:border-teal-600 hover:bg-teal-50/40 transition-all border-slate-200 text-left cursor-pointer shadow-xs group"
                  >
                    <div className="w-10 h-7 rounded-lg bg-teal-100 flex items-center justify-center text-teal-800 shrink-0">
                      <span className="material-symbols-outlined text-[18px]">account_balance</span>
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-slate-800 block group-hover:text-teal-800">
                        Internet Banking
                      </span>
                      <span className="text-[10px] text-slate-500 block truncate">
                        IBBL, BRAC, City, DBBL
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Security info */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-start gap-2 text-slate-600">
                <span className="material-symbols-outlined text-emerald-600 text-[18px] shrink-0 mt-0.5">
                  shield_with_heart
                </span>
                <p className="text-[11px] leading-relaxed">
                  <strong>Easy Payment System (EPS)</strong> guarantees end-to-end encryption. Your contribution directly fuels Global Muslim Charitable Foundation humanitarian relief work with zero intermediate deduction.
                </p>
              </div>
            </div>
          )}

          {step === 'input' && (
            <form onSubmit={handleProceedToOtp} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase text-slate-600">Method:</span>
                  <span className="text-xs font-extrabold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                    {selectedMethod}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep('select')}
                  className="text-xs text-emerald-700 hover:underline flex items-center gap-0.5 font-medium"
                >
                  <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                  Change Method
                </button>
              </div>

              {selectedMethod === 'card' ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="4111 2222 3333 4444"
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 border rounded-xl text-sm border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <span className="material-symbols-outlined absolute right-3 top-2.5 text-slate-400">
                        credit_card
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Expiry (MM/YY)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="12/28"
                        value={cardExpiry}
                        onChange={e => setCardExpiry(e.target.value)}
                        className="w-full px-3.5 py-2.5 border rounded-xl text-sm border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        CVC / CVV
                      </label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        placeholder="***"
                        value={cardCvc}
                        onChange={e => setCardCvc(e.target.value)}
                        className="w-full px-3.5 py-2.5 border rounded-xl text-sm border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              ) : selectedMethod === 'bank' ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Select Bank Portal
                    </label>
                    <select className="w-full px-3.5 py-2.5 border rounded-xl text-sm border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                      <option>Islami Bank Bangladesh Ltd (IBBL)</option>
                      <option>BRAC Bank Ltd</option>
                      <option>City Bank / City Touch</option>
                      <option>Dutch-Bangla Bank (DBBL Nexus)</option>
                      <option>Eastern Bank Ltd (EBL)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Account / Customer ID
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter internet banking ID"
                      className="w-full px-3.5 py-2.5 border rounded-xl text-sm border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {selectedMethod.toUpperCase()} Account Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        placeholder="017XXXXXXXX / 019XXXXXXXX"
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 border rounded-xl text-sm border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono tracking-wider"
                      />
                      <span className="material-symbols-outlined absolute right-3 top-2.5 text-slate-400">
                        phone_iphone
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      EPS will send a 6-digit confirmation OTP to verify your authorization.
                    </p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin material-symbols-outlined text-[18px]">
                      progress_activity
                    </span>
                    <span>Connecting EPS Gateway...</span>
                  </>
                ) : (
                  <>
                    <span>Proceed to Verification</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </>
                )}
              </button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleConfirmPayment} className="space-y-4">
              <div className="text-center py-2">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2 text-emerald-800">
                  <span className="material-symbols-outlined text-2xl">sms</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  Enter One Time Password (OTP)
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  EPS Simulation: Enter any 4-6 digit dummy OTP (e.g. <strong>123456</strong>) and your wallet PIN.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 text-center">
                  6-Digit OTP Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="123456"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  className="w-full text-center tracking-widest text-lg font-mono font-bold py-2 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 text-center">
                  Enter {selectedMethod.toUpperCase()} PIN
                </label>
                <input
                  type="password"
                  required
                  maxLength={5}
                  placeholder="•••••"
                  value={pin}
                  onChange={e => setPin(e.target.value)}
                  className="w-full text-center tracking-widest text-lg font-mono font-bold py-2 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStep('input')}
                  className="w-1/3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-2/3 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <span className="animate-spin material-symbols-outlined text-[18px]">
                        progress_activity
                      </span>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                      <span>Confirm {amountDisplay}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center py-2 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 animate-bounce">
                <span className="material-symbols-outlined text-4xl">check_circle</span>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Payment Completed via EPS
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2 font-serif-heading">
                  Jazakallahu Khairan!
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto">
                  Your generous donation has been successfully received by Global Muslim Charitable Foundation.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-2 font-mono">
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Transaction ID:</span>
                  <span className="font-bold text-slate-900">{trxId}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Amount Paid:</span>
                  <span className="font-bold text-emerald-700">{amountDisplay}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Payment Gateway:</span>
                  <span className="font-bold text-slate-900">EPS (Easy Payment System)</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Method:</span>
                  <span className="font-bold text-slate-900 uppercase">{selectedMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Fund:</span>
                  <span className="font-bold text-slate-900 truncate max-w-[170px]">{paymentDetails.cause}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">print</span>
                  Print Receipt
                </button>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow transition-all flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">done_all</span>
                  Close & Continue
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Note */}
        <div className="bg-slate-100 px-5 py-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>Chairman: Mohammad Ali Mostafa</span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px] text-emerald-600">lock</span>
            EPS Sandbox v2.4
          </span>
        </div>
      </div>
    </div>
  );
}

