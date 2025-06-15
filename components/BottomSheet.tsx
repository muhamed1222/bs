import React, { useState, useEffect } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const BottomSheet: React.FC<Props> = ({ open, onClose, children }) => {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
      return () => document.body.classList.remove('overflow-hidden');
    }
  }, [open]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/30 flex items-end md:hidden transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      <div
        className={`bg-white rounded-t-lg w-full p-4 transition-transform duration-300 ${open ? 'translate-y-0' : 'translate-y-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

// Модальное «дно» для мобильных экранов
