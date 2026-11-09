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
  const [cardHolder, setCardHolder] = useState('');
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
          donorName: paymentDetails.donorName || cardHolder || 'Anonymous Donor',
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
    setCardExpiry('');
    setCardCvc('');
    setCardHolder('');
    closePaymentModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 transform transition-all duration-300"
        onClick={e => e.stopPropagation()}
      >
        {/* EPS Official Header */}
        <div className="bg-gradient-to-r from-[#0F382A] via-[#134E3A] to-[#0D2F23] text-white p-5 border-b border-emerald-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-md">
                <img
                  src="/images/payment/eps.svg"
                  alt="EPS Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold tracking-wider text-lg text-white font-mono">
                    EPS
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                    Easy Payment System
                  </span>
                </div>
                <p className="text-[11px] text-emerald-200/90 font-light flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-emerald-400">verified</span>
                  Bangladesh Bank Licensed PSP Payment Gateway
                </p>
              </div>
            </div>
            <button
              onClick={handleResetAndClose}
              className="text-white/70 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* Amount Badge */}
          <div className="mt-4 pt-3.5 border-t border-emerald-800/60 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-emerald-300/90 uppercase tracking-wider block font-semibold">
                Donation Amount / অনুদানের পরিমাণ
              </span>
              <span className="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight">
                {amountDisplay}
              </span>
            </div>
            <div className="text-right max-w-[210px]">
              <span className="text-[11px] text-emerald-200 block truncate font-medium">
                {paymentDetails.cause}
              </span>
              <span className="text-[10px] text-emerald-300/80 inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px] text-emerald-400">lock</span>
                256-Bit SSL Encrypted
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body Based on Step */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
          {step === 'select' && (
            <div className="space-y-5">
              {/* Mobile Banking Section */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-pink-600 text-[18px]">phone_android</span>
                    Mobile Banking / এমএফএস
                  </span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                    Instant Transfer
                  </span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {/* bKash */}
                  <button
                    type="button"
                    onClick={() => handleStartPayment('bkash')}
                    className="p-3 bg-white border-2 border-slate-200 hover:border-[#E2136E] rounded-2xl flex flex-col items-center justify-center gap-2 transition-all group cursor-pointer shadow-sm hover:shadow-md hover:bg-pink-50/20 text-center"
                  >
                    <div className="h-10 w-full flex items-center justify-center px-2">
                      <img
                        src="/images/payment/bkash.png"
                        alt="bKash"
                        className="h-8 max-w-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="text-[12px] font-bold text-slate-700 group-hover:text-[#E2136E]">
                      বিকাশ (bKash)
                    </span>
                  </button>

                  {/* Nagad */}
                  <button
                    type="button"
                    onClick={() => handleStartPayment('nagad')}
                    className="p-3 bg-white border-2 border-slate-200 hover:border-[#F7941D] rounded-2xl flex flex-col items-center justify-center gap-2 transition-all group cursor-pointer shadow-sm hover:shadow-md hover:bg-orange-50/20 text-center"
                  >
                    <div className="h-10 w-full flex items-center justify-center px-2">
                      <img
                        src="/images/payment/nagad.png"
                        alt="Nagad"
                        className="h-8 max-w-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="text-[12px] font-bold text-slate-700 group-hover:text-[#F7941D]">
                      নগদ (Nagad)
                    </span>
                  </button>

                  {/* Rocket */}
                  <button
                    type="button"
                    onClick={() => handleStartPayment('rocket')}
                    className="p-3 bg-white border-2 border-slate-200 hover:border-[#8C3494] rounded-2xl flex flex-col items-center justify-center gap-2 transition-all group cursor-pointer shadow-sm hover:shadow-md hover:bg-purple-50/20 text-center"
                  >
                    <div className="h-10 w-full flex items-center justify-center px-2">
                      <img
                        src="/images/payment/rocket.png"
                        alt="Rocket"
                        className="h-8 max-w-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="text-[12px] font-bold text-slate-700 group-hover:text-[#8C3494]">
                      রকেট (Rocket)
                    </span>
                  </button>

                  {/* Upay */}
                  <button
                    type="button"
                    onClick={() => handleStartPayment('upay')}
                    className="p-3 bg-white border-2 border-slate-200 hover:border-[#005BAA] rounded-2xl flex flex-col items-center justify-center gap-2 transition-all group cursor-pointer shadow-sm hover:shadow-md hover:bg-blue-50/20 text-center"
                  >
                    <div className="h-10 w-full flex items-center justify-center px-2">
                      <img
                        src="/images/payment/upay.png"
                        alt="Upay"
                        className="h-8 max-w-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="text-[12px] font-bold text-slate-700 group-hover:text-[#005BAA]">
                      উপায় (Upay)
                    </span>
                  </button>
                </div>
              </div>

              {/* Cards Section - Redesigned, Clean, High-End */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-blue-600 text-[18px]">credit_card</span>
                    Cards &amp; Online Banking / কার্ড ও ব্যাংকিং
                  </span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-md border border-emerald-200">
                    3D Secure Verified
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Visa & Mastercard High-End Card Button */}
                  <button
                    type="button"
                    onClick={() => handleStartPayment('card')}
                    className="p-4 bg-gradient-to-br from-white to-slate-50/60 border-2 border-slate-200 hover:border-blue-600 rounded-2xl flex flex-col justify-between gap-3 transition-all group cursor-pointer shadow-sm hover:shadow-md text-left"
                  >
                    <div className="flex items-center justify-between w-full gap-2">
                      <span className="text-sm font-bold text-slate-900 group-hover:text-blue-700 whitespace-nowrap">
                        Visa &amp; Mastercard
                      </span>
                      <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full border border-blue-200 whitespace-nowrap shrink-0">
                        Debit / Credit
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                        <img
                          src="/images/payment/visa.png"
                          alt="Visa"
                          className="h-6 w-auto object-contain group-hover:scale-105 transition-transform"
                        />
                        <div className="h-5 w-px bg-slate-200" />
                        <img
                          src="/images/payment/mastercard.png"
                          alt="Mastercard"
                          className="h-6 w-auto object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 group-hover:text-blue-600 flex items-center gap-0.5 whitespace-nowrap">
                        Pay Card
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </span>
                    </div>
                  </button>

                  {/* Internet Banking Button */}
                  <button
                    type="button"
                    onClick={() => handleStartPayment('bank')}
                    className="p-4 bg-gradient-to-br from-white to-slate-50/60 border-2 border-slate-200 hover:border-emerald-600 rounded-2xl flex flex-col justify-between gap-3 transition-all group cursor-pointer shadow-sm hover:shadow-md text-left"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-sm font-bold text-slate-900 group-hover:text-emerald-700">
                        Internet Banking
                      </span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                        All Banks
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100/80 flex items-center justify-center text-emerald-800 border border-emerald-200">
                          <span className="material-symbols-outlined text-[18px]">account_balance</span>
                        </div>
                        <span className="text-[11px] text-slate-500">
                          IBBL, City, BRAC, DBBL
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 group-hover:text-emerald-600 flex items-center gap-0.5">
                        Select
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* EPS Trust & Security Badge */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex items-start gap-3 text-slate-600">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">verified_user</span>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">
                    Easy Payment System (EPS) Secured Gateway
                  </h5>
                  <p className="text-[11px] leading-relaxed text-slate-600 mt-0.5">
                    বাংলাদেশ ব্যাংক অনুমোদিত পিএসপি গেটওয়ে। আপনার অনুদান সরাসরি গ্লোবাল মুসলিম চ্যারিটেবল ফাউন্ডেশনের অফিশিয়াল ব্যাংক একাউন্টে জমা হবে।
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 'input' && (
            <form onSubmit={handleProceedToOtp} className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold uppercase text-slate-500">Channel:</span>
                  <div className="flex items-center gap-2 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {selectedMethod === 'card' ? (
                      <div className="flex items-center gap-1.5">
                        <img src="/images/payment/visa.png" alt="Visa" className="h-4 w-auto object-contain" />
                        <img src="/images/payment/mastercard.png" alt="Mastercard" className="h-4 w-auto object-contain" />
                        <span className="text-xs font-extrabold text-slate-800 uppercase">Visa / Mastercard</span>
                      </div>
                    ) : selectedMethod === 'bank' ? (
                      <span className="text-xs font-extrabold text-slate-800 uppercase flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-emerald-700">account_balance</span>
                        Internet Banking
                      </span>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <img 
                          src={`/images/payment/${selectedMethod}.png`} 
                          alt={selectedMethod} 
                          className="h-4 w-auto object-contain" 
                        />
                        <span className="text-xs font-extrabold text-slate-800 uppercase">{selectedMethod}</span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep('select')}
                  className="text-xs text-emerald-700 hover:text-emerald-800 flex items-center gap-1 font-semibold hover:underline"
                >
                  <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                  Change Channel
                </button>
              </div>

              {selectedMethod === 'card' ? (
                <div className="space-y-3.5">
                  {/* Visual Credit Card Preview */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-md relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 pointer-events-none" />
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
                        GMCF Secure Checkout
                      </span>
                      <div className="flex items-center gap-2 bg-white/10 px-2 py-1 rounded-lg">
                        <img src="/images/payment/visa.png" alt="Visa" className="h-4 w-auto object-contain brightness-0 invert" />
                        <img src="/images/payment/mastercard.png" alt="Mastercard" className="h-4 w-auto object-contain" />
                      </div>
                    </div>
                    <div className="font-mono text-base tracking-widest mb-3">
                      {cardNumber ? cardNumber : '•••• •••• •••• ••••'}
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                      <div>
                        <span className="block text-[9px] text-slate-400">CARD HOLDER</span>
                        <span>{cardHolder || 'DONOR NAME'}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] text-slate-400">EXPIRES</span>
                        <span>{cardExpiry || 'MM/YY'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Cardholder Name / কার্ডধারীর নাম
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. MOHAMMAD ALI"
                      value={cardHolder}
                      onChange={e => setCardHolder(e.target.value)}
                      className="w-full px-3.5 py-2.5 border rounded-xl text-sm border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Card Number / কার্ড নম্বর
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        maxLength={19}
                        placeholder="4111 2222 3334 5678"
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 border rounded-xl text-sm border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                      />
                      <div className="absolute right-3 top-2.5 flex items-center gap-1.5 pointer-events-none">
                        <img src="/images/payment/visa.png" alt="Visa" className="h-4 w-auto object-contain" />
                        <img src="/images/payment/mastercard.png" alt="Mastercard" className="h-4 w-auto object-contain" />
                      </div>
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
                        maxLength={5}
                        placeholder="12/28"
                        value={cardExpiry}
                        onChange={e => setCardExpiry(e.target.value)}
                        className="w-full px-3.5 py-2.5 border rounded-xl text-sm border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
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
                        placeholder="•••"
                        value={cardCvc}
                        onChange={e => setCardCvc(e.target.value)}
                        className="w-full px-3.5 py-2.5 border rounded-xl text-sm border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                      />
                    </div>
                  </div>
                </div>
              ) : selectedMethod === 'bank' ? (
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Select Bank Portal / ব্যাংক নির্বাচন করুন
                    </label>
                    <select className="w-full px-3.5 py-2.5 border rounded-xl text-sm border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                      <option>Islami Bank Bangladesh Ltd (IBBL)</option>
                      <option>BRAC Bank Ltd (Astha)</option>
                      <option>City Bank / City Touch</option>
                      <option>Dutch-Bangla Bank (DBBL NexusPay)</option>
                      <option>Eastern Bank Ltd (EBL Skybanking)</option>
                      <option>Al-Arafah Islami Bank Ltd</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Account / Customer ID / ইউজার আইডি
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter internet banking username or account ID"
                      className="w-full px-3.5 py-2.5 border rounded-xl text-sm border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3.5">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3">
                    <img 
                      src={`/images/payment/${selectedMethod}.png`} 
                      alt={selectedMethod} 
                      className="h-10 w-auto object-contain"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">
                        {selectedMethod.toUpperCase()} Personal/Merchant Gateway
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Enter your active wallet number to receive OTP.
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {selectedMethod.toUpperCase()} Account Number (মোবাইল নম্বর)
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
                className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
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
                    <span>Proceed to Secure Verification</span>
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
                  className="w-full text-center tracking-widest text-lg font-mono font-bold py-2.5 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                  className="w-full text-center tracking-widest text-lg font-mono font-bold py-2.5 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2 font-mono">
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
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">print</span>
                  Print Receipt
                </button>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer"
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
          <span className="flex items-center gap-1.5 font-medium">
            <span className="material-symbols-outlined text-[13px] text-emerald-600">lock</span>
            EPS Sandbox v2.4 (Bangladesh Bank PSP)
          </span>
        </div>
      </div>
    </div>
  );
}
