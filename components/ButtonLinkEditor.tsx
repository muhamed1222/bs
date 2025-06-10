// Редактор кнопки-ссылки
import React, { useState } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface Props {
  value: string;
  url: string;
  onTextChange: (val: string) => void;
  onUrlChange: (val: string) => void;
}

export const ButtonLinkEditor: React.FC<Props> = ({ value, url, onTextChange, onUrlChange }) => {
  // Редактор кнопки-ссылки
  const [showPicker, setShowPicker] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValidUrl = (val: string) => {
    try {
      // eslint-disable-next-line no-new
      new URL(val);
      return true;
    } catch {
      return false;
    }
  };

  const handleEmoji = (emojiData: EmojiClickData) => {
    onTextChange(value + emojiData.emoji);
    setShowPicker(false);
  };

  const handleUrlChange = (val: string) => {
    onUrlChange(val);
    if (!val || isValidUrl(val)) {
      setError(null);
    } else {
      setError('Некорректная ссылка');
    }
  };

  return (
    <div className="space-y-2 relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Текст кнопки"
        className="border px-2 py-1 rounded w-full"
      />
      <input
        type="url"
        value={url}
        onChange={(e) => handleUrlChange(e.target.value)}
        placeholder="https://example.com"
        className="border px-2 py-1 rounded w-full mt-1"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button type="button" className="px-2 py-1 bg-gray-200 rounded" onClick={() => setShowPicker(!showPicker)}>
        😊
      </button>
      {showPicker && (
        <div className="absolute z-10 mt-2">
          <EmojiPicker onEmojiClick={handleEmoji} autoFocusSearch />
        </div>
      )}
    </div>
  );
};

// Форма для редактирования текста и ссылки кнопки с выбором эмодзи
