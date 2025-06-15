// Модальное окно поделиться
import React, { useState, useEffect } from 'react';
import { useToast } from './ToastProvider';
import QRCode from 'qrcode';

interface ShareModalProps {
  url: string;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ url, onClose }) => {
  // Модальное окно поделиться
  const { showSuccess, showError } = useToast();
  const [qr, setQr] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    document.body.classList.add('overflow-hidden');
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.classList.remove('overflow-hidden');
    };
  }, [onClose]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      showSuccess('Ссылка скопирована');
    } catch (e) {
      showError('Не удалось скопировать ссылку');
    }
  };

  const makeQr = async () => {
    try {
      const data = await QRCode.toDataURL(url);
      setQr(data);
    } catch (e) {
      showError('Ошибка генерации QR');
    }
  };

  const shareWeb = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ url });
        showSuccess('Ссылка отправлена');
      } catch {
        showError('Не удалось отправить ссылку');
      }
    } else {
      copy();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onClick={onClose}
    >
      <div className="bg-white p-4 rounded shadow w-80 space-y-2" onClick={(e) => e.stopPropagation()}>
        <h2 className="font-semibold text-lg">Поделиться</h2>
        <button className="w-full bg-gray-100 p-2 rounded" onClick={copy}>
          Копировать ссылку
        </button>
        <button className="w-full bg-gray-100 p-2 rounded" onClick={makeQr}>
          QR-код
        </button>
        {qr && <img src={qr} alt={`QR код для ${url}`} className="mx-auto" />}
        <a
          href={`https://t.me/share/url?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-gray-100 p-2 rounded text-center"
        >
          Telegram
        </a>
        <a
          href={`https://vk.com/share.php?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-gray-100 p-2 rounded text-center"
        >
          VK
        </a>
        <button className="w-full bg-gray-100 p-2 rounded" onClick={shareWeb}>
          Web Share API
        </button>
        <button className="w-full bg-blue-500 text-white p-2 rounded" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

// Модальное окно для отправки ссылки и QR-кода профиля
