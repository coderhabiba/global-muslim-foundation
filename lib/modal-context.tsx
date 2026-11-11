'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type PaymentDetails = {
  amount: number;
  currency: string;
  cause: string;
  frequency?: 'one-time' | 'monthly';
  donorName?: string;
  donorPhone?: string;
  donorEmail?: string;
};

export type AlertDetails = {
  title?: string;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  confirmText?: string;
  onConfirm?: () => void;
};

type PaymentModalContextType = {
  isOpen: boolean;
  paymentDetails: PaymentDetails;
  openPaymentModal: (details?: Partial<PaymentDetails>) => void;
  closePaymentModal: () => void;
  isLicenseModalOpen: boolean;
  openLicenseModal: () => void;
  closeLicenseModal: () => void;
  alertDetails: AlertDetails | null;
  showAlert: (messageOrDetails: string | AlertDetails) => void;
  closeAlert: () => void;
};

const defaultDetails: PaymentDetails = {
  amount: 1000,
  currency: 'BDT',
  cause: 'General Humanitarian & Relief Fund',
  frequency: 'one-time',
};

const ModalStateContext = createContext<PaymentModalContextType | null>(null);

export function ModalStateProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>(defaultDetails);
  const [alertDetails, setAlertDetails] = useState<AlertDetails | null>(null);

  const showAlert = (messageOrDetails: string | AlertDetails) => {
    if (typeof messageOrDetails === 'string') {
      setAlertDetails({ message: messageOrDetails, type: 'info' });
    } else {
      setAlertDetails({ type: 'info', ...messageOrDetails });
    }
  };

  const closeAlert = () => {
    if (alertDetails?.onConfirm) {
      alertDetails.onConfirm();
    }
    setAlertDetails(null);
  };

  const openPaymentModal = (details?: Partial<PaymentDetails>) => {
    setPaymentDetails(prev => ({
      ...prev,
      ...details,
      amount: details?.amount || prev.amount || 1000,
    }));
    setIsOpen(true);
  };

  const closePaymentModal = () => setIsOpen(false);

  const openLicenseModal = () => setIsLicenseModalOpen(true);
  const closeLicenseModal = () => setIsLicenseModalOpen(false);

  return (
    <ModalStateContext.Provider
      value={{
        isOpen,
        paymentDetails,
        openPaymentModal,
        closePaymentModal,
        isLicenseModalOpen,
        openLicenseModal,
        closeLicenseModal,
        alertDetails,
        showAlert,
        closeAlert,
      }}
    >
      {children}
    </ModalStateContext.Provider>
  );
}

export function useModalState() {
  const context = useContext(ModalStateContext);
  if (!context) {
    throw new Error('useModalState must be used within a ModalStateProvider');
  }
  return context;
}

